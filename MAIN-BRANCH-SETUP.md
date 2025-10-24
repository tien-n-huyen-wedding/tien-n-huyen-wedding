# 🎉 Main Branch Deployment Setup

## ✅ Deployment Configuration Complete!

Your wedding website is now configured to deploy to the **main branch** with files in the **docs directory**.

### **🔧 Current Setup:**
- **Branch**: `main`
- **Directory**: `/docs`
- **Workflows**: Both GitHub Actions and manual deployment ready
- **Repository**: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding

## 🚀 Enable GitHub Pages

### **Step 1: Go to Repository Settings**
1. Navigate to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings/pages
2. Click on **Settings** tab
3. Scroll down to **Pages** section

### **Step 2: Configure GitHub Pages**
1. Under **Source**, select **"Deploy from a branch"**
2. Under **Branch**, select **"main"**
3. Under **Folder**, select **"/docs"** ⬅️ **This is the key setting!**
4. Click **Save**

### **Step 3: Wait for Deployment**
- GitHub will automatically deploy your site
- It may take a few minutes to become available

## 🌐 Your Website Will Be Live At:
```
https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
```

## 🎊 Wedding Website Features

Your beautiful wedding website includes:

- **🏠 Home Page**: Romantic landing page with countdown timer
- **💌 Invitation**: Wedding invitation details
- **📱 QR Generator**: Custom circular QR codes with decorative hearts
- **🎊 Services**: Wedding services and information
- **📱 Mobile Optimized**: Perfect for all devices
- **⏰ Countdown Timer**: Shows time until November 30, 2025

## 🔧 Manual Deployment (If Needed)

If you need to deploy manually:

```bash
# Build the static site
npm run build

# Copy static files to docs directory
mkdir -p docs
cp -r out/* docs/

# Commit and push
git add .
git commit -m "Deploy wedding website to docs directory"
git push origin main
```

## 🎯 Quick Test

After enabling GitHub Pages:
1. Wait 2-3 minutes for deployment
2. Visit: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
3. Your wedding website should be live! 🎉

---

**Made with ❤️ for Tien & Huyen's Special Day - November 30, 2025**
