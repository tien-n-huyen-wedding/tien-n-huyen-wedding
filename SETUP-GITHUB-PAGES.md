# 🎉 GitHub Pages Setup for Wedding Website

## The Issue
The GitHub Actions deployment failed because of permission issues. Here are the solutions:

## 🔧 Solution 1: Enable GitHub Pages in Repository Settings (Recommended)

### Step 1: Go to Repository Settings
1. Navigate to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)

### Step 2: Configure GitHub Pages
1. Under **Source**, select **Deploy from a branch**
2. Under **Branch**, select **gh-pages**
3. Under **Folder**, select **/ (root)**
4. Click **Save**

### Step 3: Your Website Will Be Live At:
```
https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
```

## 🔧 Solution 2: Use Personal Access Token (Advanced)

If you want to use GitHub Actions, you need to set up a Personal Access Token:

### Step 1: Create Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Give it a name like "Wedding Website Deploy"
4. Select scopes: `repo` (full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token to Repository Secrets
1. Go to your repository: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `PERSONAL_ACCESS_TOKEN`
5. Value: Paste your token
6. Click **Add secret**

### Step 3: The Workflow Will Work Automatically
The updated workflow will now use your personal token to deploy.

## 🔧 Solution 3: Manual Deployment (Simplest)

### Step 1: Build and Deploy Locally
```bash
# Build the static site
npm run build

# Copy files to gh-pages branch
git checkout gh-pages
cp -r out/* .

# Commit and push
git add .
git commit -m "Deploy wedding website"
git push origin gh-pages
```

### Step 2: Enable GitHub Pages
1. Go to repository settings
2. Pages → Deploy from branch → gh-pages → / (root)
3. Save

## 🎊 Your Wedding Website Features

Once deployed, your website will include:

- **🏠 Home Page**: Beautiful wedding landing page
- **💌 Invitation**: Wedding invitation details
- **📱 QR Generator**: Custom QR codes with circular designs
- **🎊 Services**: Wedding services and information
- **📱 Mobile Optimized**: Perfect for all devices
- **🎨 Wedding Theme**: Romantic colors for Tien & Huyen

## 🚀 Quick Start (Recommended)

**Just do this:**
1. Go to https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings/pages
2. Select **Deploy from a branch**
3. Choose **gh-pages** branch
4. Select **/ (root)** folder
5. Click **Save**

Your wedding website will be live in a few minutes! 🎉

## 📱 Website URL
Once deployed, your wedding website will be available at:
**https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/**

## 💝 Special Features Ready
- Circular QR codes with decorative dots
- Transparent background downloads
- Wedding countdown timer
- Photo gallery
- Mobile-responsive design
- Perfect for sharing with wedding guests!

---

**Made with ❤️ for Tien & Huyen's Special Day - November 30, 2025**
