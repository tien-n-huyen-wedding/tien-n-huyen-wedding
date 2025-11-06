# Sevalla Deployment Guide

This guide will help you deploy the wedding website to Sevalla.

## Prerequisites

1. **Sevalla Account**: Sign up at [https://sevalla.com/](https://sevalla.com/)
2. **Git Repository**: Ensure your code is pushed to GitHub, GitLab, or Bitbucket

## Deployment Steps

### Step 1: Prepare Your Repository

Make sure your code is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Sevalla deployment"
git push origin main
```

### Step 2: Create Application on Sevalla

1. Log in to your [Sevalla Dashboard](https://sevalla.com/)
2. Navigate to **Applications** from the left sidebar
3. Click **"Create an app"** button
4. Configure your application:
   - **Repository**: Select your Git repository (GitHub/GitLab/Bitbucket)
   - **Branch**: Select `main` (or your default branch)
   - **Application Name**: `wedding-website` (or your preferred name)
   - **Region**: Choose the closest region to your users
   - **Pod Size**: Select appropriate size (small should work for static sites)

### Step 3: Choose Deployment Method

You have two options for deployment:

#### Option A: Static Site Deployment (Recommended for simple setup)

1. In your Sevalla application settings, go to **Build Settings**
2. Set the following:
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `out`
   - **Node Version**: `20.x` (or latest LTS)
   - **Install Command**: `npm install` (if separate field exists)

**Note**: The `.sevalla.yml` file in the repository should automatically configure these settings. If Sevalla supports YAML configuration files, it will use those settings.

#### Option B: Docker Deployment (Recommended for production)

1. Ensure `Dockerfile` is in your repository (already included)
2. In your Sevalla application settings:
   - Set **Deployment Type**: `Docker`
   - Set **Dockerfile Path**: `Dockerfile` (or leave default)
   - Set **Port**: `80`
3. Sevalla will automatically:
   - Build the Docker image
   - Run the container with nginx
   - Serve your static site

**Benefits of Docker deployment**:
- ✅ Consistent environment across all deployments
- ✅ Better caching and performance with nginx
- ✅ Health checks included
- ✅ Production-ready configuration

See [DOCKER-DEPLOY.md](./DOCKER-DEPLOY.md) for detailed Docker deployment instructions.

### Step 4: Environment Variables (Optional)

If you need any environment variables, add them in:
- **Settings** > **Environment Variables**

For this wedding website, no environment variables are required as it's a static site.

### Step 5: Deploy

1. Go to the **Deployments** tab
2. Click **"Deploy now"** to trigger the first deployment
3. Wait for the build to complete (usually 2-5 minutes)

### Step 6: Configure Custom Domain (Optional)

1. Go to **Settings** > **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions provided by Sevalla

## Build Configuration

The project is already configured for static export:

- **Next.js Config**: `next.config.ts` has `output: 'export'`
- **Build Output**: Files are generated in the `out/` directory
- **Static Assets**: All images, fonts, and CSS are included in the build

## Post-Deployment

After deployment:

1. **Test the site**: Visit your Sevalla-provided URL
2. **Check functionality**:
   - Home page loads correctly
   - Gallery pages work
   - Admin page is accessible
   - All images and assets load properly

## Troubleshooting

### Build Fails

- Check the build logs in Sevalla dashboard
- Ensure Node.js version is 20.x or later
- Verify all dependencies are in `package.json`

### Assets Not Loading

- Check that `next.config.ts` has `images: { unoptimized: true }`
- Verify all assets are in the `public/` directory

### 404 Errors

- Ensure `trailingSlash: true` is set in `next.config.ts`
- Check that all routes are properly exported

## Manual Deployment Alternative

If you prefer to deploy manually:

1. Build locally:
   ```bash
   npm run build
   ```

2. The static files will be in the `out/` directory

3. Upload the contents of `out/` to your Sevalla static hosting

## Support

For Sevalla-specific issues, refer to:
- [Sevalla Documentation](https://docs.sevalla.com/)
- [Sevalla Support](https://sevalla.com/support)

