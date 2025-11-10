#!/usr/bin/env node

/**
 * Script to convert PNG files to JPG format (smaller file size)
 * Usage: node scripts/convert-png-to-jpg.js [folder]
 * If no folder is specified, converts all PNG files in COUPLE folder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GALLERY_PATH = path.join(__dirname, '../public/images/gallery');
const DEFAULT_FOLDER = 'COUPLE';

function convertPngToJpg(folderName) {
  const folderPath = path.join(GALLERY_PATH, folderName);

  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Folder ${folderPath} does not exist`);
    return;
  }

  console.log(`🖼️  Scanning ${folderName} folder for PNG files...\n`);

  const files = fs.readdirSync(folderPath);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log(`✅ No PNG files found in ${folderName} folder`);
    return;
  }

  console.log(`📁 Found ${pngFiles.length} PNG file(s) to convert:\n`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;

  pngFiles.forEach((file, index) => {
    const pngPath = path.join(folderPath, file);
    const jpgFile = file.replace(/\.png$/i, '.jpg');
    const jpgPath = path.join(folderPath, jpgFile);

    // Check if JPG already exists
    if (fs.existsSync(jpgPath)) {
      console.log(`⏭️  [${index + 1}/${pngFiles.length}] ${file} → ${jpgFile} (already exists, skipping)`);
      skipped++;
      return;
    }

    try {
      console.log(`🔄 [${index + 1}/${pngFiles.length}] Converting ${file} → ${jpgFile}...`);

      // Use sips to convert PNG to JPG with quality setting (0-100, default is 75)
      // Higher quality = larger file size but better image quality
      execSync(`sips -s format jpeg -s formatOptions 85 "${pngPath}" --out "${jpgPath}"`, {
        stdio: 'pipe'
      });

      // Get file sizes for comparison
      const pngStats = fs.statSync(pngPath);
      const jpgStats = fs.statSync(jpgPath);
      const pngSize = (pngStats.size / 1024 / 1024).toFixed(2);
      const jpgSize = (jpgStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - jpgStats.size / pngStats.size) * 100).toFixed(1);

      console.log(`   ✅ Converted (${pngSize}MB → ${jpgSize}MB, ${reduction}% smaller)`);
      converted++;
    } catch (error) {
      console.error(`   ❌ Error converting ${file}:`, error.message);
      errors++;
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  if (errors > 0) {
    console.log(`   ❌ Errors: ${errors}`);
  }

  if (converted > 0) {
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Review the converted JPG files`);
    console.log(`   2. Optionally delete the PNG files`);
    console.log(`   3. Run 'node scripts/update-gallery-albums.js' to update JSON files`);
  }
}

// Main
const folderName = process.argv[2] || DEFAULT_FOLDER;
convertPngToJpg(folderName);

