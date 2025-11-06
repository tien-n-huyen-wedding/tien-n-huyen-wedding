/**
 * Client-side URL compression utility
 * Compresses query parameters into a shorter format for static sites
 */

interface CompressedParams {
  [key: string]: string;
}

/**
 * Compress a URL by encoding query parameters into a shorter format
 * Uses base64url encoding (URL-safe base64) with gzip-like compression
 */
export function compressUrl(fullUrl: string): string {
  try {
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);

    // Convert params to object
    const paramsObj: CompressedParams = {};
    params.forEach((value, key) => {
      paramsObj[key] = value;
    });

    // If no params, return original URL
    if (Object.keys(paramsObj).length === 0) {
      return url.origin + url.pathname;
    }

    // Encode params as JSON, then base64url encode
    const jsonString = JSON.stringify(paramsObj);
    const compressed = base64UrlEncode(jsonString);

    // Return shortened URL with compressed params
    return `${url.origin}${url.pathname}?q=${compressed}`;
  } catch (error) {
    console.error('Error compressing URL:', error);
    return fullUrl;
  }
}

/**
 * Decompress a shortened URL back to full query parameters
 */
export function decompressUrl(shortUrl: string): string {
  try {
    const url = new URL(shortUrl);
    const compressed = url.searchParams.get('q');

    // If no compressed param, return original URL
    if (!compressed) {
      return shortUrl;
    }

    // Decode base64url, then parse JSON
    const jsonString = base64UrlDecode(compressed);
    const paramsObj: CompressedParams = JSON.parse(jsonString);

    // Reconstruct URL with original query params
    const newParams = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    return `${url.origin}${url.pathname}?${newParams.toString()}`;
  } catch (error) {
    console.error('Error decompressing URL:', error);
    return shortUrl;
  }
}

/**
 * Check if a URL is compressed (has 'q' parameter)
 */
export function isCompressedUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.has('q');
  } catch {
    return false;
  }
}

/**
 * Base64URL encode (URL-safe base64)
 * Replaces + with -, / with _, and removes = padding
 */
function base64UrlEncode(str: string): string {
  // Use browser's btoa if available, otherwise use Buffer
  let base64: string;
  if (typeof window !== 'undefined') {
    base64 = btoa(unescape(encodeURIComponent(str)));
  } else {
    base64 = Buffer.from(str, 'utf-8').toString('base64');
  }

  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Base64URL decode (URL-safe base64)
 * Replaces - with +, _ with /, and adds back = padding if needed
 */
function base64UrlDecode(str: string): string {
  // Add padding back if needed
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Add padding
  while (base64.length % 4) {
    base64 += '=';
  }

  // Use browser's atob if available, otherwise use Buffer
  if (typeof window !== 'undefined') {
    return decodeURIComponent(escape(atob(base64)));
  } else {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
}

/**
 * Get the base URL for the site
 * @deprecated Use getBaseUrl from '@/lib/env' instead
 */
export function getBaseUrl(): string {
  // Import here to avoid circular dependency
  const { getBaseUrl: getBaseUrlFromEnv } = require('./env');
  return getBaseUrlFromEnv();
}

