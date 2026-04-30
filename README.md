# ebook Publishing Toolbox

## Version: v1.4.0

Professional tools for **ebook creation, conversion, and publishing** — all processing happens **entirely in your browser**. No server uploads, no data transmission, completely privacy-friendly and secure.

---

## Tools Overview

### 1. Docs to EPUB

Convert HTML files exported from Google Docs or InDesign into professionally formatted EPUB ebooks.

**Features:**

- Automatic chapter splitting by H1, H2, or H3 headings
- Extended metadata editor: title, author, subtitle, publisher, ISBN, description, publish date, tags
- CSV import for bulk metadata loading
- Cover image support
- Image processing and compression
- Clean EPUB 3.0 XHTML output with auto-generated table of contents
- Drag-and-drop UI

### 2. EPUB Simplified → Traditional Chinese

Convert all text content in an EPUB file from Simplified Chinese to Traditional Chinese.

**Features:**

- Converts text nodes only — HTML structure, attributes, CSS, and scripts are untouched
- Processes all XHTML/HTML content files and the NCX navigation file
- Batched API calls (≤ 3000 chars each) to stay within serverless timeout limits
- Preserves original XML declaration and DOCTYPE in every file
- Output filename suffixed with `-tc`
- Drag-and-drop UI with per-file progress log

### 3. EPUB Image Compression

Compress and resize all images within an EPUB file. Reduces file size while preserving structure and metadata.

**Features:**

- Iterative JPEG quality reduction to hit a target size (% of resized baseline)
- Configurable max width/height resize
- PNG/GIF/WEBP → JPEG conversion with automatic OPF manifest and HTML reference updates
- CMYK JPEG detection and safe re-encoding to RGB
- Skip cover image option with EPUB 2/3 cover detection
- Drag-and-drop UI with progress tracking

### 4. Image Compression

Resize and compress multiple images in the browser.

**Features:**

- Iterative JPEG quality reduction to a configurable target size percentage
- Independent max-width and max-height limits
- PNG transparency flattened to white before encoding
- Natural filename sorting (e.g. `image2.jpg` before `image10.jpg`)
- Per-file download links and "Download all as ZIP"
- Drag-and-drop UI

### 5. Extract Text from HTML

Extract structured text from HTML/XHTML files while preserving chosen inline tags.

**Features:**

- Configurable inline tag preservation (e.g. `<b>`, `<i>`, `<em>`)
- Image filename list extraction
- Clean output with unnecessary markup stripped
- Drag-and-drop UI

### 6. Splitting Text File

Split text files with chapter markers into multiple segment files.

**Features:**

- Recognises `[chX]` and `[break]` markers
- One output file per chapter/segment
- Downloads all segments as a single ZIP
- Drag-and-drop UI

### 7. Text → XHTML (with image db)

Convert text chapter files plus an image database CSV into EPUB-style XHTML files.

**Features:**

- CSV image database maps images and layout types
- Supports lyrics, image markers, and custom layouts
- Batch processing of multiple chapter files
- Drag-and-drop UI

### 8. PDF to JPG

Convert PDF pages to compressed JPG images.

**Features:**

- Export first page only or all pages
- Automatic compression targeting <1.44 MP and <300 KB per image
- Batch processing with ZIP download
- Drag-and-drop UI

### 9. PDF Compressor

Compress embedded images inside PDFs while preserving all text, fonts, hyperlinks, bookmarks, and vector graphics.

**Features:**

- Surgical image-stream replacement — text layer fully preserved
- Handles DCTDecode (JPEG) and FlateDecode (raw pixels, including PNG predictor rows)
- Grayscale detection: colour images that are effectively greyscale re-encoded as greyscale FlateDecode
- Embedded thumbnail removal
- Configurable JPEG quality and max image dimension
- Batch processing with per-file size report and ZIP download
- Drag-and-drop UI

### 10. Royalty Reporting (Multi-platform)

Consolidate royalty reports from Google Play Books, Kobo, KoboPlus, Readmoo, KDP, and HyRead into unified per-publisher summaries with full transaction-level detail.

**Features:**

- Accepts CSV, XLSX, and ZIP archives — Kobo's monthly invoice ZIPs auto-extract their inner `sales_invoice_PUB_*.xlsx` (per-purchase) and `sales_invoice_SUBS_*.xlsx` (subscription) files
- Platform detection by filename markers (`google`, `kobo`, `readmoo`, `KDP`, `hyread`); inner ZIP filenames `_PUB_` / `_SUBS_` map to kobo / koboplus
- Multi-sheet XLSX support — prefers a `Details` sheet over the first sheet (handles Kobo invoices that put metadata on a `Summary` sheet)
- Platform-specific royalty derivation:
  - Google (Transaction Report): `Payment Amount` (already USD per row, currency conversion baked in)
  - Kobo: `Net Due (Payable Currency)` (already USD)
  - KoboPlus: `Total in payable currency` (already USD)
  - Readmoo: `總金額` × TWD→USD × 0.80 (tax deduction)
  - HyRead: `權利金` × TWD→USD × 0.80 (tax deduction)
  - KDP: `Royalty` column (already USD)
- Live TWD→USD FX rate fetched from `open.er-api.com` on page load (manually overridable per period)
- Optional publisher mapping CSV (`Name`, `Publisher`) with substring + alias-aware matching, fullwidth/halfwidth normalization, longest-match wins, 1-character spurious-match guard
- Built-in static `title-aliases.csv` for cross-platform book-name variants — subtitle differences, fullwidth/halfwidth punctuation, vendor prefixes (e.g. `Dustykid -`), library suffixes (e.g. `(Overdrive: ...)`)
- Empty-title rows skipped with on-screen warning (catches platform summary/total rows that would otherwise double-count)
- Column-name aliasing across platforms: `Title` ← `書名` · `Publisher` ← `出版社` / `Imprint Name` / `Publisher Name` · `Author` ← `作者` / `Author Name`
- Date-range label defaults to last 90 days, used in output filenames
- Two outputs:
  - **`publisher_reports_<period>.zip`** — one CSV per publisher with per-title × per-platform royalty matrix, sold copies, totals, distribution fee (10%), withdrawal fee ($5 USD), and net payable
  - **`platform_summary_<period>.xlsx`** — five-sheet workbook:
    1. Platform Summary with embedded revenue pie chart
    2. Per-Publisher rollup (titles, copies, royalty, fees, payable)
    3. Top 20 Titles by total royalty (with dominant platform per title)
    4. Audit (FX rate + timestamp, alias entries loaded, per-input-file row counts, unmapped title list)
    5. Master Table — every transaction record sorted by publisher → title → timestamp, with platform, copies, royalty, source file
- In-page collapsible "How to prepare your files" operation guideline
- Drag-and-drop UI

### 11. Extract Content from PDF

Extract text and embedded images from text-based PDFs (no OCR).

**Features:**

- Page-by-page plain text output
- Embedded image extraction as ZIP
- Tiled image stitching for split image tiles
- Rotation-aware image detection
- Drag-and-drop UI

### 12. Split Double-Span PDF

Split 2-page spreads (book scans) into individual single pages.

**Features:**

- Automatic left/right spread splitting
- All processing local in the browser
- Drag-and-drop UI

### 13. Book Cover Grid

Combine multiple book cover images into a single grid image.

**Features:**

- Configurable columns and row height
- Uniform cover alignment and scaling
- Adjustable gap between covers
- PNG output with live preview
- Drag-and-drop UI

### 14. Batch Update DOCX Headings

Apply heading styles to Word document paragraphs whose text matches a regular expression.

**Features:**

- Up to 3 independent regex rules, each with its own heading level (H1–H6)
- Locale-agnostic: resolves styleId from the document's own `styles.xml` (works with English, Chinese, and all other Word locales)
- Duplicate heading-level prevention across rules
- Single-pass processing — first matching rule wins per paragraph
- Results preview listing every matched paragraph
- Drag-and-drop UI

### 15. EPUB Check

Validate EPUB files against the EPUB specification. Identifies structural errors, missing resources, and metadata issues.

Powered by [epubcheck-ts](https://likecoin.github.io/epubcheck-ts/) — opens in a new tab.

### 16. Extract Ebook Metadata

Extract metadata from EPUB and PDF files and export to CSV.

**Features:**

- Supports EPUB and PDF formats
- Extracts title, author, publisher, ISBN, language, publication date, tags
- Batch processing
- CSV export
- Drag-and-drop UI

---

## Key Benefits

- **Privacy-first** — all processing in your browser, nothing uploaded to servers
- **No installation** — works in any modern browser
- **Offline capable** — most tools work without internet once loaded
- **Cross-platform** — Windows, Mac, Linux, and mobile browsers
- **Dark mode UI** — professional dark theme for comfortable extended use
- **Open source** — inspect and modify the code as needed
- **Easy deployment** — static HTML files, deploy anywhere

---

## Getting Started

1. Open `index.html` in a modern browser, or deploy as a static site
2. Click "Open tool" on any card
3. Upload files, configure parameters, and download results

---

## Project Structure

```text
.
├── index.html                     # Landing page with tool cards
├── gdocs-to-epub.html             # Docs to EPUB converter
├── epub-s2t.html                  # EPUB Simplified → Traditional Chinese
├── epub-image-compress.html       # EPUB Image Compression
├── image-compression.html         # Image resizer/compressor
├── html-extractor.html            # HTML text extractor
├── text-splitter.html             # Text file chapter splitter
├── xhtml-converter.html           # Text to XHTML converter
├── pdf-to-jpg.html                # PDF to JPG converter
├── pdf-compress.html              # PDF Compressor
├── royalty-reporting.html         # Royalty report consolidator
├── pdf-extractor.html             # Extract text and images from PDF
├── pdf-double-span-splitter.html  # PDF double-page spread splitter
├── book-cover-grid.html           # Book cover grid generator
├── docx-heading-updater.html      # Batch DOCX heading updater
├── ebook-metadata.html            # Ebook metadata extractor
└── README.md
```

---

## Tech Stack

- **HTML + Vanilla JavaScript** — no frameworks
- **Canvas API** — image manipulation
- **File API** — client-side file handling

**Key CDN libraries:**

- JSZip — ZIP creation and Kobo invoice ZIP extraction
- PDF.js (Mozilla) — PDF rendering and text extraction
- pdf-lib — PDF image stream surgery (PDF Compressor)
- XLSX (SheetJS) — Excel parsing for royalty reports
- ExcelJS — multi-sheet summary workbook with embedded image (lazy-loaded on first Process click)
- PapaParse — CSV parsing for royalty reports and publisher / alias maps

---

## Deployment

### Netlify

1. Push repo to GitHub/GitLab/Bitbucket
2. New site from Git → select repo
3. Build command: *(blank)*, Publish directory: `.`

### GitHub Pages

1. Settings → Pages
2. Source: Deploy from a branch → `main` / root (`/`)

### Other

- **Vercel / Cloudflare Pages**: connect repo, zero config
- **Local**: open `index.html` directly in any modern browser

---

## Notes & Limitations

- Performance depends on the user's browser and machine
- Very large files or large batches may consume significant memory
- Requires a modern browser (Chrome, Firefox, Edge, Safari)
- PDF Compressor preserves text layer but skips JBIG2, JPEG2000, and CMYK images
- EPUB tools require a valid EPUB structure with OPF metadata
- Text extraction only works on text-based PDFs (no OCR)

---

## License

You can add whatever license you prefer here (e.g. MIT, Apache-2.0).
