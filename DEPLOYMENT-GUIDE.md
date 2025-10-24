# 🚀 Wedding Website Deployment Guide

## 📋 Available Deployment Scripts

### 1. **Full Deployment Script** (`deploy.sh`)
**Complete deployment with error handling and status reporting**

```bash
./deploy.sh
```

**Features:**
- ✅ Full error handling
- ✅ Colored output and status messages
- ✅ Automatic remote setup
- ✅ Comprehensive logging
- ✅ Deployment verification

### 2. **Quick Deployment Script** (`quick-deploy.sh`)
**Fast deployment for quick updates**

```bash
./quick-deploy.sh
```

**Features:**
- ⚡ Fast execution
- 🔧 Minimal output
- 🚀 Quick commits and pushes
- 💨 Perfect for small changes

### 3. **Development Deployment Script** (`dev-deploy.sh`)
**Safe development testing without affecting production**

```bash
./dev-deploy.sh
```

**Features:**
- 🔧 Creates development branch
- 🧪 Safe testing environment
- 📝 Timestamped branches
- 🔄 Easy merge to main

## 🎯 Deployment Process

### **Step 1: Choose Your Script**
- **Full deployment**: Use `./deploy.sh` for complete deployment
- **Quick update**: Use `./quick-deploy.sh` for fast changes
- **Testing**: Use `./dev-deploy.sh` for safe development

### **Step 2: Run the Script**
```bash
# Make sure you're in the project directory
cd /Users/tienphan/workspace/phantien133/wedding

# Run your chosen script
./deploy.sh
```

### **Step 3: Configure GitHub Pages**
1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings/pages
2. Configure:
   - **Source**: "Deploy from a branch"
   - **Branch**: "main"
   - **Folder**: "/docs"
3. Click **Save**

## 🔧 Manual Deployment

If scripts don't work, deploy manually:

```bash
# Build the site
npm run build

# Copy to docs directory
mkdir -p docs
cp -r out/* docs/

# Commit and push
git add .
git commit -m "Manual deployment - $(date)"
git push origin main
git push wedding main
```

## 🌐 Your Website URLs

After deployment, your website will be available at:

- **Main Site**: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
- **Invitation**: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/invitation
- **QR Generator**: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/qr-generator
- **Services**: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/services

## 🎊 Wedding Website Features

Your deployed website includes:

- **🏠 Home Page**: Beautiful landing page with countdown timer
- **💌 Invitation**: Wedding invitation with details
- **📱 QR Generator**: Custom circular QR codes with decorative hearts
- **🎊 Services**: Wedding services and information
- **📱 Mobile Optimized**: Perfect for all devices
- **⏰ Countdown Timer**: Shows time until November 30, 2025

## 🔧 Troubleshooting

### **Common Issues:**

1. **"Wedding remote not found"**
   ```bash
   git remote add wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git
   ```

2. **"Permission denied"**
   - Set up SSH keys for GitHub
   - Or use HTTPS with personal access token

3. **"Build failed"**
   ```bash
   npm install
   npm run build
   ```

4. **"No changes to commit"**
   - This is normal if nothing changed
   - The deployment will still work

### **GitHub Pages Not Working:**
1. Check repository settings: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings/pages
2. Ensure branch is set to "main"
3. Ensure folder is set to "/docs"
4. Wait 2-3 minutes for deployment

## 🎯 Quick Commands

```bash
# Full deployment
./deploy.sh

# Quick update
./quick-deploy.sh

# Development testing
./dev-deploy.sh

# Manual build only
npm run build

# Check deployment status
git status
git log --oneline -5
```

---

**Made with ❤️ for Tien & Huyen's Special Day - November 30, 2025**
