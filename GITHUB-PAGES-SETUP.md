# 🎉 GitHub Pages Setup for Wedding Website

## ❌ Current Issue
The GitHub Actions workflow is failing because GitHub Pages hasn't been enabled yet in your repository settings.

## ✅ Solution: Enable GitHub Pages First

### Step 1: Go to Repository Settings
1. Navigate to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)

### Step 2: Configure GitHub Pages
1. Under **Source**, select **"GitHub Actions"**
2. Click **Save**

### Step 3: Alternative - Use Branch Deployment
If GitHub Actions doesn't work, use this instead:
1. Under **Source**, select **"Deploy from a branch"**
2. Under **Branch**, select **"gh-pages"**
3. Under **Folder**, select **"/docs"**
4. Click **Save**

## 🚀 After Enabling Pages

Your website will be available at:
```
https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
```

## 🔧 Manual Deployment (If Needed)

If GitHub Actions still doesn't work, you can deploy manually:

```bash
# Build the static site
npm run build

# Switch to gh-pages branch
git checkout gh-pages

# Copy static files to docs directory
mkdir -p docs
cp -r out/* docs/

# Commit and push
git add .
git commit -m "Deploy wedding website to docs directory"
git push origin gh-pages
```

## 🎊 Your Wedding Website Features

Once deployed, your website will include:

- **🏠 Home Page**: Beautiful wedding landing page
- **💌 Invitation**: Wedding invitation details
- **📱 QR Generator**: Custom QR codes with circular designs
- **🎊 Services**: Wedding services and information
- **📱 Mobile Optimized**: Perfect for all devices
- **🎨 Wedding Theme**: Romantic colors for Tien & Huyen

## 🎯 Quick Fix

**Just do this:**
1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings/pages
2. Select **"GitHub Actions"** as source
3. Click **Save**
4. The workflow will automatically run and deploy your site!

---

**Made with ❤️ for Tien & Huyen's Special Day - November 30, 2025**
