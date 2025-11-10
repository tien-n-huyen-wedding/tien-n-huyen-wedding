#!/usr/bin/env node

/**
 * Script to convert HEIC files to PNG format
 * Usage: node scripts/convert-heic-to-png.js [folder]
 * If no folder is specified, converts all HEIC files in COUPLE folder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GALLERY_PATH = path.join(__dirname, '../public/images/gallery');
const DEFAULT_FOLDER = 'COUPLE';

function convertHeicToPng(folderName) {
  const folderPath = path.join(GALLERY_PATH, folderName);

  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Folder ${folderPath} does not exist`);
    return;
  }

  console.log(`🖼️  Scanning ${folderName} folder for HEIC files...\n`);

  const files = fs.readdirSync(folderPath);
  const heicFiles = files.filter(file => file.toLowerCase().endsWith('.heic'));

  if (heicFiles.length === 0) {
    console.log(`✅ No HEIC files found in ${folderName} folder`);
    return;
  }

  console.log(`📁 Found ${heicFiles.length} HEIC file(s) to convert:\n`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;

  heicFiles.forEach((file, index) => {
    const heicPath = path.join(folderPath, file);
    const pngFile = file.replace(/\.heic$/i, '.png');
    const pngPath = path.join(folderPath, pngFile);

    // Check if PNG already exists
    if (fs.existsSync(pngPath)) {
      console.log(`⏭️  [${index + 1}/${heicFiles.length}] ${file} → ${pngFile} (already exists, skipping)`);
      skipped++;
      return;
    }

    try {
      console.log(`🔄 [${index + 1}/${heicFiles.length}] Converting ${file} → ${pngFile}...`);

      // Use sips to convert HEIC to PNG
      execSync(`sips -s format png "${heicPath}" --out "${pngPath}"`, {
        stdio: 'pipe'
      });

      // Get file sizes for comparison
      const heicStats = fs.statSync(heicPath);
      const pngStats = fs.statSync(pngPath);
      const heicSize = (heicStats.size / 1024 / 1024).toFixed(2);
      const pngSize = (pngStats.size / 1024 / 1024).toFixed(2);

      console.log(`   ✅ Converted (${heicSize}MB → ${pngSize}MB)`);
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
    console.log(`   1. Review the converted PNG files`);
    console.log(`   2. Optionally delete the original HEIC files`);
    console.log(`   3. Run 'node scripts/update-gallery-albums.js' to update JSON files`);
  }
}

// Main
const folderName = process.argv[2] || DEFAULT_FOLDER;
convertHeicToPng(folderName);

