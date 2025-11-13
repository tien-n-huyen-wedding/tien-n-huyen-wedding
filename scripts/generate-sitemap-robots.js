#!/usr/bin/env node

/**
 * Generate sitemap.xml and robots.txt with the correct base URL from environment
 */

const fs = require('fs');
const path = require('path');

// Get base URL from environment variable
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://tien-n-huyen-wedding.github.io';
const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

// Gallery album IDs
const galleryAlbums = ['coffee', 'outdoor', 'studio', 'couple', 'all'];

// Generate sitemap.xml
const today = new Date().toISOString().split('T')[0];

const urlEntries = [
  // Main Wedding Page
  {
    loc: `${cleanBaseUrl}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '1.0',
    comment: 'Main Wedding Page'
  },
  // QR Generator Page
  {
    loc: `${cleanBaseUrl}/qr-generator/`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.5',
    comment: 'QR Generator Page'
  },
  // Gallery Album Pages
  ...galleryAlbums.map(albumId => ({
    loc: `${cleanBaseUrl}/gallery/${albumId}/`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
    comment: `Gallery Album: ${albumId}`
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries.map(entry => `  <!-- ${entry.comment} -->
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Generate robots.txt
const robots = `# Wedding Website - Robots.txt
# Allow all web crawlers

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${cleanBaseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1
`;

// Write files
const publicDir = path.join(process.cwd(), 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const robotsPath = path.join(publicDir, 'robots.txt');

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
fs.writeFileSync(robotsPath, robots, 'utf8');

console.log(`✅ Generated sitemap.xml and robots.txt with base URL: ${cleanBaseUrl}`);

