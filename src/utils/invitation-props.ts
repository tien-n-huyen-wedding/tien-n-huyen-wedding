import { InvitationProps } from '@/components/invitation/Invitation';
import { STORAGE_KEY } from './constants';
import { decompressUrl } from '@/lib/url-compress';

/**
 * Get invitation props from localStorage and URL params
 * Merges regular URL params with decompressed URL params (regular params take precedence)
 * If no URL params exist (neither regular nor decompressed), returns localStorage props only
 * If URL params exist, merged props will be saved to localStorage
 *
 * @param searchParams - URLSearchParams or query string
 * @param changeableFields - Array of field names that can be changed via URL params
 * @returns Merged invitation props
 */
export function getInvitationProps(
  searchParams: URLSearchParams | string,
  changeableFields: (keyof InvitationProps)[]
): Partial<InvitationProps> {
  if (typeof window === 'undefined') {
    return {};
  }

  // Convert string to URLSearchParams if needed
  const originalParams = typeof searchParams === 'string'
    ? new URLSearchParams(searchParams)
    : searchParams;

  // 1. Get regular params (excluding 'q' parameter)
  const regularParams = new URLSearchParams();
  originalParams.forEach((value, key) => {
    if (key !== 'q') {
      regularParams.set(key, value);
    }
  });

  // 2. Get params from decompressed URL (if 'q' parameter exists)
  const decompressedParams = new URLSearchParams();
  const compressed = originalParams.get('q');
  if (compressed) {
    try {
      const currentUrl = window.location.href;
      const decompressedUrl = decompressUrl(currentUrl);
      const decompressedUrlObj = new URL(decompressedUrl);
      decompressedUrlObj.searchParams.forEach((value, key) => {
        decompressedParams.set(key, value);
      });
    } catch (error) {
      console.error('Error decompressing URL:', error);
    }
  }

  // 3. Merge regular params and decompressed params (regular params take precedence)
  const mergedParams = new URLSearchParams();
  // First add decompressed params
  decompressedParams.forEach((value, key) => {
    mergedParams.set(key, value);
  });
  // Then override with regular params
  regularParams.forEach((value, key) => {
    mergedParams.set(key, value);
  });

  // 4. Check if we have any URL params
  const hasUrlParams = mergedParams.toString().length > 0;

  // 5. Read from localStorage
  let savedProps: Partial<InvitationProps> = {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      savedProps = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  // 6. If no URL params exist, return localStorage props
  if (!hasUrlParams) {
    return savedProps;
  }

  // 7. Read from merged URL params
  const urlProps: Partial<InvitationProps> = changeableFields.reduce(
    (acc: Partial<InvitationProps>, key) => {
      const value = mergedParams.get(key as string);
      if (value) {
        acc[key] = value as any;
      }
      return acc;
    },
    {}
  );

  // Also check for party parameter
  const party = mergedParams.get('party');
  if (party) {
    urlProps.party = party;
  }

  // Check for package parameter (alias for party)
  const packageParam = mergedParams.get('package');
  if (packageParam) {
    urlProps.party = packageParam;
  }

  // Check for guestName parameter
  const guestName = mergedParams.get('guestName');
  if (guestName) {
    urlProps.guestName = guestName;
  }

  // Check for invitationText parameter
  const invitationText = mergedParams.get('invitationText');
  if (invitationText) {
    urlProps.invitationText = invitationText;
  }

  // Check for invitationSecondText parameter
  const invitationSecondText = mergedParams.get('invitationSecondText');
  if (invitationSecondText) {
    urlProps.invitationSecondText = invitationSecondText;
  }

  // Check for thanksText parameter
  const thanksText = mergedParams.get('thanksText');
  if (thanksText) {
    urlProps.thanksText = thanksText;
  }

  // 8. Merge: localStorage + URL params (URL params override)
  const mergedProps = { ...urlProps };

  // 9. Save merged props to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProps));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }

  return mergedProps;
}

/**
 * Save invitation props to localStorage
 *
 * @param props - Invitation props to save
 */
export function saveInvitationProps(props: Partial<InvitationProps>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Get invitation props from localStorage only
 *
 * @returns Invitation props from localStorage or empty object
 */
export function getStoredInvitationProps(): Partial<InvitationProps> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  return {};
}

/**
 * Clear invitation props from localStorage
 */
export function clearInvitationProps(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Build query string from invitation props
 *
 * @param props - Invitation props to convert to query string
 * @returns Query string (without leading '?') or empty string if no props
 */
export function buildInvitationQueryString(props: Partial<InvitationProps>): string {
  if (!props || Object.keys(props).length === 0) {
    return '';
  }

  const params = new URLSearchParams();

  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Build home URL with invitation props as query string
 *
 * @param props - Invitation props to include in URL
 * @returns Home URL with query string or just '/' if no props
 */
export function buildHomeUrl(props: Partial<InvitationProps>): string {
  const queryString = buildInvitationQueryString(props);
  return `/${queryString}`;
}

