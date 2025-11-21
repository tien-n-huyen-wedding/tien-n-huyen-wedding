#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Optimizes images for web by:
 * - Converting to WebP format (with JPEG fallback)
 * - Resizing to appropriate dimensions
 * - Compressing with quality settings
 * - Generating multiple sizes for responsive images
 *
 * Usage:
 *   node scripts/optimize-images.js [image-path]
 *   node scripts/optimize-images.js public/images/banner.jpg
 *   node scripts/optimize-images.js public/images/gallery --recursive
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp is not installed. Please install it first:');
  console.error('  npm install --save-dev sharp');
  process.exit(1);
}

// Image optimization configurations
const configs = {
  // Main background - large hero image
  mainBackground: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    formats: ['webp', 'jpg'],
    outputDir: 'optimized',
  },
  // Gallery thumbnails - smaller preview images
  thumbnail: {
    maxWidth: 600,
    maxHeight: 400,
    quality: 80,
    formats: ['webp', 'jpg'],
    outputDir: 'optimized',
  },
  // Gallery photos - optimized for fast loading (10% of typical original size)
  galleryPhoto: {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 75,
    formats: ['webp', 'jpg'],
    outputDir: 'optimized',
  },
  // Story images - medium sized
  story: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 82,
    formats: ['webp', 'jpg'],
    outputDir: 'optimized',
  },
  // Slideshow images - large but optimized
  slideshow: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    formats: ['webp', 'jpg'],
    outputDir: 'optimized',
  },
};

/**
 * Get optimization config based on image path
 */
function getConfigForImage(imagePath) {
  const normalizedPath = imagePath.toLowerCase();

  if (normalizedPath.includes('banner') || normalizedPath.includes('main-background')) {
    return configs.mainBackground;
  }
  if (normalizedPath.includes('thumbnail')) {
    return configs.thumbnail;
  }
  if (normalizedPath.includes('our_story') || normalizedPath.includes('story')) {
    return configs.story;
  }
  if (normalizedPath.includes('gallery')) {
    // Check if it's a thumbnail or a regular gallery photo
    if (normalizedPath.includes('thumbnail')) {
      return configs.thumbnail;
    }
    return configs.galleryPhoto;
  }
  // Default to slideshow config
  return configs.slideshow;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputDir = null) {
  try {
    // Skip files that are already in optimized directories
    if (inputPath.includes('/optimized/')) {
      console.log(`Skipping already optimized file: ${inputPath}`);
      return null;
    }

    const config = getConfigForImage(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    const basename = path.basename(inputPath, ext);
    const dir = outputDir || path.dirname(inputPath);
    const optimizedDir = path.join(dir, config.outputDir);

    // Create optimized directory if it doesn't exist
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }

    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    let totalOptimizedSize = 0;

    console.log(`\nOptimizing: ${inputPath} (${(originalSize / 1024).toFixed(2)} KB)`);

    // Process each format
    for (const format of config.formats) {
      const outputPath = path.join(optimizedDir, `${basename}.${format}`);

      let image = sharp(inputPath)
        .rotate() // Auto-rotate based on EXIF orientation data
        .resize(config.maxWidth, config.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });

      if (format === 'webp') {
        image = image.webp({ quality: config.quality });
      } else if (format === 'jpg' || format === 'jpeg') {
        image = image.jpeg({ quality: config.quality, mozjpeg: true });
      } else if (format === 'png') {
        image = image.png({ quality: config.quality, compressionLevel: 9 });
      }

      const buffer = await image.toBuffer();
      fs.writeFileSync(outputPath, buffer);

      const optimizedSize = buffer.length;
      totalOptimizedSize += optimizedSize;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      console.log(`  ✓ ${format.toUpperCase()}: ${(optimizedSize / 1024).toFixed(2)} KB (${savings}% smaller)`);
    }

    const avgOptimizedSize = totalOptimizedSize / config.formats.length;
    const avgSavings = ((1 - avgOptimizedSize / originalSize) * 100).toFixed(1);

    console.log(`  Average savings: ${avgSavings}%`);

    return {
      originalSize,
      optimizedSize: avgOptimizedSize,
      savings: avgSavings,
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Process a file or directory
 */
async function processPath(inputPath, recursive = false) {
  const fullPath = path.resolve(inputPath);
  const stats = fs.statSync(fullPath);

  if (stats.isDirectory()) {
    if (!recursive) {
      console.error('Error: Directory provided but --recursive flag not set');
      return;
    }

    const files = fs.readdirSync(fullPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images in ${fullPath}`);

    for (const file of imageFiles) {
      await optimizeImage(path.join(fullPath, file));
    }
  } else if (stats.isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      console.error(`Error: ${fullPath} is not a supported image format`);
      return;
    }
    await optimizeImage(fullPath);
  } else {
    console.error(`Error: ${fullPath} is not a file or directory`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Image Optimization Script');
    console.log('\nUsage:');
    console.log('  node scripts/optimize-images.js <image-path> [--recursive]');
    console.log('\nExamples:');
    console.log('  node scripts/optimize-images.js public/images/banner.jpg');
    console.log('  node scripts/optimize-images.js public/images/gallery --recursive');
    console.log('  node scripts/optimize-images.js public/images/our_story_images --recursive');
    process.exit(0);
  }

  const inputPath = args[0];
  const recursive = args.includes('--recursive') || args.includes('-r');

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: ${inputPath} does not exist`);
    process.exit(1);
  }

  console.log('Starting image optimization...');
  await processPath(inputPath, recursive);
  console.log('\n✓ Optimization complete!');
}

main().catch(console.error);

