# Deployment Guide for Wedding Website

This project is configured for static site deployment. It can be deployed to various platforms including Sevalla, Vercel, Netlify, GitHub Pages, etc.

## Quick Deploy to Sevalla

### Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Sevalla account at [https://sevalla.com/](https://sevalla.com/)

### Steps

1. **Push your code to Git**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create app on Sevalla**:
   - Login to Sevalla dashboard
   - Go to Applications → Create an app
   - Connect your Git repository
   - Select branch: `main`

3. **Configure build**:
   - Build Command: `npm install && npm run build`
   - Output Directory: `out`
   - Node Version: `20.x`

4. **Deploy**:
   - Click "Deploy now" in the Deployments tab
   - Wait for build to complete (~2-5 minutes)

## Build Configuration

The project uses Next.js static export:

- **Output**: Static HTML files in `out/` directory
- **Configuration**: `next.config.ts` with `output: 'export'`
- **Images**: Unoptimized (for static hosting)
- **Routes**: All pages are pre-rendered at build time

## Local Build Test

Test the build locally before deploying:

```bash
# Install dependencies
npm install

# Build static site
npm run build

# The output will be in the 'out' directory
# You can test it with a local server:
npx serve out
```

## Important Notes

- ✅ This is a **static site** - no server-side features
- ✅ All API calls go to external Google Apps Script (no backend needed)
- ✅ All assets (images, fonts, CSS) are included in the build
- ✅ Works with any static hosting service

## Troubleshooting

### Build fails
- Ensure Node.js 20+ is installed
- Check that all dependencies are in `package.json`
- Review build logs in Sevalla dashboard

### Assets not loading
- Verify `next.config.ts` has `images: { unoptimized: true }`
- Check that all files in `public/` are included
- Ensure `trailingSlash: true` is set

### 404 errors on routes
- Static export should handle all routes
- Check that pages are properly exported
- Verify `trailingSlash: true` in config

## Alternative Deployment Options

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
- Drag and drop the `out` folder to Netlify
- Or connect Git repository

### GitHub Pages
- Build locally: `npm run build`
- Push `out/` contents to `gh-pages` branch

## Support

For detailed Sevalla deployment instructions, see [SEVALLA-DEPLOY.md](./SEVALLA-DEPLOY.md)

