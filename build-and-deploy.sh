#!/bin/bash

# 🎉 Build and Deploy Wedding Website
# Simple script to build and deploy your wedding website

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎉 Build and Deploy Wedding Website${NC}"
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

# Step 1: Clean previous build
print_info "🧹 Cleaning previous build..."
rm -rf out
rm -rf docs
print_status "Clean completed"

# Step 2: Install dependencies
print_info "📦 Installing dependencies..."
npm install
print_status "Dependencies installed"

# Step 3: Build the static site
print_info "🔨 Building static site..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    print_error "Build failed - no 'out' directory found"
    exit 1
fi

print_status "Build completed successfully!"

# Step 4: Prepare deployment directory
print_info "📁 Preparing deployment directory..."
mkdir -p docs
cp -r out/* docs/

print_status "Files copied to docs directory"

# Step 5: Fix asset paths for GitHub Pages
print_info "🔧 Fixing asset paths for GitHub Pages..."

# Fix JavaScript paths
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

# Fix JavaScript files
echo "🔧 Fixing JavaScript files..."
find docs -name "*.js" -exec sed -i.bak 's|"/_next/|"./_next/|g' {} \;
find docs -name "*.js" -exec sed -i.bak 's|"/images/|"./images/|g' {} \;
find docs -name "*.js" -exec sed -i.bak 's|"/fonts/|"./fonts/|g' {} \;

# Clean up JS backup files
find docs -name "*.bak" -delete

print_status "Asset paths fixed!"

# Step 6: Git operations
print_info "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit. Deployment may already be up to date."
else
    print_info "💾 Committing changes..."
    git commit -m "Build and deploy wedding website - $(date '+%Y-%m-%d %H:%M:%S')"
    print_status "Changes committed"
fi

# Step 7: Push to repositories
print_info "🚀 Pushing to repositories..."

# Push to origin (main repository)
print_info "Pushing to origin repository..."
if git push origin main; then
    print_status "Pushed to origin repository"
else
    print_error "Failed to push to origin repository"
    exit 1
fi

# Push to wedding repository
print_info "Pushing to wedding repository..."
if git push wedding main; then
    print_status "Pushed to wedding repository"
else
    print_warning "Failed to push to wedding repository"
    print_info "You may need to set up authentication or check your access permissions"
fi

# Step 8: Deployment summary
echo ""
print_status "🎊 Build and Deploy Complete!"
echo ""
print_info "📋 What was done:"
echo "  • Cleaned previous build"
echo "  • Installed dependencies"
echo "  • Built static site"
echo "  • Copied files to docs directory"
echo "  • Fixed all asset paths"
echo "  • Committed changes"
echo "  • Pushed to repositories"
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
print_status "Wedding website built and deployed successfully! 💒"
