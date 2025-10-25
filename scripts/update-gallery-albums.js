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
const OUTPUT_FILE = path.join(__dirname, '../src/lib/galleryAlbums.ts');

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

// Generate the photo objects array for TypeScript
function generatePhotoArray(folderName, imageData) {
  const arrayItems = imageData.map(img =>
    `  {\n    src: '/images/gallery/${folderName}/${img.filename}',\n    width: ${img.width},\n    height: ${img.height},\n    alt: '${folderName} - ${img.filename}'\n  }`
  ).join(',\n');
  return `// ${folderName} Album\nconst ${folderName.toLowerCase()}Photos: Photo[] = [\n${arrayItems}\n];`;
}

// Generate complete TypeScript file content
function generateFullTypeScript(photoData) {
  const imports = `// Gallery Albums Configuration
export interface Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  photoCount: number;
  photos: Photo[];
  colorClass?: string;
}

`;

  const photoArrays = Object.keys(photoData).map(folder =>
    generatePhotoArray(folder, photoData[folder])
  ).join('\n\n');

  const albums = `
// Export all albums
export const albums: Album[] = [
  {
    id: 'coffee',
    title: 'Coffee Shop',
    description: 'Cozy moments at our favorite coffee spot',
    thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
    photoCount: ${photoData.COFFEE.length},
    photos: coffeePhotos,
    colorClass: 'color-1'
  },
  {
    id: 'outdoor',
    title: 'Outdoor Adventures',
    description: 'Beautiful outdoor photography sessions',
    thumbnail: '/images/gallery/OUTDOOR/thumbnail.jpg',
    photoCount: ${photoData.OUTDOOR.length},
    photos: outdoorPhotos,
    colorClass: 'color-2'
  },
  {
    id: 'studio',
    title: 'Studio Sessions',
    description: 'Professional studio photography moments',
    thumbnail: '/images/gallery/STUDIO/thumbnail.jpg',
    photoCount: ${photoData.STUDIO.length},
    photos: studioPhotos,
    colorClass: 'color-3'
  },
  {
    id: 'couple',
    title: 'Couple Moments',
    description: 'Special moments captured together',
    thumbnail: '/images/gallery/COUPLE/thumbnail.jpg',
    photoCount: ${photoData.COUPLE.length},
    photos: couplePhotos,
    colorClass: 'color-4'
  },
  {
    id: 'all',
    title: 'All Photos',
    description: 'All photos from our special day',
    thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
    photoCount: ${photoData.COFFEE.length + photoData.OUTDOOR.length + photoData.STUDIO.length + photoData.COUPLE.length},
    photos: [...coffeePhotos, ...outdoorPhotos, ...studioPhotos, ...couplePhotos],
    colorClass: 'color-5'
  }
];

// Helper to get album by id
export const getAlbumById = (id: string): Album | undefined => {
  return albums.find(album => album.id === id);
};
`;

  return imports + photoArrays + albums;
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
  console.log('✍️  Writing to', OUTPUT_FILE);

  const tsContent = generateFullTypeScript(photoData);
  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');

  console.log('✅ File updated successfully!');
  console.log('\n💡 The galleryAlbums.ts file has been updated with actual image dimensions.');
}

main();

