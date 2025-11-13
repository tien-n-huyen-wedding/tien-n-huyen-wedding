# Gallery Photo Data

This folder contains JSON files with photo data for each gallery album. These files are **automatically generated** by the gallery update script.

## 📁 Files

- `coffee-photos.json` - Coffee Shop album photos
- `outdoor-photos.json` - Outdoor Adventures album photos
- `studio-photos.json` - Studio Sessions album photos
- `couple-photos.json` - Couple Moments album photos

## 🔄 How to Update

**DO NOT edit these files manually!** They are automatically generated.

To update photo data:

1. Add/remove photos in `public/images/gallery/[ALBUM]/`
2. Run the update script:
   ```bash
   node scripts/update-gallery-albums.js
   ```
3. The script will regenerate all JSON files

## 📋 JSON Structure

Each JSON file contains an array of photo objects:

```json
[
  {
    "src": "/images/gallery/COFFEE/photo.jpg",
    "width": 4528,
    "height": 3024,
    "alt": "COFFEE - photo.jpg"
  }
]
```

### Fields

- **src**: Path to the image file (relative to public directory)
- **width**: Image width in pixels (handles EXIF orientation)
- **height**: Image height in pixels (handles EXIF orientation)
- **alt**: Alternative text for accessibility

## 🎯 Why JSON?

Using separate JSON files makes the data:
- ✅ **Easier to read** - Plain JSON is simpler than TypeScript arrays
- ✅ **Easier to debug** - Can inspect photo data directly
- ✅ **Version control friendly** - Clear diffs when photos change
- ✅ **Flexible** - Can be consumed by other tools if needed
- ✅ **Maintainable** - Separation of data (JSON) from logic (TypeScript)

## 🔧 How It Works

The TypeScript file `galleryAlbums.ts` imports these JSON files:

```typescript
import coffeePhotosData from './gallery-data/coffee-photos.json';
import outdoorPhotosData from './gallery-data/outdoor-photos.json';
import studioPhotosData from './gallery-data/studio-photos.json';
import couplePhotosData from './gallery-data/couple-photos.json';
```

This keeps the data separate from the album configuration logic.

## 📝 Manual Editing (Not Recommended)

If you absolutely need to manually edit these files:

1. **Backup first**: Copy the file before editing
2. **Maintain structure**: Keep the exact JSON structure
3. **Check dimensions**: Make sure width/height are correct (consider EXIF orientation)
4. **Remember**: Changes will be overwritten next time you run the script

It's better to modify the script itself if you need custom behavior.

## 🚀 Related Files

- **Script**: `scripts/update-gallery-albums.js` - Generates these files
- **Config**: `src/lib/galleryAlbums.ts` - Imports and uses these files
- **Photos**: `public/images/gallery/` - Source photo files

## 🖼️ Image Optimization

Gallery images should be optimized for web performance. The website automatically uses optimized versions when available.

### Optimization Workflow

1. **Add original images** to `public/images/gallery/[ALBUM]/`
   - Use high-quality originals (JPG, PNG, etc.)
   - Images will be automatically optimized

2. **Run optimization script**:
   ```bash
   node scripts/optimize-images.js public/images/gallery --recursive
   ```
   This will:
   - Create optimized versions in `[ALBUM]/optimized/` subdirectories
   - Generate WebP format (better compression)
   - Generate JPEG fallback format
   - Resize to max 1200x800px for gallery photos
   - Compress with 75% quality for fast loading

3. **Update gallery data**:
   ```bash
   node scripts/update-gallery-albums.js
   ```
   This regenerates the JSON files with correct paths

### Optimization Details

- **Gallery Photos**: Max 1200x800px, 75% quality
- **Thumbnails**: Max 600x400px, 80% quality
- **Formats**: WebP (primary) + JPEG (fallback)
- **Location**: Optimized images stored in `[ALBUM]/optimized/` folders

### How It Works

The website uses the `getOptimizedImageSrc()` function from `src/utils/image-optimization.ts` to:
- Automatically select WebP format when browser supports it
- Fall back to JPEG for older browsers
- Use original high-quality images when user enables "High Quality" toggle

### File Naming

- Original images: `public/images/gallery/[ALBUM]/[number].jpg`
- Optimized images: `public/images/gallery/[ALBUM]/optimized/[number].webp` and `[number].jpg`
- The JSON files reference original paths; optimization happens automatically at runtime

## 📖 More Info

See the main gallery update guide: `GALLERY-UPDATE-GUIDE.md`
