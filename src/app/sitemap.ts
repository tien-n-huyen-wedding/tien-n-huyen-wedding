import { MetadataRoute } from 'next'

// Force static generation for GitHub Pages
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tien-n-huyen-wedding.github.io'
  const lastModified = '2025-10-24'

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/qr-generator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}

