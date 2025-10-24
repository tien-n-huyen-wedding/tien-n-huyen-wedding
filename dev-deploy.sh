#!/bin/bash

# 🔧 Development Deployment Script
# For testing deployments without affecting production

echo "🔧 Development Deployment"
echo "========================"

# Create a development branch
DEV_BRANCH="dev-$(date '+%Y%m%d-%H%M%S')"
echo "📝 Creating development branch: $DEV_BRANCH"

git checkout -b $DEV_BRANCH

# Build and deploy
echo "📦 Building..."
npm run build

echo "📁 Copying to docs..."
mkdir -p docs
cp -r out/* docs/

echo "💾 Committing..."
git add .
git commit -m "Dev deployment - $DEV_BRANCH"

echo "🚀 Pushing development branch..."
git push origin $DEV_BRANCH

echo "✅ Development deployment complete!"
echo "🔗 Branch: $DEV_BRANCH"
echo "📁 Files in: docs/"
echo ""
echo "To merge to main:"
echo "  git checkout main"
echo "  git merge $DEV_BRANCH"
echo "  git push origin main"
