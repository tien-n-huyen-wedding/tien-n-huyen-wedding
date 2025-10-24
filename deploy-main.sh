#!/bin/bash

# Wedding Website Deployment Script - Main Branch
# This script builds and deploys the static wedding website to main branch

echo "🎉 Starting Wedding Website Deployment to main branch..."

# Build the static site
echo "📦 Building static site..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Build failed - no 'out' directory found"
    exit 1
fi

echo "✅ Build completed successfully!"

# Copy static files to root
echo "📁 Copying static files to root directory..."
cp -r out/* .

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy wedding website to main branch - $(date)"

# Push to wedding repository
echo "🚀 Pushing to wedding repository..."
echo "Deploying to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git"
echo ""

# Check if wedding remote exists
if git remote get-url wedding >/dev/null 2>&1; then
    echo "✅ Wedding remote found, pushing to main branch..."
    git push wedding main
else
    echo "❌ Wedding remote not found. Please add it first:"
    echo "git remote add wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git"
    echo "git push wedding main"
fi

echo "🎊 Deployment complete!"
echo "Your wedding website is now deployed to the main branch."
echo "Configure GitHub Pages to use the main branch for deployment."
