#!/bin/bash

# 🎉 Wedding Website Deployment Script
# This script builds and deploys the static wedding website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
WEDDING_REPO="https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git"
WEDDING_REPO_SSH="git@github.com:tien-n-huyen-wedding/tien-n-huyen-wedding.git"
DEPLOY_BRANCH="main"
DEPLOY_DIR="docs"

echo -e "${PURPLE}🎉 Wedding Website Deployment Script${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""

# Function to print colored output
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

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "Not in a git repository. Please run this script from the project root."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install Node.js and npm."
    exit 1
fi

# Check if we have the required dependencies
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_info "Starting deployment process..."

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
mkdir -p $DEPLOY_DIR
cp -r out/* $DEPLOY_DIR/

print_status "Files copied to $DEPLOY_DIR directory"

# Step 3: Git operations
print_info "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit. Deployment may already be up to date."
else
    print_info "💾 Committing changes..."
    git commit -m "Deploy wedding website to $DEPLOY_DIR directory - $(date '+%Y-%m-%d %H:%M:%S')"
    print_status "Changes committed"
fi

# Step 4: Push to repositories
print_info "🚀 Pushing to repositories..."

# Push to origin (main repository)
print_info "Pushing to origin repository..."
if git push origin $DEPLOY_BRANCH; then
    print_status "Pushed to origin repository"
else
    print_error "Failed to push to origin repository"
    exit 1
fi

# Check if wedding remote exists
if git remote get-url wedding >/dev/null 2>&1; then
    print_info "Pushing to wedding repository..."
    if git push wedding $DEPLOY_BRANCH; then
        print_status "Pushed to wedding repository"
    else
        print_warning "Failed to push to wedding repository. You may need to set up access."
        print_info "To set up the wedding remote manually:"
        echo "  git remote add wedding $WEDDING_REPO"
        echo "  git push wedding $DEPLOY_BRANCH"
    fi
else
    print_warning "Wedding remote not found. Setting up remote..."
    print_info "Adding wedding remote..."
    git remote add wedding $WEDDING_REPO
    
    print_info "Pushing to wedding repository..."
    if git push wedding $DEPLOY_BRANCH; then
        print_status "Pushed to wedding repository"
    else
        print_error "Failed to push to wedding repository. Please check your access permissions."
        print_info "You may need to:"
        echo "  1. Set up SSH keys for GitHub"
        echo "  2. Or use HTTPS with a personal access token"
        echo "  3. Or manually push: git push wedding $DEPLOY_BRANCH"
    fi
fi

# Step 5: Deployment summary
echo ""
print_status "🎊 Deployment Complete!"
echo ""
print_info "📋 Deployment Summary:"
echo "  • Branch: $DEPLOY_BRANCH"
echo "  • Directory: $DEPLOY_DIR"
echo "  • Repository: $WEDDING_REPO"
echo ""
print_info "🌐 Next Steps:"
echo "  1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings/pages"
echo "  2. Configure GitHub Pages:"
echo "     - Source: 'Deploy from a branch'"
echo "     - Branch: 'main'"
echo "     - Folder: '/docs'"
echo "  3. Click Save"
echo ""
print_info "🎉 Your website will be live at:"
echo "   https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/"
echo ""
print_status "Wedding website deployment completed successfully! 💒"