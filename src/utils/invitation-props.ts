import { InvitationProps } from '@/components/invitation/Invitation';
import { STORAGE_KEY } from './constants';

/**
 * Get invitation props from localStorage and URL params
 * URL params will override localStorage values
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
  const params = typeof searchParams === 'string'
    ? new URLSearchParams(searchParams)
    : searchParams;

  // 1. Read from localStorage first
  let savedProps: Partial<InvitationProps> = {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      savedProps = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  // 2. Read from URL params
  const urlProps: Partial<InvitationProps> = changeableFields.reduce(
    (acc: Partial<InvitationProps>, key) => {
      const value = params.get(key as string);
      if (value) {
        acc[key] = value as any;
      }
      return acc;
    },
    {}
  );

  // Also check for party parameter
  const party = params.get('party');
  if (party) {
    urlProps.party = party;
  }

  // Check for package parameter (alias for party)
  const packageParam = params.get('package');
  if (packageParam) {
    urlProps.party = packageParam;
  }

  // Check for guestName parameter
  const guestName = params.get('guestName');
  if (guestName) {
    urlProps.guestName = guestName;
  }

  // Check for invitationText parameter
  const invitationText = params.get('invitationText');
  if (invitationText) {
    urlProps.invitationText = invitationText;
  }

  // Check for invitationSecondText parameter
  const invitationSecondText = params.get('invitationSecondText');
  if (invitationSecondText) {
    urlProps.invitationSecondText = invitationSecondText;
  }

  // Check for thanksText parameter
  const thanksText = params.get('thanksText');
  if (thanksText) {
    urlProps.thanksText = thanksText;
  }

  // 3. Merge: localStorage + URL params (URL params override)
  const mergedProps = { ...savedProps, ...urlProps };

  // 4. If URL params exist, save merged props to localStorage
  if (Object.keys(urlProps).length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProps));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
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

