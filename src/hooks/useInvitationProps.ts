import { useEffect, useState, useRef } from 'react';
import { InvitationProps } from '@/components/invitation/Invitation';
import { getInvitationProps } from '@/utils/invitation-props';

/**
 * Custom hook to get invitation props from localStorage and URL params
 * If query string params are empty, tries to get props from decompressed URL
 *
 * @param changeableFields - Array of field names that can be changed via URL params
 * @returns Object containing props, loading state, and isLoaded flag
 */
export function useInvitationProps(changeableFields: (keyof InvitationProps)[]) {
  const [props, setProps] = useState<Partial<InvitationProps>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedRef = useRef(false);
  const fieldsRef = useRef(changeableFields);

  // Update ref when fields change
  fieldsRef.current = changeableFields;

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasLoadedRef.current) {
      const searchParams = new URLSearchParams(window.location.search);
      const mergedProps = getInvitationProps(searchParams, fieldsRef.current);

      setProps(mergedProps);
      setIsLoaded(true);
      hasLoadedRef.current = true;
    }
  }, []); // Only run once on mount

  return {
    props,
    isLoaded,
    isLoading: !isLoaded,
  };
}

