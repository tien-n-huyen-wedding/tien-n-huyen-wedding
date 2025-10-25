import { useEffect, useState } from 'react';
import { InvitationProps } from '@/components/invitation/Invitation';
import { getInvitationProps } from '@/utils/invitation-props';

/**
 * Custom hook to get invitation props from localStorage and URL params
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
      const mergedProps = getInvitationProps(searchParams, changeableFields);

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

