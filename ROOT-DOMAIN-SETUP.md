# 🌐 Root Domain Setup Guide

## 🎯 Goal: Live at https://tien-n-huyen-wedding.github.io/

Currently your site is at: https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
You want it at: https://tien-n-huyen-wedding.github.io/

## ✅ Option 1: Rename Repository (Recommended)

### Step 1: Rename Repository on GitHub
1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding/settings
2. Scroll down to **Repository name**
3. Change from `tien-n-huyen-wedding` to `tien-n-huyen-wedding.github.io`
4. Click **Rename**

### Step 2: Update Local Repository
```bash
# Update remote URL
git remote set-url wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io.git

# Push to new repository
git push wedding main
```

### Step 3: Configure GitHub Pages
1. Go to: https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io/settings/pages
2. Configure:
   - **Source**: "Deploy from a branch"
   - **Branch**: "main"
   - **Folder**: "/ (root)" ⬅️ **This is the key change!**
3. Click **Save**

## ✅ Option 2: Create New Repository

### Step 1: Create New Repository
1. Go to GitHub and create a new repository
2. Name it: `tien-n-huyen-wedding.github.io`
3. Make it public

### Step 2: Update Deployment Scripts
```bash
# Update the repository URL in scripts
sed -i 's|tien-n-huyen-wedding/tien-n-huyen-wedding|tien-n-huyen-wedding/tien-n-huyen-wedding.github.io|g' .github/workflows/*.yml
sed -i 's|tien-n-huyen-wedding/tien-n-huyen-wedding|tien-n-huyen-wedding/tien-n-huyen-wedding.github.io|g' deploy.sh
```

### Step 3: Deploy to New Repository
```bash
# Add new remote
git remote add root-domain https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io.git

# Deploy to root domain
./deploy.sh
```

## 🔧 Update Next.js Configuration

For root domain deployment, update your Next.js config:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for root domain
  distDir: 'out'
};
```

## 🎯 Key Differences for Root Domain

### Current (Subdirectory):
- URL: `https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/`
- GitHub Pages folder: `/docs`
- Repository: `tien-n-huyen-wedding/tien-n-huyen-wedding`

### Root Domain:
- URL: `https://tien-n-huyen-wedding.github.io/`
- GitHub Pages folder: `/ (root)`
- Repository: `tien-n-huyen-wedding/tien-n-huyen-wedding.github.io`

## 🚀 Quick Setup Commands

```bash
# 1. Rename repository on GitHub first, then:

# 2. Update local repository
git remote set-url wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.github.io.git

# 3. Update Next.js config (remove basePath)
# Edit next.config.ts to remove basePath and assetPrefix

# 4. Deploy
./deploy.sh

# 5. Configure GitHub Pages to use root folder
```

## 🎊 Benefits of Root Domain

- **Cleaner URL**: `tien-n-huyen-wedding.github.io` instead of subdirectory
- **Professional**: Looks more professional for a wedding website
- **SEO Friendly**: Better for search engines
- **Easier to Share**: Shorter, cleaner URL

---

**Made with ❤️ for Tien & Huyen's Special Day - November 30, 2025**
