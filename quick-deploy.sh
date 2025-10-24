#!/bin/bash

# 🚀 Quick Wedding Website Deployment
# Simple script for fast deployments

echo "🎉 Quick Wedding Website Deployment"
echo "=================================="

# Build and deploy
echo "📦 Building..."
npm run build

echo "📁 Copying to docs..."
mkdir -p docs
cp -r out/* docs/

echo "💾 Committing..."
git add .
git commit -m "Quick deploy - $(date '+%Y-%m-%d %H:%M')" || echo "No changes to commit"

echo "🚀 Pushing..."
git push origin main
git push wedding main 2>/dev/null || echo "Wedding remote not configured"

echo "✅ Deployment complete!"
echo "🌐 Configure GitHub Pages: /docs folder on main branch"
