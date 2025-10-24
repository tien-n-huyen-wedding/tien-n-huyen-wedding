#!/bin/bash

# 🔧 Fix and Deploy Script
# This script fixes all asset paths and deploys the wedding website

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🔧 Fix and Deploy Wedding Website${NC}"
echo -e "${BLUE}====================================${NC}"
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

# Step 2: Prepare deployment directory
print_info "📁 Preparing deployment directory..."
mkdir -p docs
cp -r out/* docs/

print_status "Files copied to docs directory"

# Step 3: Fix asset paths
print_info "🔧 Fixing asset paths..."
./fix-assets.sh

print_status "Asset paths fixed!"

# Step 4: Verify critical files exist
print_info "🔍 Verifying critical files..."
if [ ! -d "docs/_next" ]; then
    print_warning "_next directory not found - JavaScript may not work"
fi

if [ ! -d "docs/css" ]; then
    print_warning "css directory not found - styles may not work"
fi

if [ ! -d "docs/images" ]; then
    print_warning "images directory not found - images may not work"
fi

# Step 5: Git operations
print_info "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit. Deployment may already be up to date."
else
    print_info "💾 Committing changes..."
    git commit -m "Fix asset paths and deploy wedding website - $(date '+%Y-%m-%d %H:%M:%S')"
    print_status "Changes committed"
fi

# Step 6: Push to repositories
print_info "🚀 Pushing to repositories..."

# Push to origin (main repository)
print_info "Pushing to origin repository..."
if git push origin main; then
    print_status "Pushed to origin repository"
else
    print_error "Failed to push to origin repository"
    exit 1
fi

# Step 7: Deployment summary
echo ""
print_status "🎊 Fix and Deploy Complete!"
echo ""
print_info "📋 What was fixed:"
echo "  • JavaScript paths: /_next/ → ./_next/"
echo "  • CSS paths: /css/ → ./css/"
echo "  • Image paths: /images/ → ./images/"
echo "  • Font paths: /fonts/ → ./fonts/"
echo "  • All absolute paths → relative paths"
echo ""
print_info "🌐 Next Steps:"
echo "  1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io/settings/pages"
echo "  2. Configure GitHub Pages:"
echo "     - Source: 'Deploy from a branch'"
echo "     - Branch: 'main'"
echo "     - Folder: '/ (root)' ⬅️ For root domain!"
echo "  3. Click Save"
echo ""
print_info "🎉 Your website will be live at:"
echo "   https://tien-n-huyen-wedding.github.io/"
echo ""
print_status "All asset paths fixed and ready for deployment! 💒"
