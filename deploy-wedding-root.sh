#!/bin/bash

# 🎉 Deploy to Wedding Repository - Root Directory
# This script deploys to the wedding repository main branch in root directory

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎉 Deploy to Wedding Repository - Root Directory${NC}"
echo -e "${BLUE}===============================================${NC}"
echo ""

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Step 1: Build the static site
print_info "📦 Building static site..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    print_error "Build failed - no 'out' directory found"
    exit 1
fi

print_status "Build completed successfully!"

# Step 2: Prepare files for root directory deployment
print_info "📁 Preparing files for root directory deployment..."

# Copy static files to root (not docs directory)
cp -r out/* .

print_status "Files copied to root directory"

# Step 3: Fix asset paths for root directory
print_info "🔧 Fixing asset paths for root directory..."

# Fix JavaScript paths
echo "🔧 Fixing JavaScript paths..."
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/_next/|src="./_next/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/_next/|href="./_next/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/_next|src="./_next|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/_next|href="./_next|g' {} \;

# Fix CSS paths
echo "🎨 Fixing CSS paths..."
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/css/|href="./css/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/js/|href="./js/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/css|href="./css|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/js|href="./js|g' {} \;

# Fix image paths
echo "🖼️  Fixing image paths..."
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/images/|src="./images/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/images/|href="./images/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/images|src="./images|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/images|href="./images|g' {} \;

# Fix font paths
echo "🔤 Fixing font paths..."
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/fonts/|src="./fonts/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/fonts/|href="./fonts/|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/fonts|src="./fonts|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/fonts|href="./fonts|g' {} \;

# Fix favicon and other assets
echo "⭐ Fixing other assets..."
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/favicon|href="./favicon|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/favicon|src="./favicon|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/file|href="./file|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/file|src="./file|g' {} \;

# Fix any remaining absolute paths
echo "🔧 Fixing remaining absolute paths..."
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|href="/|href="./|g' {} \;
find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|src="/|src="./|g' {} \;

# Clean up backup files
echo "🧹 Cleaning up backup files..."
find . -name "*.bak" -not -path "./node_modules/*" -not -path "./.git/*" -delete

# Fix CSS files
echo "🎨 Fixing CSS files..."
find . -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|url("/fonts/|url("./fonts/|g' {} \;
find . -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|url("/images/|url("./images/|g' {} \;
find . -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|url("/js/|url("./js/|g' {} \;
find . -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|url("/fonts|url("./fonts|g' {} \;
find . -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|url("/images|url("./images|g' {} \;
find . -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|url("/js|url("./js|g' {} \;

# Clean up CSS backup files
find . -name "*.bak" -not -path "./node_modules/*" -not -path "./.git/*" -delete

# Fix JavaScript files that might have absolute paths
echo "🔧 Fixing JavaScript files..."
find . -name "*.js" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|"/_next/|"./_next/|g' {} \;
find . -name "*.js" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|"/images/|"./images/|g' {} \;
find . -name "*.js" -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak 's|"/fonts/|"./fonts/|g' {} \;

# Clean up JS backup files
find . -name "*.bak" -not -path "./node_modules/*" -not -path "./.git/*" -delete

print_status "Asset paths fixed for root directory!"

# Step 4: Git operations
print_info "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit. Deployment may already be up to date."
else
    print_info "💾 Committing changes..."
    git commit -m "Deploy wedding website to root directory - $(date '+%Y-%m-%d %H:%M:%S')"
    print_status "Changes committed"
fi

# Step 5: Push to wedding repository
print_info "🚀 Pushing to wedding repository..."
if git push wedding main; then
    print_status "Pushed to wedding repository"
else
    print_error "Failed to push to wedding repository"
    print_info "You may need to set up authentication or check your access permissions"
    exit 1
fi

# Step 6: Deployment summary
echo ""
print_status "🎊 Root Directory Deployment Complete!"
echo ""
print_info "📋 Deployment Summary:"
echo "  • Repository: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io"
echo "  • Branch: main"
echo "  • Directory: root (/)"
echo "  • Asset paths: Fixed for root directory"
echo ""
print_info "🌐 Next Steps:"
echo "  1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io/settings/pages"
echo "  2. Configure GitHub Pages:"
echo "     - Source: 'Deploy from a branch'"
echo "     - Branch: 'main'"
echo "     - Folder: '/ (root)' ⬅️ This is the key setting!"
echo "  3. Click Save"
echo ""
print_info "🎉 Your website will be live at:"
echo "   https://tien-n-huyen-wedding.github.io/"
echo ""
print_status "Wedding website deployed to root directory! 💒"
