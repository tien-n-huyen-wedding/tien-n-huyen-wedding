#!/bin/bash

# 🎉 Deploy to Wedding Repository
# This script deploys to the wedding repository with proper authentication

echo "🎉 Deploying to Wedding Repository"
echo "================================="

# Build the site
echo "📦 Building static site..."
npm run build

# Copy to docs directory
echo "📁 Copying to docs directory..."
mkdir -p docs
cp -r out/* docs/

# Fix asset paths
echo "🔧 Fixing asset paths..."
./fix-assets.sh

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Deploy wedding website - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to origin first
echo "🚀 Pushing to origin..."
git push origin main

# Instructions for wedding repository
echo ""
echo "✅ Changes committed and pushed to origin!"
echo ""
echo "📋 Next steps for wedding repository:"
echo "1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io"
echo "2. Create a new repository or use existing one"
echo "3. Push manually or use GitHub CLI:"
echo "   gh repo clone tien-n-huyen-wedding/tien-n-huyen-wedding.github.io"
echo "   cd tien-n-huyen-wedding.github.io"
echo "   git remote add source https://github.com/phantien133/wedding.git"
echo "   git pull source main"
echo "   git push origin main"
echo ""
echo "🌐 Configure GitHub Pages:"
echo "   - Repository: tien-n-huyen-wedding/tien-n-huyen-wedding.github.io"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root) ⬅️ For root domain!"
echo ""
echo "🎊 Your website will be live at:"
echo "   https://tien-n-huyen-wedding.github.io/"
