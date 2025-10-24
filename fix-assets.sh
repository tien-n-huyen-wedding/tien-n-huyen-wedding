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

# Fix JavaScript paths - handle both absolute and relative paths
echo "🔧 Fixing JavaScript paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/_next/|src="./_next/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/_next/|href="./_next/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/_next|src="./_next|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/_next|href="./_next|g' {} \;

# Fix CSS paths
echo "🎨 Fixing CSS paths..."
find docs -name "*.html" -exec sed -i.bak 's|href="/css/|href="./css/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/js/|href="./js/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/css|href="./css|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/js|href="./js|g' {} \;

# Fix image paths
echo "🖼️  Fixing image paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/images/|src="./images/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/images/|href="./images/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/images|src="./images|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/images|href="./images|g' {} \;

# Fix font paths
echo "🔤 Fixing font paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/fonts/|src="./fonts/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/fonts/|href="./fonts/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/fonts|src="./fonts|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/fonts|href="./fonts|g' {} \;

# Fix favicon and other assets
echo "⭐ Fixing other assets..."
find docs -name "*.html" -exec sed -i.bak 's|href="/favicon|href="./favicon|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/favicon|src="./favicon|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/file|href="./file|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/file|src="./file|g' {} \;

# Fix any remaining absolute paths
echo "🔧 Fixing remaining absolute paths..."
find docs -name "*.html" -exec sed -i.bak 's|href="/|href="./|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/|src="./|g' {} \;

# Clean up backup files
echo "🧹 Cleaning up backup files..."
find docs -name "*.bak" -delete

# Fix CSS files
echo "🎨 Fixing CSS files..."
find docs -name "*.css" -exec sed -i.bak 's|url("/fonts/|url("./fonts/|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/images/|url("./images/|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/js/|url("./js/|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/fonts|url("./fonts|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/images|url("./images|g' {} \;
find docs -name "*.css" -exec sed -i.bak 's|url("/js|url("./js|g' {} \;

# Clean up CSS backup files
find docs -name "*.bak" -delete

# Fix JavaScript files that might have absolute paths
echo "🔧 Fixing JavaScript files..."
find docs -name "*.js" -exec sed -i.bak 's|"/_next/|"./_next/|g' {} \;
find docs -name "*.js" -exec sed -i.bak 's|"/images/|"./images/|g' {} \;
find docs -name "*.js" -exec sed -i.bak 's|"/fonts/|"./fonts/|g' {} \;

# Clean up JS backup files
find docs -name "*.bak" -delete

echo "✅ Asset paths fixed!"
echo ""
echo "📋 Fixed paths:"
echo "  • JavaScript: /_next/ → ./_next/"
echo "  • CSS: /css/ → ./css/"
echo "  • Images: /images/ → ./images/"
echo "  • Fonts: /fonts/ → ./fonts/"
echo "  • Favicon: /favicon → ./favicon"
echo "  • All absolute paths → relative paths"
echo ""
echo "🚀 Ready for deployment!"
