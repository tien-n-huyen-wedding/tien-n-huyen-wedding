#!/usr/bin/env node

/**
 * Helper script to automatically generate gallery album photo lists with actual dimensions
 * Usage: node scripts/update-gallery-albums.js
 */

const fs = require('fs');
const path = require('path');
const imageSize = require('image-size').default;
const ExifParser = require('exif-parser');

const GALLERY_PATH = path.join(__dirname, '../public/images/gallery');
const OUTPUT_DIR = path.join(__dirname, '../src/lib/gallery-data');

// Get all image files from a folder with their dimensions
function getImageFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    const imageFiles = files
      .filter(file => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
        return isImage;
      })
      .sort((a, b) => {
        // Sort thumbnail.jpg first, then alphabetically
        if (a.toLowerCase() === 'thumbnail.jpg') return -1;
        if (b.toLowerCase() === 'thumbnail.jpg') return 1;
        return a.localeCompare(b);
      });

    // Get dimensions for each image
    return imageFiles.map(file => {
      const filePath = path.join(folderPath, file);
      try {
        const buffer = fs.readFileSync(filePath);
        const dimensions = imageSize(buffer);
        let width = dimensions.width;
        let height = dimensions.height;

        // Check for EXIF orientation and swap dimensions if needed
        if (file.toLowerCase().match(/\.(jpg|jpeg)$/)) {
          try {
            const parser = ExifParser.create(buffer);
            const result = parser.parse();
            const orientation = result.tags.Orientation;

            // For orientations 5, 6, 7, 8, width and height are swapped
            if (orientation >= 5 && orientation <= 8) {
              [width, height] = [height, width];
              console.log(`   📐 ${file}: Swapped dimensions due to EXIF orientation ${orientation}`);
            }
          } catch (exifError) {
            // EXIF parsing failed, use original dimensions
          }
        }

        return {
          filename: file,
          width: width,
          height: height
        };
      } catch (error) {
        console.error(`Error reading dimensions for ${file}:`, error.message);
        return {
          filename: file,
          width: 1200,
          height: 800
        };
      }
    });
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error.message);
    return [];
  }
}

// Convert image data to Photo objects for JSON
function convertToPhotoObjects(folderName, imageData) {
  return imageData.map(img => ({
    src: `/images/gallery/${folderName}/${img.filename}`,
    width: img.width,
    height: img.height,
    alt: `${folderName} - ${img.filename}`
  }));
}

// Save photo data as JSON files
function savePhotoDataAsJSON(photoData) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Save each album's photos to a separate JSON file
  Object.keys(photoData).forEach(folder => {
    const photos = convertToPhotoObjects(folder, photoData[folder]);
    const filename = `${folder.toLowerCase()}-photos.json`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(photos, null, 2), 'utf8');
    console.log(`   ✅ Saved ${filename} (${photos.length} photos)`);
  });
}

// Main function
function main() {
  const folders = ['COFFEE', 'OUTDOOR', 'STUDIO', 'COUPLE'];

  console.log('🖼️  Scanning gallery folders and detecting dimensions...\n');

  const photoData = {};

  folders.forEach(folder => {
    const folderPath = path.join(GALLERY_PATH, folder);
    const imageData = getImageFiles(folderPath);
    photoData[folder] = imageData;

    console.log(`📁 ${folder}: ${imageData.length} photos`);
    if (imageData.length > 0) {
      const samples = imageData.slice(0, 2).map(img => 
        `${img.filename} (${img.width}x${img.height})`
      ).join(', ');
      console.log(`   └─ ${samples}${imageData.length > 2 ? '...' : ''}`);
    }
  });

  console.log('\n✅ Photo data with dimensions generated successfully!');
  console.log('✍️  Saving JSON files to', OUTPUT_DIR);
  console.log('');

  savePhotoDataAsJSON(photoData);

  console.log('\n✅ All JSON files saved successfully!');
  console.log('💡 Photo data is now available in src/lib/gallery-data/*.json');
}

main();

