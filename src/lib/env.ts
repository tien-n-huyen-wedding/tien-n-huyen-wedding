/**
 * Get the base URL from environment variable
 * Falls back to default GitHub Pages URL if not set
 */
export function getBaseUrl(): string {
  // For client-side, use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // For server-side/build time, use environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

  if (baseUrl) {
    // Ensure it doesn't end with a slash
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  // Default fallback
  return 'https://tien-n-huyen-wedding.github.io';
}

/**
 * Get the base URL with trailing slash
 */
export function getBaseUrlWithSlash(): string {
  const baseUrl = getBaseUrl();
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

