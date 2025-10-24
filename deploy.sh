#!/bin/bash

# Wedding Website Deployment Script
# This script builds and deploys the static wedding website

echo "🎉 Starting Wedding Website Deployment..."

# Build the static site
echo "📦 Building static site..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Build failed - no 'out' directory found"
    exit 1
fi

echo "✅ Build completed successfully!"

# Create deployment branch
echo "🌿 Creating deployment branch..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy static files to root
echo "📁 Copying static files..."
cp -r out/* .

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy wedding website - $(date)"

# Push to wedding repository
echo "🚀 Pushing to wedding repository..."
echo "Please make sure you have access to the repository:"
echo "https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git"
echo ""
echo "To deploy manually, run these commands:"
echo "git remote add wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git"
echo "git push wedding gh-pages"
echo ""
echo "Or if you have SSH access:"
echo "git remote add wedding git@github.com:tien-n-huyen-wedding/tien-n-huyen-wedding.git"
echo "git push wedding gh-pages"

echo "🎊 Deployment preparation complete!"
echo "Your static files are ready in the gh-pages branch."
