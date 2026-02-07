# Toolbox (Client-Side Web Tools Suite)

This project is a collection of **browser-based tools** for working with images, PDFs, ebooks, text files, and royalty reports. All processing happens **entirely in the browser** (no server, no file upload), making it fast, privacy-friendly, and secure.

---

## ✨ Tools Overview

### 1. Image Compression
Resize and compress multiple images in the browser. Perfect for preparing images for web use or reducing file sizes.

**Features:**
- ✅ **Batch processing** — handle multiple images at once
- ✅ **Resize by max width & max height** (independent limits)
- ✅ **Configurable compression target** as a percentage of resized size
- ✅ **Always outputs JPG** (PNG → JPG conversion included)
- ✅ **Transparency flattened to white** for PNGs / images with alpha
- ✅ **Natural sorting** of filenames (e.g. `image2.jpg` before `image10.jpg`)
- ✅ **Per-file download links**
- ✅ **"Download all as ZIP"** (via JSZip)

### 2. PDF to JPG Converter
Convert PDF files to compressed JPG images. Supports multi-page export and automatic compression.

**Features:**
- ✅ **Multi-page export** — extract all pages or just the first page
- ✅ **Automatic compression** — outputs images <1.44M pixels, <300KB
- ✅ **Batch processing** — convert multiple PDFs at once
- ✅ **Download all as ZIP** — convenient bulk download

### 3. Extract Ebook Metadata
Extract metadata from EPUB and PDF files and export to CSV format.

**Features:**
- ✅ **Support for EPUB and PDF** formats
- ✅ **Extract key metadata** — title, author, publisher, ISBN, language, publication date
- ✅ **Additional fields** — tags, comments, series information
- ✅ **CSV export** — download all metadata in a structured format
- ✅ **Batch processing** — analyze multiple files at once

### 4. Extract Text from HTML
Extract structured text from HTML/XHTML files while preserving inline formatting tags.

**Features:**
- ✅ **Preserve inline tags** — keep only the tags you choose (e.g., `<b>`, `<i>`, `<em>`)
- ✅ **Generate image filename list** — extract image references from HTML
- ✅ **Clean output** — removes unnecessary markup while preserving structure

### 5. Extract Text from PDF
Extract text content from text-based PDFs (no OCR).

**Features:**
- ✅ **Simple text extraction** — outputs plain `.txt` file
- ✅ **Browser-based** — no server processing required
- ✅ **Fast processing** — quick extraction for text-based PDFs

### 6. Split Double-Span PDF
Split 2-page spreads (book scans) into individual single pages.

**Features:**
- ✅ **Automatic splitting** — converts left+right spreads to separate pages
- ✅ **Local processing** — all done in your browser
- ✅ **Perfect for book scans** — ideal for digitized books with facing pages

### 7. Splitting Text File
Split text files with chapter markers into multiple segment files.

**Features:**
- ✅ **Chapter markers** — recognizes `[chX]` and `[break]` markers
- ✅ **Multiple output files** — one file per chapter/segment
- ✅ **ZIP packaging** — downloads all segments as a single ZIP file

### 8. Text → XHTML Converter
Convert text chapter files plus an image database CSV into EPUB-style XHTML files.

**Features:**
- ✅ **Image database support** — uses CSV to map images and layouts
- ✅ **Special formatting** — supports lyrics, image markers, and custom layouts
- ✅ **EPUB-ready output** — generates properly formatted XHTML for ebook creation
- ✅ **Batch processing** — convert multiple chapter files at once

### 9. Royalty Reporting (Multi-platform)
Consolidate royalty reports from multiple platforms into unified summaries.

**Features:**
- ✅ **Multi-platform support** — works with CSV and XLSX reports
- ✅ **Per-publisher summaries** — generates separate CSV files for each publisher
- ✅ **Sales counting** — applies platform-specific rules to count sold copies
- ✅ **ZIP download** — packages all summary reports together

### 10. Google Docs to EPUB Converter
Convert HTML files exported from Google Docs into professionally formatted EPUB ebooks.

**Features:**
- ✅ **Google Docs HTML parsing** — intelligently processes Google Docs HTML exports
- ✅ **Automatic chapter splitting** — split by H1, H2, H3 headings or keep as single file
- ✅ **Image processing** — handles images from Google Docs exports
- ✅ **Metadata editor** — add title, author, publisher, ISBN, description
- ✅ **Clean XHTML output** — generates valid EPUB 3.0 format
- ✅ **Custom styling** — includes predefined CSS for professional appearance
- ✅ **Table of contents** — automatically generates navigation from headings
- ✅ **Cover image support** — optional cover image upload

---

## 🎯 Key Benefits

- ✅ **Privacy-first** — all processing happens in your browser, no data uploaded to servers
- ✅ **No installation** — works directly in modern web browsers
- ✅ **Offline capable** — once loaded, most tools work without internet
- ✅ **Cross-platform** — works on Windows, Mac, Linux, and mobile browsers
- ✅ **Open source** — inspect and modify the code as needed
- ✅ **Easy deployment** — static HTML files, deploy anywhere (Netlify, GitHub Pages, etc.)

---

## 🖱 Getting Started

1. **Open the toolbox**
   - Open [index.html](index.html) in a modern browser **or** deploy as a static site
   - The landing page displays all available tools

2. **Select a tool**
   - Click "Open tool" on any card to access that specific tool
   - Each tool has its own interface with relevant controls

3. **Process your files**
   - Upload files using the file picker (drag & drop supported in some tools)
   - Configure tool-specific parameters
   - Click the process/convert/extract button
   - Download results individually or as a ZIP file

---

## 📖 Detailed Tool Documentation

### Image Compression Tool

**How it works:**
- Resizes images if `width > maxWidth` or `height > maxHeight`, scaling down proportionally
- Converts everything to **JPG** with initial quality `0.85`
- Iteratively compresses using `canvas.toBlob(...)`, starting at quality `0.8` and decreasing by `0.05`
- Stops when: compressed size ≤ `resized_size * (targetPercent / 100)` or quality ≤ `0.1`

**Parameters:**
- **Max width (px)**: Positive integer between 100 and 10000
- **Max height (px)**: Positive integer between 100 and 10000
- **Target size (% of resized)**: Integer between 1 and 100 (e.g., 50 = 50% of resized file size)

**Usage:**
1. Select `.png`, `.jpg`, or `.jpeg` files
2. Adjust max width, height, and target compression percentage
3. Click "Process Images"
4. Download individually or as a ZIP

### PDF to JPG Tool

**How it works:**
- Renders PDF pages to canvas using PDF.js
- Converts each page to JPG with automatic compression
- Targets <1.44M pixels and <300KB file size per image

**Parameters:**
- Export mode: First page only or all pages
- Automatic quality adjustment for optimal file size

**Usage:**
1. Select one or more PDF files
2. Choose export mode (first page or all pages)
3. Click "Convert to JPG"
4. Download all images as a ZIP

### Ebook Metadata Extractor

**How it works:**
- For EPUB: Parses OPF metadata files inside the ZIP archive
- For PDF: Extracts metadata from PDF info dictionary
- Collects title, author, publisher, ISBN, language, date, tags, comments, series

**Usage:**
1. Select EPUB and/or PDF files
2. Click "Extract Metadata"
3. Review extracted metadata in the table
4. Download all metadata as a CSV file

---

## 🏗 Tech Stack

### Core Technologies
- **HTML + Vanilla JavaScript** — no frameworks, pure web standards
- **Canvas API** — for image manipulation and rendering
- **File API** — for client-side file handling

### Key Libraries (loaded via CDN)
- **JSZip** — ZIP file creation in the browser
- **PDF.js** (Mozilla) — PDF rendering and text extraction
- **JSZip-utils** — helper utilities for ZIP operations
- **XLSX** (SheetJS) — Excel file parsing for royalty reports

### Architecture
- No build tools required
- No server-side processing
- No external API calls (except CDN libraries)
- Pure static HTML files that work offline

---

## 🚀 Deployment

Because these are static HTML files, you can deploy them almost anywhere:

### Netlify

1. Push this repo to GitHub, GitLab, or Bitbucket
2. In Netlify, choose **"New site from Git"**
3. Select the repo
4. Build command: *(leave blank)*
   Publish directory: `.`
5. Deploy and use the generated `*.netlify.app` URL

### GitHub Pages

1. Commit all files to your repo
2. Go to **Settings → Pages**
3. Set:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default) / root (`/`)
4. Save and open the provided URL when GitHub Pages finishes building

### Other Options

- **Vercel**: Import the repo and deploy (zero config needed)
- **Cloudflare Pages**: Connect your repo and deploy
- **Local use**: Simply open [index.html](index.html) in any modern browser
- **Self-hosted**: Copy all files to any web server

---

## ⚠️ Notes & Limitations

- **Client-side processing**: Performance depends on the user's browser and machine capabilities
- **Memory usage**: Very large files or huge batches may consume significant memory
- **Browser compatibility**: Requires a modern browser (Chrome, Firefox, Edge, Safari recommended)
- **PDF limitations**:
  - Text extraction only works on text-based PDFs (no OCR for scanned documents)
  - Very large PDFs may be slow to process
- **EPUB support**: Requires valid EPUB structure with OPF metadata files
- **File size**: Processing hundreds of large files simultaneously may cause performance issues
- **Privacy**: All processing is local, but files remain in browser memory during processing

---

## 📝 Development

### Project Structure

```
.
├── index.html                    # Landing page with tool cards
├── image-compression.html        # Image resizer/compressor tool
├── pdf-to-jpg.html              # PDF to JPG converter
├── ebook-metadata.html          # Ebook metadata extractor
├── html-extractor.html          # HTML text extractor
├── pdf-extractor.html           # PDF text extractor
├── pdf-double-span-splitter.html # PDF page splitter
├── text-splitter.html           # Text file chapter splitter
├── xhtml-converter.html         # Text to XHTML converter
├── royalty-reporting.html       # Royalty report consolidator
├── gdocs-to-epub.html           # Google Docs to EPUB converter
└── README.md                    # This file
```

### Customizing Tools

Each tool is self-contained in a single HTML file with embedded CSS and JavaScript. To modify a tool:

1. Open the relevant `.html` file
2. The `<script>` block at the bottom contains all the logic
3. Styling is in the `<style>` block in the `<head>`
4. Key functions vary by tool:
   - **Image Compression**: `resizeImageBrowser()`, `compressImageFromCanvas()`
   - **PDF to JPG**: PDF.js rendering, canvas conversion
   - **Ebook Metadata**: EPUB/PDF parsing, metadata extraction

### Adding New Tools

1. Create a new `.html` file following the existing pattern
2. Add a card entry in [index.html](index.html) linking to your tool
3. Use the established styling patterns for consistency
4. Keep all dependencies loaded via CDN for simplicity

---

## 💡 Use Cases

### Publishing & Content Creation
- Prepare images for web publishing with automatic compression
- Extract metadata from ebook collections for cataloging
- Convert PDFs to images for social media or marketing
- Process book scans by splitting double-page spreads

### Text Processing & Ebook Production
- Extract and clean text from HTML for editing
- Convert text manuscripts to EPUB-ready XHTML
- Split long manuscripts into chapter files
- Extract text from PDF documents for reuse

### Business & Administration
- Consolidate royalty reports from multiple platforms
- Generate publisher summaries from sales data
- Extract and organize ebook metadata for inventory management

### Privacy-Conscious Workflows
- Process sensitive documents without uploading to external servers
- Handle confidential PDFs and ebooks locally
- Batch process files without leaving a trace on external systems

---

## 🔒 Security & Privacy

- **No data transmission**: All files stay on your device
- **No tracking**: No analytics, cookies, or external tracking
- **Open source**: Full code transparency for security audits
- **Local processing**: Files are processed in browser memory only
- **No storage**: Files are not saved anywhere except your downloads folder

---

## 🆘 Support & Contributing

### Reporting Issues
If you encounter bugs or have feature requests, please open an issue on the project repository.

### Contributing
Contributions are welcome! Whether it's:
- Bug fixes
- New tools
- UI improvements
- Documentation updates
- Performance optimizations

Feel free to fork the project and submit a pull request.

---

## 📜 License

You can add whatever license you prefer here (e.g. MIT, Apache-2.0, etc.).
