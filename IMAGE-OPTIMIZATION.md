# Image Optimization Guide

This guide explains how to optimize images for the wedding website to improve page load performance.

## Quick Start

1. **Install sharp** (image processing library):
   ```bash
   npm install --save-dev sharp
   ```

2. **Optimize main background image**:
   ```bash
   node scripts/optimize-images.js public/images/main_background.jpg
   ```

3. **Optimize gallery thumbnails**:
   ```bash
   node scripts/optimize-images.js public/images/gallery --recursive
   ```

4. **Optimize story images**:
   ```bash
   node scripts/optimize-images.js public/images/our_story_images --recursive
   ```

## How It Works

The optimization script:
- Converts images to **WebP format** (with JPEG fallback)
- Resizes images to appropriate dimensions
- Compresses with quality settings optimized for web
- Generates optimized versions in an `optimized/` subdirectory

### Optimization Settings

| Image Type | Max Width | Max Height | Quality | Formats |
|------------|-----------|------------|---------|---------|
| Main Background | 1920px | 1080px | 85% | WebP, JPG |
| Gallery Thumbnails | 600px | 400px | 80% | WebP, JPG |
| Story Images | 800px | 600px | 82% | WebP, JPG |
| Slideshow Images | 1920px | 1080px | 85% | WebP, JPG |

## File Structure

After optimization, your images will be organized like this:

```
public/
  images/
    main_background.jpg          (original)
    optimized/
      main_background.webp       (optimized WebP)
      main_background.jpg        (optimized JPEG fallback)
    gallery/
      COFFEE/
        thumbnail.jpg            (original)
        optimized/
          thumbnail.webp         (optimized)
          thumbnail.jpg          (fallback)
```

## Usage in Code

The code automatically uses optimized images when available. The `getBestImageFormat()` function:
- Returns WebP if the browser supports it (better compression)
- Falls back to optimized JPEG if WebP is not supported
- Falls back to original if optimized versions don't exist

### Example

```typescript
import { getBestImageFormat } from '@/utils/image-optimization';

// Automatically uses optimized version
const imageSrc = getBestImageFormat('/images/main_background.jpg');
// Returns: '/images/optimized/main_background.webp' (if supported)
// Or: '/images/optimized/main_background.jpg' (fallback)
```

## Manual Optimization Tips

If you prefer to optimize images manually:

### Using Online Tools

1. **Squoosh** (https://squoosh.app/)
   - Drag and drop your image
   - Choose WebP format
   - Adjust quality (80-85% recommended)
   - Download optimized version

2. **TinyPNG** (https://tinypng.com/)
   - Good for PNG and JPEG compression
   - Maintains good quality with smaller file sizes

### Using Command Line Tools

1. **ImageMagick**:
   ```bash
   convert input.jpg -resize 1920x1080 -quality 85 output.webp
   ```

2. **cwebp** (WebP encoder):
   ```bash
   cwebp -q 85 input.jpg -o output.webp
   ```

## Recommended Image Sizes

### Main Background Image
- **Original**: Keep high resolution (e.g., 3840x2160) for future use
- **Optimized**: 1920x1080 @ 85% quality
- **Expected size**: ~200-400 KB (down from 1-3 MB)

### Gallery Thumbnails
- **Original**: Any size
- **Optimized**: 600x400 @ 80% quality
- **Expected size**: ~30-80 KB each

### Story Images
- **Original**: Any size
- **Optimized**: 800x600 @ 82% quality
- **Expected size**: ~50-150 KB each

## Performance Benefits

Optimizing images can result in:
- **50-80% file size reduction** (WebP vs original JPEG)
- **Faster page load times** (especially on mobile)
- **Better user experience** (images load progressively)
- **Reduced bandwidth usage**

## Best Practices

1. **Always keep originals**: Don't delete original high-resolution images
2. **Optimize before committing**: Run optimization script before deploying
3. **Test on different devices**: Ensure images look good on all screen sizes
4. **Monitor file sizes**: Keep individual images under 500 KB when possible
5. **Use WebP when possible**: Modern browsers support it with better compression

## Troubleshooting

### Sharp installation fails
- Make sure you have Node.js 14+ installed
- Try: `npm install --save-dev sharp --force`

### Optimized images not loading
- Check that the `optimized/` directory exists
- Verify file paths in the code match the actual file structure
- Check browser console for 404 errors

### Images look pixelated
- Increase the `maxWidth`/`maxHeight` in the config
- Increase the quality setting (but expect larger file sizes)

## Automated Optimization

To optimize all images before build, add to `package.json`:

```json
{
  "scripts": {
    "optimize:images": "node scripts/optimize-images.js public/images --recursive",
    "prebuild": "npm run optimize:images && node scripts/generate-sitemap-robots.js"
  }
}
```

This will automatically optimize all images before each build.

