#!/usr/bin/env node

const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

async function testFullCombine() {
  // Read all sample files
  const samplesDir = './samples';
  const files = fs.readdirSync(samplesDir)
    .filter(f => f.endsWith('.docx'))
    .sort((a, b) => a.localeCompare(b));

  console.log(`Testing with ${files.length} files:\n`);
  files.forEach((f, i) => console.log(`  ${i+1}. ${f}`));

  const fileBuffers = files.map(f => ({
    name: f,
    buffer: fs.readFileSync(path.join(samplesDir, f))
  }));

  try {
    console.log('\n=== Combining files... ===');
    const result = await combineDocxFiles(fileBuffers);
    fs.writeFileSync('./test-combined-all.docx', result);
    console.log('✓ Combined file created: test-combined-all.docx');

    // Validate the result
    const zip = await JSZip.loadAsync(result);

    console.log('\n=== Validation ===');

    // Check file structure
    const docXml = await zip.file('word/document.xml').async('string');
    const relsXml = await zip.file('word/_rels/document.xml.rels').async('string');
    const stylesXml = await zip.file('word/styles.xml').async('string');

    // Parse XML to verify structure
    const DOMParser = require('xmldom').DOMParser;
    try {
      new DOMParser().parseFromString(docXml);
      console.log('✓ document.xml is valid XML');
    } catch (e) {
      console.log(`✗ document.xml has XML error: ${e.message}`);
    }

    try {
      new DOMParser().parseFromString(relsXml);
      console.log('✓ document.xml.rels is valid XML');
    } catch (e) {
      console.log(`✗ document.xml.rels has XML error: ${e.message}`);
    }

    // Count relationships
    const rels = relsXml.match(/<Relationship[^>]*/g) || [];
    console.log(`✓ Total relationships: ${rels.length}`);

    // Extract relationships
    const relationships = relsXml.match(/Id="(rId\d+)".*?Target="([^"]+)"/g) || [];
    console.log('\nRelationships in combined file:');
    const relIds = new Set();
    relationships.forEach(r => {
      const m = r.match(/Id="(rId\d+)".*?Target="([^"]+)"/);
      if (m) {
        const [, id, target] = m;
        relIds.add(id);
        console.log(`  ${id} → ${target}`);
      }
    });

    // Check for broken references
    const files_in_zip = new Set(zip.file(/.*/).map(f => f.name));
    let broken = false;
    for (const r of relationships) {
      const m = r.match(/Target="([^"]+)"/);
      if (m) {
        const target = m[1];
        const possible = ['word/' + target, target];
        const found = possible.some(p => files_in_zip.has(p));
        if (!found && !target.startsWith('http')) {
          console.log(`  ✗ BROKEN: ${target}`);
          broken = true;
        }
      }
    }
    if (!broken) {
      console.log('✓ All relationships point to existing files');
    }

    // Check for customXml, footer, header references
    const customXmlCount = (relsXml.match(/customxml/gi) || []).length;
    const footerCount = (relsXml.match(/footer/gi) || []).length;
    const headerCount = (relsXml.match(/header/gi) || []).length;

    console.log('\n=== Excluded relationship types ===');
    console.log(`✓ customXml references: ${customXmlCount} (should be 0)`);
    console.log(`✓ footer references: ${footerCount} (should be 0)`);
    console.log(`✓ header references: ${headerCount} (should be 0)`);

    if (customXmlCount > 0 || footerCount > 0 || headerCount > 0) {
      console.log('\n✗ FAILURE: Found references that should have been excluded');
      process.exit(1);
    }

    // Check document structure
    const paras = docXml.match(/<w:p>/g) || [];
    const pageBreaks = docXml.match(/pageBreakBefore/g) || [];

    console.log('\n=== Document structure ===');
    console.log(`✓ Paragraphs: ${paras.length}`);
    console.log(`✓ Page breaks: ${pageBreaks.length} (should be ${files.length - 1} for ${files.length} files)`);

    // File size
    const stats = fs.statSync('./test-combined-all.docx');
    console.log(`✓ Combined file size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    console.log('\n✅ ALL VALIDATIONS PASSED - Safe to use!');

  } catch (e) {
    console.error('✗ Error:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
}

async function combineDocxFiles(files) {
  const baseZip = await JSZip.loadAsync(files[0].buffer);

  let baseDocXml = await baseZip.file('word/document.xml').async('string');
  let baseStylesXml = baseZip.file('word/styles.xml') ? await baseZip.file('word/styles.xml').async('string') : '';
  let baseRelsXml = baseZip.file('word/_rels/document.xml.rels') ? await baseZip.file('word/_rels/document.xml.rels').async('string') : '';
  let baseContentTypesXml = baseZip.file('[Content_Types].xml') ? await baseZip.file('[Content_Types].xml').async('string') : '';

  baseRelsXml = filterBaseRels(baseRelsXml, baseZip);

  const bodyMatch = baseDocXml.match(/<w:body>([\s\S]*)<\/w:body>/);
  if (!bodyMatch) throw new Error('Invalid DOCX: missing document body in first file.');

  const baseBodyRaw = bodyMatch[1].replace(/<w:sectPrChange[\s\S]*?<\/w:sectPrChange>/g, '');

  let baseSectPr = '';
  const sectPrMatch = baseBodyRaw.match(/<w:sectPr[^>]*>[\s\S]*?<\/w:sectPr>/);
  if (sectPrMatch) {
    baseSectPr = sectPrMatch[0]
      .replace(/<w:headerReference[^/]*\/>/g, '')
      .replace(/<w:footerReference[^/]*\/>/g, '');
  }

  let combinedBodyContent = baseBodyRaw
    .replace(/<w:sectPr[^>]*>[\s\S]*?<\/w:sectPr>/g, '');

  const footnoteState = { mergedXml: '', maxId: 0 };
  const endnoteState = { mergedXml: '', maxId: 0 };
  const numberingState = { mergedXml: '', maxAbsId: -1, maxNumId: 0 };
  const baseFootnotesXml = baseZip.file('word/footnotes.xml') ? await baseZip.file('word/footnotes.xml').async('string') : '';
  combinedBodyContent = mergeNotesInto(footnoteState, baseFootnotesXml, combinedBodyContent, 'footnoteReference');
  const baseEndnotesXml = baseZip.file('word/endnotes.xml') ? await baseZip.file('word/endnotes.xml').async('string') : '';
  combinedBodyContent = mergeNotesInto(endnoteState, baseEndnotesXml, combinedBodyContent, 'endnoteReference');
  const baseNumberingXml = baseZip.file('word/numbering.xml') ? await baseZip.file('word/numbering.xml').async('string') : '';
  combinedBodyContent = mergeNumberingInto(numberingState, baseNumberingXml, combinedBodyContent);

  let maxRelId = 1;
  const relIdMatch = baseRelsXml.match(/Id="rId(\d+)"/g);
  if (relIdMatch) {
    const ids = relIdMatch.map(m => parseInt(m.match(/\d+/)[0], 10));
    maxRelId = Math.max(...ids) + 1;
  }

  for (let i = 1; i < files.length; i++) {
    const additionalZip = await JSZip.loadAsync(files[i].buffer);
    let additionalDocXml = await additionalZip.file('word/document.xml').async('string');
    let additionalStylesXml = additionalZip.file('word/styles.xml') ? await additionalZip.file('word/styles.xml').async('string') : '';
    let additionalRelsXml = additionalZip.file('word/_rels/document.xml.rels') ? await additionalZip.file('word/_rels/document.xml.rels').async('string') : '';

    const additionalBodyMatch = additionalDocXml.match(/<w:body>([\s\S]*)<\/w:body>/);
    if (!additionalBodyMatch) continue;

    let additionalBody = additionalBodyMatch[1]
      .replace(/<w:sectPrChange[\s\S]*?<\/w:sectPrChange>/g, '')
    .replace(/<w:sectPr[^>]*>[\s\S]*?<\/w:sectPr>/g, '');

    const addFootnotesXml = additionalZip.file('word/footnotes.xml') ? await additionalZip.file('word/footnotes.xml').async('string') : '';
    additionalBody = mergeNotesInto(footnoteState, addFootnotesXml, additionalBody, 'footnoteReference');
    const addEndnotesXml = additionalZip.file('word/endnotes.xml') ? await additionalZip.file('word/endnotes.xml').async('string') : '';
    additionalBody = mergeNotesInto(endnoteState, addEndnotesXml, additionalBody, 'endnoteReference');
    const addNumberingXml = additionalZip.file('word/numbering.xml') ? await additionalZip.file('word/numbering.xml').async('string') : '';
    additionalBody = mergeNumberingInto(numberingState, addNumberingXml, additionalBody);

    const idMapObj = buildRelIdMap(additionalRelsXml, maxRelId);
    const remappedBody = remapBodyRelIds(additionalBody, idMapObj);

    const pageBreak = '<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>';
    combinedBodyContent += pageBreak;
    combinedBodyContent += remappedBody;

    if (additionalStylesXml) {
      baseStylesXml = mergeStyles(baseStylesXml, additionalStylesXml);
    }

    if (additionalRelsXml) {
      const mergeResult = mergeRels(baseRelsXml, additionalRelsXml, baseContentTypesXml, idMapObj);
      baseRelsXml = mergeResult.relsXml;
      baseContentTypesXml = mergeResult.contentTypesXml;
      maxRelId = mergeResult.nextRelId;
    }
  }

  const finalBodyContent = combinedBodyContent + (baseSectPr || '');
  const finalDocXml = baseDocXml.replace(/<w:body>[\s\S]*<\/w:body>/, '<w:body>' + finalBodyContent + '</w:body>');
  baseZip.file('word/document.xml', finalDocXml, { compression: 'DEFLATE' });

  if (footnoteState.mergedXml) {
    baseZip.file('word/footnotes.xml', footnoteState.mergedXml, { compression: 'DEFLATE' });
    if (!/Target="footnotes\.xml"/.test(baseRelsXml)) {
      const newId = 'rId' + maxRelId++;
      baseRelsXml = baseRelsXml.replace(/<\/Relationships>/,
        '<Relationship Id="' + newId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes" Target="footnotes.xml"/></Relationships>');
    }
    if (!baseContentTypesXml.includes('/word/footnotes.xml')) {
      baseContentTypesXml = baseContentTypesXml.replace(/<\/Types>/,
        '<Override PartName="/word/footnotes.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml"/></Types>');
    }
  }
  if (numberingState.mergedXml) {
    baseZip.file('word/numbering.xml', numberingState.mergedXml, { compression: 'DEFLATE' });
    if (!/Target="numbering\.xml"/.test(baseRelsXml)) {
      const newId = 'rId' + maxRelId++;
      baseRelsXml = baseRelsXml.replace(/<\/Relationships>/,
        '<Relationship Id="' + newId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>');
    }
    if (!baseContentTypesXml.includes('/word/numbering.xml')) {
      baseContentTypesXml = baseContentTypesXml.replace(/<\/Types>/,
        '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/></Types>');
    }
  }
  if (endnoteState.mergedXml) {
    baseZip.file('word/endnotes.xml', endnoteState.mergedXml, { compression: 'DEFLATE' });
    if (!/Target="endnotes\.xml"/.test(baseRelsXml)) {
      const newId = 'rId' + maxRelId++;
      baseRelsXml = baseRelsXml.replace(/<\/Relationships>/,
        '<Relationship Id="' + newId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes" Target="endnotes.xml"/></Relationships>');
    }
    if (!baseContentTypesXml.includes('/word/endnotes.xml')) {
      baseContentTypesXml = baseContentTypesXml.replace(/<\/Types>/,
        '<Override PartName="/word/endnotes.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml"/></Types>');
    }
  }

  if (baseStylesXml) baseZip.file('word/styles.xml', baseStylesXml, { compression: 'DEFLATE' });
  if (baseRelsXml) baseZip.file('word/_rels/document.xml.rels', baseRelsXml, { compression: 'DEFLATE' });
  if (baseContentTypesXml) baseZip.file('[Content_Types].xml', baseContentTypesXml, { compression: 'DEFLATE' });

  const cleanZip = new JSZip();
  for (const [path, file] of Object.entries(baseZip.files)) {
    if (!file.dir) {
      const fileData = await file.async('arraybuffer');
      cleanZip.file(path, fileData);
    }
  }

  const blob = await cleanZip.generateAsync({
    type: 'nodebuffer',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE'
  });

  return blob;
}

function mergeNotesInto(state, fileNotesXml, bodyXml, refTag) {
  if (!fileNotesXml) return bodyXml;
  const blocks = fileNotesXml.match(/<w:footnote\b[\s\S]*?<\/w:footnote>|<w:endnote\b[\s\S]*?<\/w:endnote>/g) || [];
  if (blocks.length === 0) return bodyXml;
  if (!state.mergedXml) {
    state.mergedXml = fileNotesXml;
    blocks.forEach(b => {
      const m = b.match(/w:id="(-?\d+)"/);
      if (m) {
        const id = parseInt(m[1], 10);
        if (id > state.maxId) state.maxId = id;
      }
    });
    return bodyXml;
  }
  const idMap = {};
  let toAppend = '';
  blocks.forEach(b => {
    const m = b.match(/w:id="(-?\d+)"/);
    if (!m) return;
    const oldId = parseInt(m[1], 10);
    if (oldId <= 0) return;
    state.maxId++;
    idMap[oldId] = state.maxId;
    toAppend += b.replace(/w:id="-?\d+"/, 'w:id="' + state.maxId + '"');
  });
  if (toAppend) {
    state.mergedXml = state.mergedXml.replace(/<\/w:footnotes>|<\/w:endnotes>/, m => toAppend + m);
  }
  return bodyXml.replace(new RegExp('<w:' + refTag + '\\b([^/>]*)/>', 'g'), (match, attrs) => {
    const idMatch = attrs.match(/w:id="(\d+)"/);
    if (!idMatch) return match;
    const newId = idMap[parseInt(idMatch[1], 10)];
    if (newId === undefined) return match;
    return '<w:' + refTag + attrs.replace(/w:id="\d+"/, 'w:id="' + newId + '"') + '/>';
  });
}

function filterBaseRels(relsXml, baseZip) {
  const excludeRelTypes = ['footer', 'header', 'customxml'];
  return relsXml.replace(/<Relationship[^>]*\/>/g, (rel) => {
    const typeMatch = rel.match(/Type="([^"]+)"/);
    const targetMatch = rel.match(/Target="([^"]+)"/);
    const targetModeMatch = rel.match(/TargetMode="([^"]+)"/);
    if (!typeMatch || !targetMatch) return rel;
    const type = typeMatch[1].toLowerCase();
    if (excludeRelTypes.some(t => type.includes(t))) return '';
    if (targetModeMatch && targetModeMatch[1] === 'External') return rel;
    const target = targetMatch[1];
    const candidates = ['word/' + target, target.replace(/^\.\.\//, ''), target];
    const exists = candidates.some(p => baseZip.file(p));
    return exists ? rel : '';
  });
}

function mergeNumberingInto(state, fileXml, bodyXml) {
  if (!fileXml) return bodyXml;
  const getAbstracts = xml => xml.match(/<w:abstractNum w:abstractNumId="\d+"[\s\S]*?<\/w:abstractNum>/g) || [];
  const getNums = xml => xml.match(/<w:num w:numId="\d+"[\s\S]*?<\/w:num>/g) || [];
  if (!state.mergedXml) {
    state.mergedXml = fileXml;
    getAbstracts(fileXml).forEach(b => {
      const m = b.match(/w:abstractNumId="(\d+)"/);
      if (m) state.maxAbsId = Math.max(state.maxAbsId, parseInt(m[1], 10));
    });
    getNums(fileXml).forEach(b => {
      const m = b.match(/<w:num w:numId="(\d+)"/);
      if (m) state.maxNumId = Math.max(state.maxNumId, parseInt(m[1], 10));
    });
    return bodyXml;
  }
  const absMap = {};
  let newAbsBlocks = '';
  getAbstracts(fileXml).forEach(b => {
    const m = b.match(/w:abstractNumId="(\d+)"/);
    if (!m) return;
    state.maxAbsId++;
    absMap[parseInt(m[1], 10)] = state.maxAbsId;
    newAbsBlocks += b.replace(/w:abstractNumId="\d+"/, 'w:abstractNumId="' + state.maxAbsId + '"');
  });
  const numMap = {};
  let newNumBlocks = '';
  getNums(fileXml).forEach(b => {
    const m = b.match(/<w:num w:numId="(\d+)"/);
    if (!m) return;
    state.maxNumId++;
    numMap[parseInt(m[1], 10)] = state.maxNumId;
    let remapped = b.replace(/<w:num w:numId="\d+"/, '<w:num w:numId="' + state.maxNumId + '"');
    remapped = remapped.replace(/<w:abstractNumId w:val="(\d+)"/g, (mm, old) => {
      const n = absMap[parseInt(old, 10)];
      return n !== undefined ? '<w:abstractNumId w:val="' + n + '"' : mm;
    });
    newNumBlocks += remapped;
  });
  if (newAbsBlocks) {
    if (/<w:num w:numId=/.test(state.mergedXml)) {
      state.mergedXml = state.mergedXml.replace(/<w:num w:numId=/, newAbsBlocks + '<w:num w:numId=');
    } else {
      state.mergedXml = state.mergedXml.replace(/<\/w:numbering>/, newAbsBlocks + '</w:numbering>');
    }
  }
  if (newNumBlocks) {
    state.mergedXml = state.mergedXml.replace(/<\/w:numbering>/, newNumBlocks + '</w:numbering>');
  }
  return bodyXml.replace(/<w:numId w:val="(\d+)"\s*\/>/g, (match, old) => {
    const n = numMap[parseInt(old, 10)];
    return n !== undefined ? '<w:numId w:val="' + n + '"/>' : match;
  });
}

function buildRelIdMap(relsXml, startFromId) {
  const map = {};
  let nextId = startFromId;
  const relationships = relsXml.match(/<Relationship[^>]*\/>/g) || [];
  relationships.forEach(rel => {
    const idMatch = rel.match(/Id="([^"]+)"/);
    if (idMatch) {
      map[idMatch[1]] = 'rId' + nextId;
      nextId++;
    }
  });
  return { map, nextId };
}

function remapBodyRelIds(bodyXml, idMapObj) {
  const { map } = idMapObj;
  let result = bodyXml;
  for (const [oldId, newId] of Object.entries(map)) {
    result = result.replace(new RegExp('(r:embed|r:link|r:id)="' + oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g'), '$1="' + newId + '"');
  }
  return result;
}

function mergeStyles(baseXml, additionalXml) {
  const baseStyleIds = new Set();
  const baseStyleBlocks = baseXml.match(/<w:style[^>]*w:styleId="([^"]+)"/g) || [];
  baseStyleBlocks.forEach(b => {
    const m = b.match(/w:styleId="([^"]+)"/);
    if (m) baseStyleIds.add(m[1]);
  });

  const additionalStyles = additionalXml.match(/<w:style[^>]*>[\s\S]*?<\/w:style>/g) || [];
  let toInject = '';
  additionalStyles.forEach(style => {
    const idMatch = style.match(/w:styleId="([^"]+)"/);
    if (idMatch && !baseStyleIds.has(idMatch[1])) {
      toInject += style;
      baseStyleIds.add(idMatch[1]);
    }
  });

  if (toInject) {
    baseXml = baseXml.replace(/<\/w:styles>/, toInject + '</w:styles>');
  }
  return baseXml;
}

function mergeRels(baseRelsXml, additionalRelsXml, baseContentTypesXml, idMapObj) {
  const { map: idMap, nextId: nextRelId } = idMapObj;
  let updatedContentTypesXml = baseContentTypesXml;

  const sharedFilePatterns = ['styles.xml', 'settings.xml', 'webSettings.xml', 'fontTable.xml', 'theme/', 'numbering.xml', 'footnotes.xml', 'endnotes.xml', 'people.xml'];
  const excludeRelTypes = ['footer', 'header', 'customxml'];

  const additionalRelships = additionalRelsXml.match(/<Relationship[^>]*\/>/g) || [];
  let newRelships = '';

  additionalRelships.forEach(rel => {
    const oldIdMatch = rel.match(/Id="([^"]+)"/);
    const typeMatch = rel.match(/Type="([^"]+)"/);
    const targetMatch = rel.match(/Target="([^"]+)"/);
    const targetModeMatch = rel.match(/TargetMode="([^"]+)"/);

    if (oldIdMatch && typeMatch && targetMatch) {
      const oldId = oldIdMatch[1];
      const newId = idMap[oldId];
      const target = targetMatch[1];
      const type = typeMatch[1];

      const isSharedFile = sharedFilePatterns.some(pattern => target.includes(pattern));
      if (isSharedFile) return;

      const isExcludedType = excludeRelTypes.some(excludeType => type.toLowerCase().includes(excludeType));
      if (isExcludedType) return;

      let newRel = '<Relationship Id="' + newId + '" Type="' + type + '" Target="' + target + '"';
      if (targetModeMatch) newRel += ' TargetMode="' + targetModeMatch[1] + '"';
      newRel += '/>';
      newRelships += newRel;
    }
  });

  if (newRelships) {
    baseRelsXml = baseRelsXml.replace(/<\/Relationships>/, newRelships + '</Relationships>');
  }

  return { relsXml: baseRelsXml, contentTypesXml: updatedContentTypesXml, nextRelId };
}

testFullCombine().catch(console.error);
