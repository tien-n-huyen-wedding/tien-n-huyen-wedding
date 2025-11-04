import { useEffect, useState } from 'react';
import { InvitationProps } from '@/components/invitation/Invitation';
import { getInvitationProps } from '@/utils/invitation-props';
import { decompressUrl } from '@/lib/url-compress';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);

      // Check if we have regular query params (excluding 'q' parameter)
      const hasRegularParams = Array.from(searchParams.keys()).some(key => key !== 'q');

      let paramsToUse = searchParams;

      // If no regular params, try to get from decompressed URL
      if (!hasRegularParams) {
        const compressed = searchParams.get('q');
        if (compressed) {
          try {
            const currentUrl = window.location.href;
            const decompressedUrl = decompressUrl(currentUrl);
            const decompressedUrlObj = new URL(decompressedUrl);
            paramsToUse = new URLSearchParams(decompressedUrlObj.search);
          } catch (error) {
            console.error('Error decompressing URL:', error);
          }
        }
      }

      const mergedProps = getInvitationProps(paramsToUse, changeableFields);

      setProps(mergedProps);
      setIsLoaded(true);
    }
  }, [changeableFields]);

  return {
    props,
    isLoaded,
    isLoading: !isLoaded,
  };
}

