# Gallery Update Guide

This guide explains how to add new photos to your wedding gallery and update the website.

## 🚀 Quick Start: Adding New Photos

### Step 1: Add Photos to Album Folder

Add your new photos to the appropriate album folder in the `public/images/gallery/` directory:

```
public/images/gallery/
├── COFFEE/        ← Coffee shop photos
├── OUTDOOR/       ← Outdoor session photos
├── STUDIO/        ← Studio session photos
└── COUPLE/        ← Couple moments photos
```

**Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`

**Example:**
```bash
# Copy new photos to the OUTDOOR album
cp ~/my-new-photos/*.jpg public/images/gallery/OUTDOOR/
```

### Step 2: Run the Gallery Update Script

Run this command to automatically detect and configure all photos:

```bash
node scripts/update-gallery-albums.js
```

**What this script does:**
- ✅ Scans all gallery folders for images
- ✅ Detects actual image dimensions (width and height)
- ✅ Handles EXIF orientation for rotated photos
- ✅ Automatically updates `src/lib/galleryAlbums.ts`
- ✅ Maintains thumbnail.jpg as the first photo in each album
- ✅ Updates photo counts for all albums

**Example output:**
```
🖼️  Scanning gallery folders and detecting dimensions...

   📐 NOR_6068.JPG: Swapped dimensions due to EXIF orientation 8
📁 COFFEE: 17 photos
   └─ thumbnail.jpg (4528x3024), NOR_6068.JPG (3024x4528)...
📁 OUTDOOR: 20 photos
   └─ thumbnail.jpg (7008x4672), TMN_9496-14.jpg (4024x6036)...

✅ Photo data with dimensions generated successfully!
✍️  Writing to src/lib/galleryAlbums.ts
✅ File updated successfully!
```

### Step 3: Test Locally (Optional but Recommended)

Test your changes locally before deploying:

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
# Navigate to the gallery section and test the albums
```

### Step 4: Build the Site

Build the production version:

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

### Step 5: Deploy

Deploy your updated site according to your deployment method:

**For GitHub Pages:**
```bash
# If you have a deployment script
./build-and-deploy.sh

# Or manually commit and push
git add .
git commit -m "Add new photos to gallery"
git push origin main
```

---

## 📂 Gallery Folder Structure

```
public/images/gallery/
├── COFFEE/
│   ├── thumbnail.jpg      ← Used as album card image AND first photo in gallery
│   ├── NOR_6068.JPG
│   ├── NOR_6094.JPG
│   └── ...more photos
├── OUTDOOR/
│   ├── thumbnail.jpg
│   ├── TMN_9496-14.jpg
│   └── ...more photos
├── STUDIO/
│   ├── thumbnail.jpg
│   ├── TMN_8809-32.jpg
│   └── ...more photos
└── COUPLE/
    ├── thumbnail.jpg
    └── ...more photos
```

---

## 💡 Important Notes

### Thumbnail Photos
- Each album folder should have a `thumbnail.jpg` file
- This file serves two purposes:
  1. **Album card thumbnail** on the main gallery page
  2. **First photo** when viewing the album
- The script automatically sorts `thumbnail.jpg` as the first photo

### Image Orientation
- The script automatically handles EXIF orientation data
- Rotated photos will be displayed with correct dimensions
- Both portrait and landscape photos are supported

### Photo Order
- Photos are sorted alphabetically by filename (after thumbnail.jpg)
- To control display order, use numbered prefixes in filenames
  - Example: `01-photo.jpg`, `02-photo.jpg`, `03-photo.jpg`

### File Naming
- Use descriptive filenames
- Avoid special characters
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`
- File names are case-sensitive on some systems

---

## 🔧 Advanced: Manual Configuration

If you need to manually edit the gallery configuration, you can modify `src/lib/galleryAlbums.ts`:

```typescript
// Each photo has this structure:
{
  src: '/images/gallery/COFFEE/photo.jpg',
  width: 4528,
  height: 3024,
  alt: 'COFFEE - photo.jpg'
}

// Each album has this structure:
{
  id: 'coffee',
  title: 'Coffee Shop',
  description: 'Cozy moments at our favorite coffee spot',
  thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
  photoCount: 17,
  photos: coffeePhotos,
  colorClass: 'color-1'
}
```

**Note:** Manual edits will be overwritten when you run `node scripts/update-gallery-albums.js`. Only use manual editing if you need custom configurations that the script doesn't provide.

---

## 🎨 Creating a New Album

To create a completely new album category:

### 1. Create the folder structure:
```bash
mkdir -p public/images/gallery/NEWALBUM
```

### 2. Add photos and a thumbnail:
```bash
cp your-photos/*.jpg public/images/gallery/NEWALBUM/
cp your-thumbnail.jpg public/images/gallery/NEWALBUM/thumbnail.jpg
```

### 3. Update the script to include the new folder:

Edit `scripts/update-gallery-albums.js` and add your new folder to the folders array:

```javascript
const folders = ['COFFEE', 'OUTDOOR', 'STUDIO', 'COUPLE', 'NEWALBUM'];
```

### 4. Update the script's album generation section:

Find the `generateFullTypeScript` function and add your new album:

```javascript
{
  id: 'newalbum',
  title: 'New Album Title',
  description: 'Description of your new album',
  thumbnail: '/images/gallery/NEWALBUM/thumbnail.jpg',
  photoCount: ${photoData.NEWALBUM.length},
  photos: newalbumPhotos,
  colorClass: 'color-6'
}
```

### 5. Run the update script:
```bash
node scripts/update-gallery-albums.js
```

---

## 🐛 Troubleshooting

### Photos not displaying correctly
- ✅ Make sure the script ran without errors
- ✅ Check that image files are in the correct folder
- ✅ Verify image file extensions are lowercase or match exactly
- ✅ Run `npm run build` after updating

### Dimensions look wrong
- ✅ The script handles EXIF orientation automatically
- ✅ Re-run the script: `node scripts/update-gallery-albums.js`
- ✅ Check the console output for dimension swap messages

### Build errors
- ✅ Check for TypeScript errors: `npm run build`
- ✅ Verify all image paths are correct
- ✅ Make sure no special characters in filenames

---

## 📞 Need Help?

If you encounter any issues:
1. Check the console output when running the script
2. Verify file paths and permissions
3. Make sure all dependencies are installed: `npm install`
4. Check the generated `src/lib/galleryAlbums.ts` file for errors

---

## 🎉 Summary

**The simplest workflow:**
1. Add photos → `public/images/gallery/[ALBUM]/`
2. Run script → `node scripts/update-gallery-albums.js`
3. Build site → `npm run build`
4. Deploy → Push to GitHub or your hosting service

That's it! The script handles everything else automatically. 🚀

