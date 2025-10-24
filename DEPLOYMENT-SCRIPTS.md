# 🚀 Wedding Website Deployment Scripts

## 📋 Available Scripts

### 1. **Complete Build and Deploy** (`build-and-deploy.sh`)
**Full deployment with all features**

```bash
./build-and-deploy.sh
```

**What it does:**
- ✅ Cleans previous build
- ✅ Installs dependencies
- ✅ Builds static site
- ✅ Copies to docs directory
- ✅ Fixes all asset paths
- ✅ Commits and pushes to both repositories

### 2. **Quick Deploy** (`quick-deploy.sh`)
**Fast deployment for quick updates**

```bash
./quick-deploy.sh
```

**What it does:**
- ⚡ Builds and deploys quickly
- 🔧 Fixes essential asset paths
- 🚀 Commits and pushes changes
- 💨 Perfect for small updates

### 3. **Development Build** (`dev-build.sh`)
**For local development and testing**

```bash
./dev-build.sh
```

**What it does:**
- 🔧 Installs dependencies
- 🔨 Builds the project
- 🚀 Starts development server

## 🎯 How to Use

### **For Production Deployment:**
```bash
# Complete deployment
./build-and-deploy.sh
```

### **For Quick Updates:**
```bash
# Fast deployment
./quick-deploy.sh
```

### **For Development:**
```bash
# Start development server
./dev-build.sh
```

## 🔧 What the Scripts Fix

### **Asset Path Issues:**
- **JavaScript**: `/_next/` → `./_next/`
- **CSS**: `/css/` → `./css/`
- **Images**: `/images/` → `./images/`
- **Fonts**: `/fonts/` → `./fonts/`
- **All absolute paths** → **relative paths**

### **GitHub Pages Compatibility:**
- ✅ Fixes 404 errors for JavaScript files
- ✅ Fixes 404 errors for CSS files
- ✅ Fixes 404 errors for images
- ✅ Fixes 404 errors for fonts
- ✅ Ensures all assets load correctly

## 🌐 After Deployment

### **Configure GitHub Pages:**
1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io/settings/pages
2. Configure:
   - **Source**: "Deploy from a branch"
   - **Branch**: "main"
   - **Folder**: "/ (root)" ⬅️ **For root domain!**
3. Click **Save**

### **Your Website Will Be Live At:**
```
https://tien-n-huyen-wedding.github.io/
```

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

1. **"Build failed"**
   ```bash
   npm install
   npm run build
   ```

2. **"Permission denied"**
   - Check your SSH keys for GitHub
   - Or use HTTPS with personal access token

3. **"No changes to commit"**
   - This is normal if nothing changed
   - The deployment will still work

4. **"Wedding remote not configured"**
   ```bash
   git remote add wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io.git
   ```

## 🎯 Quick Commands

```bash
# Complete deployment
./build-and-deploy.sh

# Quick update
./quick-deploy.sh

# Development
./dev-build.sh

# Manual build only
npm run build

# Check status
git status
```

---

**Made with ❤️ for Tien & Huyen's Special Day - November 30, 2025**
