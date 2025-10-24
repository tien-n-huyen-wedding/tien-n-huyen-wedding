#!/bin/bash

# 🌐 Root Domain Setup Script
# This script helps transition to root domain deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🌐 Root Domain Setup Script${NC}"
echo -e "${BLUE}============================${NC}"
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

echo -e "${YELLOW}🎯 Goal: Move from subdirectory to root domain${NC}"
echo "Current: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/"
echo "Target:  https://tien-n-huyen-wedding.github.io/"
echo ""

print_warning "IMPORTANT: You need to rename your repository on GitHub first!"
echo ""
print_info "Steps to complete:"
echo "1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings"
echo "2. Change repository name to: tien-n-huyen-wedding.github.io"
echo "3. Click 'Rename'"
echo "4. Then run this script again"
echo ""

# Check if repository is configured correctly
CURRENT_REPO=$(git remote get-url wedding 2>/dev/null || echo "")
if [[ "$CURRENT_REPO" == *"tien-n-huyen-wedding.github.io"* ]]; then
    print_status "Repository configured correctly for root domain!"
else
    print_error "Repository not configured correctly."
    echo ""
    print_info "Current remote: $CURRENT_REPO"
    print_info "Expected: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io.git"
    exit 1
fi

# Update deployment configuration
print_info "🔧 Updating deployment configuration..."

# Update GitHub Actions workflows
print_info "Updating GitHub Actions workflows..."
sed -i.bak 's|tien-n-huyen-wedding/tien-n-huyen-wedding|tien-n-huyen-wedding/tien-n-huyen-wedding.github.io|g' .github/workflows/*.yml

# Update deployment scripts
print_info "Updating deployment scripts..."
sed -i.bak 's|tien-n-huyen-wedding/tien-n-huyen-wedding|tien-n-huyen-wedding/tien-n-huyen-wedding.github.io|g' deploy.sh
sed -i.bak 's|tien-n-huyen-wedding/tien-n-huyen-wedding|tien-n-huyen-wedding/tien-n-huyen-wedding.github.io|g' quick-deploy.sh

# Clean up backup files
find . -name "*.bak" -delete

print_status "Configuration updated!"

# Build and deploy
print_info "📦 Building for root domain..."
npm run build

print_info "📁 Preparing deployment..."
mkdir -p docs
cp -r out/* docs/

# Fix asset paths for root domain
print_info "🔧 Fixing asset paths for root domain..."
./fix-assets.sh

print_info "💾 Committing changes..."
git add .
git commit -m "Configure for root domain deployment - $(date '+%Y-%m-%d %H:%M:%S')"

print_info "🚀 Deploying to root domain..."
git push wedding main

print_status "🎊 Root domain deployment complete!"
echo ""
print_info "📋 Final steps:"
echo "1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io/settings/pages"
echo "2. Configure GitHub Pages:"
echo "   - Source: 'Deploy from a branch'"
echo "   - Branch: 'main'"
echo "   - Folder: '/ (root)' ⬅️ This is the key change!"
echo "3. Click Save"
echo ""
print_info "🌐 Your website will be live at:"
echo "   https://tien-n-huyen-wedding.github.io/"
echo ""
print_status "Wedding website ready for root domain! 💒"
