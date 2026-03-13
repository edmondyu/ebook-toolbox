# ebook Publishing Toolbox

**Version: v1.0.0**

Professional tools for **ebook creation, conversion, and publishing** — all processing happens **entirely in your browser**. No server uploads, no data transmission, completely privacy-friendly and secure.

This collection focuses on ebook publishing workflows while including essential tools for images, PDFs, text processing, and royalty reporting.

---

## ✨ Tools Overview

### 1. Docs to EPUB
Convert HTML files exported from Google Docs or InDesign into professionally formatted EPUB ebooks.

**Features:**
- ✅ **Google Docs & InDesign support** — intelligently processes HTML exports from both platforms
- ✅ **Automatic chapter splitting** — split by H1, H2, H3 headings or keep as single file
- ✅ **Image processing** — handles and compresses images from HTML exports
- ✅ **Extended metadata editor** — title, author, subtitle, publisher, ISBN, description, publish date, tags, author description
- ✅ **CSV import** — bulk-load metadata with downloadable sample CSV
- ✅ **Clean XHTML output** — generates valid EPUB 3.0 format
- ✅ **Custom styling** — includes predefined CSS for professional appearance
- ✅ **Table of contents** — automatically generates navigation from headings
- ✅ **Cover image support** — optional cover image upload
- ✅ **Drag-and-drop UI** — easy file uploads with visual feedback

### 2. EPUB Image Compression
Compress and resize all images within an EPUB file while preserving filenames and cover image metadata. Reduces EPUB file size without changing structure.

**Features:**
- ✅ **Batch image processing** — compress all images in an EPUB at once
- ✅ **Configurable resize** — set max width and height limits
- ✅ **Quality control** — adjustable JPG compression quality
- ✅ **Format conversion** — option to convert all images to JPG
- ✅ **Skip cover option** — preserve original cover image quality
- ✅ **Intelligent cover detection** — supports EPUB 2/3 cover metadata standards
- ✅ **Preserves EPUB structure** — maintains all metadata and file organization
- ✅ **Drag-and-drop UI** — easy EPUB uploads
- ✅ **Progress tracking** — real-time compression progress

### 3. Image Compression
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
- ✅ **Drag-and-drop UI** — easy image uploads

### 4. Extract Text from HTML
Extract structured text from HTML/XHTML files while preserving inline formatting tags.

**Features:**
- ✅ **Preserve inline tags** — keep only the tags you choose (e.g., `<b>`, `<i>`, `<em>`)
- ✅ **Generate image filename list** — extract image references from HTML
- ✅ **Clean output** — removes unnecessary markup while preserving structure
- ✅ **Drag-and-drop UI** — easy HTML file uploads

### 5. Splitting Text File
Split text files with chapter markers into multiple segment files.

**Features:**
- ✅ **Chapter markers** — recognizes `[chX]` and `[break]` markers
- ✅ **Multiple output files** — one file per chapter/segment
- ✅ **ZIP packaging** — downloads all segments as a single ZIP file
- ✅ **Drag-and-drop UI** — easy text file uploads

### 6. Text → XHTML (with image db)
Convert text chapter files plus an image database CSV into EPUB-style XHTML files.

**Features:**
- ✅ **Image database support** — uses CSV to map images and layouts
- ✅ **Special formatting** — supports lyrics, image markers, and custom layouts
- ✅ **EPUB-ready output** — generates properly formatted XHTML for ebook creation
- ✅ **Batch processing** — convert multiple chapter files at once
- ✅ **Drag-and-drop UI** — easy file uploads

### 7. PDF to JPG
Convert PDF files to compressed JPG images. Supports multi-page export and automatic compression.

**Features:**
- ✅ **Multi-page export** — extract all pages or just the first page
- ✅ **Automatic compression** — outputs images <1.44M pixels, <300KB
- ✅ **Batch processing** — convert multiple PDFs at once
- ✅ **Download all as ZIP** — convenient bulk download
- ✅ **Drag-and-drop UI** — easy PDF uploads

### 8. Royalty Reporting (Multi-platform)
Consolidate royalty reports from multiple platforms into unified summaries.

**Features:**
- ✅ **Multi-platform support** — works with CSV and XLSX reports
- ✅ **Per-publisher summaries** — generates separate CSV files for each publisher
- ✅ **Sales counting** — applies platform-specific rules to count sold copies
- ✅ **ZIP download** — packages all summary reports together
- ✅ **Drag-and-drop UI** — easy report uploads

### 9. Extract Content from PDF
Extract text and embedded images from text-based PDFs (no OCR).

**Features:**
- ✅ **Text extraction** — outputs plain `.txt` file with page-by-page content
- ✅ **Image extraction** — detects and exports all embedded images as a ZIP
- ✅ **Tiled image stitching** — automatically merges split image tiles into single images
- ✅ **Handles rotated images** — correctly detects images placed with rotation transforms
- ✅ **Browser-based** — no server processing required
- ✅ **Drag-and-drop UI** — easy PDF uploads

### 10. Split Double-Span PDF
Split 2-page spreads (book scans) into individual single pages.

**Features:**
- ✅ **Automatic splitting** — converts left+right spreads to separate pages
- ✅ **Local processing** — all done in your browser
- ✅ **Perfect for book scans** — ideal for digitized books with facing pages
- ✅ **Drag-and-drop UI** — easy PDF uploads

### 11. Book Cover Grid
Combine multiple book cover images into a single grid image for catalogs, social media, or promotional materials.

**Features:**
- ✅ **Flexible grid layout** — configurable number of columns and row height
- ✅ **Uniform alignment** — all covers scaled to the same height
- ✅ **Configurable spacing** — adjustable gap between covers
- ✅ **PNG output** — high-quality lossless grid image download
- ✅ **Drag-and-drop UI** — easy image uploads with live preview

### 12. Batch Update DOCX Headings
Apply heading styles to paragraphs in a Word document whose text matches a regular expression.

**Features:**
- ✅ **Up to 3 rules** — each with its own regex pattern and heading level (H1–H6)
- ✅ **Any locale** — resolves the correct heading styleId from the document's own styles.xml (works with English, Chinese, and all other Word locales)
- ✅ **Duplicate prevention** — UI disables already-used heading levels across rules
- ✅ **Single-pass processing** — all rules applied in one pass; first matching rule wins per paragraph
- ✅ **Results preview** — lists every matched paragraph, its old style, and the new heading applied
- ✅ **Drag-and-drop UI** — easy DOCX upload and download

### 13. Extract Ebook Metadata
Extract metadata from EPUB and PDF files and export to CSV format.

**Features:**
- ✅ **Support for EPUB and PDF** formats
- ✅ **Extract key metadata** — title, author, publisher, ISBN, language, publication date
- ✅ **Additional fields** — tags, comments, series information
- ✅ **CSV export** — download all metadata in a structured format
- ✅ **Batch processing** — analyze multiple files at once
- ✅ **Drag-and-drop UI** — easy ebook uploads

---

## 🎯 Key Benefits

- ✅ **Privacy-first** — all processing happens in your browser, no data uploaded to servers
- ✅ **No installation** — works directly in modern web browsers
- ✅ **Offline capable** — once loaded, most tools work without internet
- ✅ **Cross-platform** — works on Windows, Mac, Linux, and mobile browsers
- ✅ **Dark mode UI** — professional dark theme (#131313 background) for comfortable extended use
- ✅ **Drag-and-drop interface** — intuitive file uploads across all tools
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

### Docs to EPUB Converter

**How it works:**
- Parses HTML exports from Google Docs or InDesign
- Automatically detects source format and applies appropriate parsing logic
- Converts HTML content to EPUB 3.0-compliant XHTML
- Generates OPF manifest, NCX navigation, and table of contents
- Processes and compresses images from the HTML

**Features:**
- **Source format detection**: Automatically handles Google Docs (complex div structure) or InDesign (simple p/span structure)
- **Chapter splitting**: Split by H1, H2, or H3 headings, or keep as single file
- **Extended metadata**: Title, author, subtitle, publisher, ISBN, description, publish date, tags, author description
- **CSV import**: Bulk-load metadata with sample CSV download
- **Cover image**: Optional cover image upload
- **Image compression**: Automatically compresses and resizes images

**Usage:**
1. Select source format (Google Docs or InDesign)
2. Drag & drop or browse for HTML file
3. Upload images (if any)
4. Fill in metadata fields or import from CSV
5. Configure chapter splitting
6. Upload cover image (optional)
7. Click "Convert to EPUB"
8. Download the generated `.epub` file

### EPUB Image Compression Tool

**How it works:**
- Extracts EPUB file using JSZip
- Finds all image files (.jpg, .jpeg, .png, .gif, .webp)
- Optionally identifies and skips cover image using EPUB metadata
- Compresses each image using canvas API
- Repackages as compressed EPUB with DEFLATE compression level 9

**Parameters:**
- **Max Width/Height (px)**: Resize images larger than these dimensions (100-4000px)
- **Quality (%)**: JPG compression quality (1-100%)
- **Enable resize**: Toggle to enable/disable image resizing
- **Convert to JPG**: Convert all images to JPG format
- **Skip cover image**: Preserve original cover image quality

**Cover Detection Methods:**
1. EPUB 3: Item with `properties="cover-image"`
2. EPUB 2: Meta tag with `name="cover"`
3. Guide reference: `type="cover"` with image extraction from referenced HTML

**Usage:**
1. Drag & drop or browse for EPUB file
2. Configure compression settings (max dimensions, quality)
3. Enable/disable resize and JPG conversion
4. Check "Skip cover image" to preserve original cover
5. Click "Compress EPUB Images"
6. Download `filename_compressed.epub`

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
1. Drag & drop or select `.png`, `.jpg`, or `.jpeg` files
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
1. Drag & drop or select one or more PDF files
2. Choose export mode (first page or all pages)
3. Click "Convert to JPG"
4. Download all images as a ZIP

### Ebook Metadata Extractor

**How it works:**
- For EPUB: Parses OPF metadata files inside the ZIP archive
- For PDF: Extracts metadata from PDF info dictionary
- Collects title, author, publisher, ISBN, language, date, tags, comments, series

**Usage:**
1. Drag & drop or select EPUB and/or PDF files
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
- **EPUB tools**:
  - Requires valid EPUB structure with OPF metadata files
  - EPUB Image Compression processes all images unless "Skip cover" is checked
  - Cover image detection supports EPUB 2 and EPUB 3 standards
  - Docs to EPUB supports Google Docs and InDesign HTML exports
- **PDF limitations**:
  - Text extraction only works on text-based PDFs (no OCR for scanned documents)
  - Very large PDFs may be slow to process
- **File size**: Processing hundreds of large files simultaneously may cause performance issues
- **Privacy**: All processing is local, but files remain in browser memory during processing

---

## 📝 Development

### Project Structure

```text
.
├── index.html                     # Landing page with tool cards
├── gdocs-to-epub.html             # Docs to EPUB converter (Google Docs & InDesign)
├── epub-image-compress.html       # EPUB Image Compression tool
├── image-compression.html         # Image resizer/compressor tool
├── html-extractor.html            # HTML text extractor
├── text-splitter.html             # Text file chapter splitter
├── xhtml-converter.html           # Text to XHTML converter
├── pdf-to-jpg.html                # PDF to JPG converter
├── royalty-reporting.html         # Royalty report consolidator
├── pdf-extractor.html             # Extract text and images from PDF
├── pdf-double-span-splitter.html  # PDF double-page spread splitter
├── book-cover-grid.html           # Book cover grid generator
├── docx-heading-updater.html      # Batch DOCX heading updater
├── ebook-metadata.html            # Ebook metadata extractor
└── README.md                      # This file
```

### Customizing Tools

Each tool is self-contained in a single HTML file with embedded CSS and JavaScript. To modify a tool:

1. Open the relevant `.html` file
2. The `<script>` block at the bottom contains all the logic
3. Styling is in the `<style>` block in the `<head>` (dark mode theme with `#131313` background, `#50e3c2` accent)
4. Key functions vary by tool:
   - **Docs to EPUB**: `generateEpub()`, `extractContentGoogleDocs()`, `extractContentInDesign()`
   - **EPUB Image Compression**: `compressImage()`, `findCoverImage()`
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

### Ebook Publishing & Production
- Convert Google Docs or InDesign manuscripts to professional EPUBs
- Compress and optimize images in existing EPUBs to reduce file size
- Extract and organize ebook metadata for cataloging and inventory
- Split long manuscripts into chapter files for processing
- Convert text manuscripts to EPUB-ready XHTML with image database

### Content Preparation & Optimization
- Prepare images for ebook publishing with automatic compression
- Reduce EPUB file sizes while preserving cover image quality
- Convert PDFs to images for marketing and social media
- Process book scans by splitting double-page spreads

### Business & Administration
- Consolidate royalty reports from multiple platforms
- Generate publisher summaries from sales data
- Extract text from PDFs for content reuse and analysis
- Extract and clean text from HTML for editing

### Privacy-Conscious Workflows
- Process sensitive manuscripts without uploading to external servers
- Handle confidential PDFs and ebooks locally in browser
- Batch process files without leaving a trace on external systems
- Compress ebook images without cloud services

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
