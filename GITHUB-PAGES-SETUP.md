# GitHub Pages Setup Guide

This guide will help you activate GitHub Pages for your wedding website.

## 🎯 Recommended Setup: Deploy from `docs/` Folder

This is the simplest approach that works with your existing `build-and-deploy.sh` script.

## 📋 Step-by-Step Instructions

### Step 1: Configure GitHub Pages

1. **Go to your repository** on GitHub
   - Navigate to: `https://github.com/phantien133/wedding`

2. **Open Settings**
   - Click the **Settings** tab (top right of repository)

3. **Navigate to Pages**
   - In the left sidebar, scroll down and click **Pages**

4. **Configure Source**
   - Under **"Build and deployment"**
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **`main`**
   - **Folder**: Select **`/docs`**
   - Click **Save**

5. **Wait for deployment**
   - GitHub will show: "Your site is ready to be published"
   - After a minute, it will change to: "Your site is live at..."

### Step 2: Build and Deploy

Run your deployment script:

```bash
./build-and-deploy.sh
```

This will:
- Build your Next.js site
- Copy to `docs/` folder
- Fix paths for GitHub Pages
- Commit and push to GitHub

### Step 3: Verify

1. Go back to **Settings** → **Pages**
2. You should see: **"Your site is live at https://phantien133.github.io/wedding/"**
3. Click the link to view your site

## 🔧 Alternative: Use GitHub Actions (Advanced)

If you prefer automatic deployment on every push, use GitHub Actions instead.

### Step 1: Configure GitHub Pages for Actions

1. **Go to Settings** → **Pages**
2. **Source**: Select **"GitHub Actions"**
3. Click **Save**

### Step 2: Enable Workflow Permissions

1. **Go to Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### Step 3: Trigger Deployment

Push any commit to `main` branch:

```bash
git add .
git commit -m "Deploy website"
git push origin main
```

The workflow will automatically:
- Build your site
- Deploy to GitHub Pages

### Step 4: Monitor Deployment

1. Go to **Actions** tab
2. Watch the "Deploy Wedding Website" workflow
3. Once complete, your site is live!

## 🚨 Troubleshooting

### Pages is Still Inactive

**Check 1: Is the repository public?**
- GitHub Pages requires a public repository (unless you have GitHub Pro)
- Go to **Settings** → **General** → Check visibility

**Check 2: Did you select the correct branch?**
- Must be `main` (or whatever your default branch is)
- Must be `/docs` folder

**Check 3: Does the docs/ folder exist?**
- Run `./build-and-deploy.sh` first
- Check that `docs/` folder is committed to git

**Check 4: Check deployment status**
- Go to **Settings** → **Pages**
- Look for any error messages

### Site Shows 404

**Check 1: Paths are correct**
- The `build-and-deploy.sh` script fixes paths automatically
- Make sure you ran the script

**Check 2: Clear browser cache**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

**Check 3: Wait a few minutes**
- GitHub Pages can take 1-5 minutes to update

### Workflow Fails

**Check Actions tab:**
1. Go to **Actions** tab
2. Click on the failed workflow
3. Read the error message

**Common issues:**
- Missing dependencies: Run `npm install` locally first
- Build errors: Test `npm run build` locally
- Permission errors: Check workflow permissions in Settings

## 📊 Current Setup

Your repository has both deployment methods ready:

### Method 1: Manual Deployment Script ✅
- **File**: `build-and-deploy.sh`
- **Usage**: `./build-and-deploy.sh`
- **Deploys to**: `docs/` folder
- **GitHub Pages Source**: "Deploy from a branch" → `main` → `/docs`

### Method 2: GitHub Actions Workflow ✅
- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Automatic on push to `main`
- **GitHub Pages Source**: "GitHub Actions"

**Choose one method** and configure GitHub Pages accordingly.

## 🎯 Recommended Choice

**Use Method 1** (Manual Script) if:
- ✅ You want full control over when to deploy
- ✅ You want to test locally before deploying
- ✅ You prefer simplicity

**Use Method 2** (GitHub Actions) if:
- ✅ You want automatic deployment on every push
- ✅ You're comfortable with CI/CD workflows
- ✅ You want to see deployment history in Actions tab

## 📝 Quick Checklist

- [ ] GitHub Pages enabled in Settings → Pages
- [ ] Source configured (either "Deploy from a branch" or "GitHub Actions")
- [ ] Repository is public (or you have GitHub Pro)
- [ ] `docs/` folder exists and is committed (for Method 1)
- [ ] Workflow permissions enabled (for Method 2)
- [ ] First deployment completed successfully
- [ ] Site is accessible at the GitHub Pages URL

## 🔗 Your Site URL

Once configured, your site will be available at:

```
https://phantien133.github.io/wedding/
```

Or if you have a custom domain configured:
```
https://your-custom-domain.com
```

## 📞 Still Having Issues?

1. Check **Settings** → **Pages** for any error messages
2. Check **Actions** tab for workflow failures
3. Verify `docs/` folder exists: `ls -la docs/`
4. Try running the build script again: `./build-and-deploy.sh`

---

Happy deploying! 🚀

