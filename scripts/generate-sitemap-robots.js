#!/usr/bin/env node

/**
 * Generate sitemap.xml and robots.txt with the correct base URL from environment
 */

const fs = require('fs');
const path = require('path');

// Get base URL from environment variable
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://tien-n-huyen-wedding.github.io';
const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

// Generate sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Main Wedding Page -->
  <url>
    <loc>${cleanBaseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- QR Generator Page -->
  <url>
    <loc>${cleanBaseUrl}/qr-generator/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
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

