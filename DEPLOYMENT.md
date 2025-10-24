# Wedding Website Deployment Guide

## 🎉 Tien & Huyen Wedding Website

This is a beautiful wedding website built with Next.js 15, React 19, and TypeScript.

## 🚀 Deployment Options

### Option 1: Manual Deployment (Recommended)

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **Deploy using the deployment script:**
   ```bash
   ./deploy.sh
   ```

3. **Push to your wedding repository:**
   ```bash
   git remote add wedding https://github.com/tien-n-huyen-wedding/tien-n-huyen-wedding.git
   git push wedding gh-pages
   ```

### Option 2: GitHub Pages (Automatic)

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Select "/ (root)" folder

2. **Your website will be available at:**
   ```
   https://tien-n-huyen-wedding.github.io/tien-n-huyen-wedding/
   ```

### Option 3: GitHub Actions (CI/CD)

The repository includes a GitHub Actions workflow that automatically deploys when you push to the main branch.

## 📁 Static Files Structure

After building, your static files will be in the `out/` directory:
- `index.html` - Main wedding page
- `invitation/` - Wedding invitation page
- `qr-generator/` - QR code generator
- `services/` - Wedding services
- All assets (CSS, JS, images, fonts)

## 🎨 Features

- **Responsive Design**: Works on all devices
- **QR Code Generator**: Create custom QR codes for wedding invitations
- **Countdown Timer**: Shows time until the wedding
- **Photo Gallery**: Beautiful wedding photos
- **RSVP Functionality**: Guest response system
- **Transparent QR Codes**: Download QR codes with transparent backgrounds

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static files
npm run export
```

## 📱 Pages

- **Home** (`/`) - Main wedding landing page
- **Invitation** (`/invitation`) - Wedding invitation details
- **QR Generator** (`/qr-generator`) - Create custom QR codes
- **Services** (`/services`) - Wedding services and information

## 🎊 Wedding Details

- **Couple**: Quang Tiến & Lệ Huyền
- **Date**: 30 November 2025
- **Location**: Gia Huy Palace, Đà Nẵng

## 💝 Special Features

- **Circular QR Codes**: Beautiful decorative QR codes with dots and circular designs
- **Wedding Theme**: Romantic colors and elegant design
- **Mobile Optimized**: Perfect for sharing on mobile devices
- **Print Ready**: High-quality images for wedding invitations

---

**Made with ❤️ for Tien & Huyen's Special Day**
