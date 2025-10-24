#!/bin/bash

# 🚀 Quick Deploy Wedding Website
# Fast deployment script for quick updates

echo "🚀 Quick Deploy Wedding Website"
echo "=============================="

# Build
echo "📦 Building..."
npm run build

# Copy to docs
echo "📁 Copying to docs..."
mkdir -p docs
cp -r out/* docs/

# Fix asset paths
echo "🔧 Fixing paths..."
find docs -name "*.html" -exec sed -i.bak 's|src="/_next/|src="./_next/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/_next/|href="./_next/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/css/|href="./css/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/js/|href="./js/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/images/|src="./images/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/images/|href="./images/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/fonts/|src="./fonts/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/fonts/|href="./fonts/|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|href="/|href="./|g' {} \;
find docs -name "*.html" -exec sed -i.bak 's|src="/|src="./|g' {} \;

# Clean up
find docs -name "*.bak" -delete

# Commit and push
echo "💾 Committing..."
git add .
git commit -m "Quick deploy - $(date '+%Y-%m-%d %H:%M')" || echo "No changes to commit"

echo "🚀 Pushing..."
git push origin main
git push wedding main 2>/dev/null || echo "Wedding remote not configured"

echo "✅ Quick deploy complete!"
echo "🌐 Configure GitHub Pages: / (root) folder on main branch"
