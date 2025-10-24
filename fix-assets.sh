#!/bin/bash

# 🔧 Fix Assets Script for GitHub Pages
# This script fixes JavaScript and image paths for GitHub Pages deployment

echo "🔧 Fixing Assets for GitHub Pages"
echo "=================================="

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo "❌ docs directory not found. Please run deployment first."
    exit 1
fi

echo "📁 Fixing asset paths in docs directory..."

# Fix JavaScript paths
echo "🔧 Fixing JavaScript paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/_next/|src="./_next/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/_next/|href="./_next/|g' {} \;

# Fix CSS paths
echo "🎨 Fixing CSS paths..."
find docs -name "*.html" -exec sed -i.bak 's|href="/css/|href="./css/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/js/|href="./js/|g' {} \;

# Fix image paths
echo "🖼️  Fixing image paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/images/|src="./images/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/images/|href="./images/|g' {} \;

# Fix font paths
echo "🔤 Fixing font paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/fonts/|src="./fonts/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/fonts/|href="./fonts/|g' {} \;

# Fix favicon and other assets
echo "⭐ Fixing other assets..."
find docs -name "*.html" -exec sed -i.bak 's|href="/favicon|href="./favicon|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/favicon|src="./favicon|g' {} \;

# Clean up backup files
echo "🧹 Cleaning up backup files..."
find docs -name "*.bak" -delete

# Fix CSS files
echo "🎨 Fixing CSS files..."
find docs -name "*.css" -exec sed -i.bak 's|url("/fonts/|url("./fonts/|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/images/|url("./images/|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/js/|url("./js/|g' {} \;

# Clean up CSS backup files
find docs -name "*.bak" -delete

echo "✅ Asset paths fixed!"
echo ""
echo "📋 Fixed paths:"
echo "  • JavaScript: /_next/ → ./_next/"
echo "  • CSS: /css/ → ./css/"
echo "  • Images: /images/ → ./images/"
echo "  • Fonts: /fonts/ → ./fonts/"
echo "  • Favicon: /favicon → ./favicon"
echo ""
echo "🚀 Ready for deployment!"
