# Batch Image Resizer & Compressor (Client-Side Web Tool)

This project is a **browser-based image resizer and compressor**, designed as a front-end equivalent of a Python script that:

- Resizes large images
- Converts everything to **JPG**
- Iteratively compresses until a target file size is reached

All processing happens **entirely in the browser** (no server, no file upload), so it’s fast and privacy-friendly.

---

## ✨ Features

- ✅ **Batch processing** — handle multiple images at once  
- ✅ **Resize by max width & max height** (independent limits)  
- ✅ **Configurable compression target** as a percentage of resized size  
- ✅ **Always outputs JPG** (PNG → JPG conversion included)  
- ✅ **Transparency flattened to white** for PNGs / images with alpha  
- ✅ **Natural sorting** of filenames (e.g. `image2.jpg` before `image10.jpg`)  
- ✅ **Per-file download links**  
- ✅ **“Download all as ZIP”** (via JSZip)  
- ✅ **No backend required** — works as a static site (ideal for Netlify, GitHub Pages, etc.)

---

## 🧠 How It Mirrors the Original Python Script

Original Python behavior (simplified):

1. **Resize phase**
   - If `width > 1800` or `height > 1800`, resize so the *longest* side becomes `1800` (preserving aspect ratio).
   - Save as JPEG (PNG → JPG), flattening transparency if needed.
2. **Compression phase**
   - Start with JPEG quality 80, and iteratively reduce by 5.
   - Stop when compressed size ≤ `original_resized_size * 0.5` or quality ≤ 10.
   - Save as `.jpg`.

Browser implementation:

- Resizes images if `width > maxWidth` or `height > maxHeight`,
  scaling them down proportionally so both constraints are satisfied.
- Converts everything to **JPG** with initial quality `0.85` for the “resized” version.
- Iteratively compresses the resized image using `canvas.toBlob(...)`, starting at quality `0.8` and decreasing by `0.05` each step, until:
  - compressed size ≤ `resized_size * (targetPercent / 100)`, or  
  - quality ≤ `0.1` (≈ 10 in the Python 0–100 scale).

---

## 🖱 Usage

1. Open `index.html` in a modern browser **or** deploy it as a static site.
2. Click **“Choose Files”** and select your images:
   - Supported formats: `.png`, `.jpg`, `.jpeg`
3. Adjust parameters (see next section):
   - **Max width (px)**
   - **Max height (px)**
   - **Target size (% of resized)**  
4. Click **“Process Images”**.
5. For each image you’ll see:
   - New filename (with `.jpg` extension)
   - Size change badge: `original → compressed`
   - A **Download** link
6. Optionally click **“Download All as ZIP”** to get everything as `compressed_images.zip`.

---

## 🔧 Parameters

All parameters are validated before processing.

### Max width (px)

- Applies to the resized output.
- Must be a **positive integer between 100 and 10000**.
- If an image is wider than this, it will be scaled down proportionally.

### Max height (px)

- Applies to the resized output.
- Must be a **positive integer between 100 and 10000**.
- If an image is taller than this, it will be scaled down proportionally.

> The image is resized **only if** `width > maxWidth` OR `height > maxHeight`.  
> Scaling preserves aspect ratio.

### Target size (% of resized)

- Target compression size as a percentage of the **resized** image size.
- Must be an **integer between 1 and 100**.
- Example:
  - `50` → aim for compressed size ≤ 50% of resized file size (similar to `original_size * 0.5` in the Python script).
  - `70` → less aggressive compression.
  - `30` → more aggressive compression.

---

## 🏗 Tech Stack

- **HTML + Vanilla JavaScript + Canvas API**
- **JSZip** (via CDN) for ZIP creation in the browser
- No build tools, no framework, no backend

---

## 🚀 Deployment

Because it’s a single static HTML file, you can deploy it almost anywhere:

### Netlify

1. Create a new repo with `index.html` at the root.
2. In Netlify, choose **“New site from Git”**.
3. Select the repo.
4. Build command: *(leave blank)*  
   Publish directory: `.`  
5. Deploy and use the generated `*.netlify.app` URL.

### GitHub Pages

1. Commit `index.html` to your repo.
2. Go to **Settings → Pages**.
3. Set:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default) / root (`/`)
4. Save and open the provided URL when GitHub pages finishes building.

---

## ⚠️ Notes & Limitations

- All processing is done **client-side**; performance is limited by the user’s browser and machine.
- Very large images or huge batches may use a lot of memory.
- For best results, use a modern browser (Chrome, Firefox, Edge, Safari).

---

## 📝 Development

If you want to tweak behavior:

- Look at the bottom `<script>` block in `index.html`.
- Key functions:
  - `resizeImageBrowser(img, maxWidth, maxHeight)`
  - `compressImageFromCanvas(canvas, resizedBlob, targetPercent)`
  - Validation:
    - `getValidatedMaxWidth()`
    - `getValidatedMaxHeight()`
    - `getValidatedTargetPercent()`

You can adjust default values in the corresponding `<input>` elements in the HTML.

---

## 📜 License

You can add whatever license you prefer here (e.g. MIT, Apache-2.0, etc.).
