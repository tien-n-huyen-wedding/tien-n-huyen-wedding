'use client';

import React, { useEffect, useState } from 'react';
import Invitation, { CHANGEABLE_FIELDS, InvitationProps } from '../invitation/Invitation';
import { PACKAGES } from '@/utils/constants';
import { getBackgroundImageStyle } from '@/lib/images/utils';
import { backgroundImages } from '@/lib/images';
import EventsSection from './EventsSection';

export default function InvitationSection() {
  const [props, setProps] = useState<Partial<InvitationProps>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Safely access window in the browser
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlProps: Partial<InvitationProps> = CHANGEABLE_FIELDS.reduce((acc: Partial<InvitationProps>, key) => {
        const value = searchParams.get(key);
        if (value) {
          acc[key as keyof InvitationProps] = value as any;
        }
        return acc;
      }, {});

      // Also check for party parameter
      const party = searchParams.get('party');
      if (party) {
        urlProps.party = party;
      }

      setProps(urlProps);
      setIsLoaded(true);
    }
  }, []);

  if (isLoaded && props["party"] && props["party"] in PACKAGES) {
    return (
      <div id="fh5co-invitation" className="fh5co-bg" style={getBackgroundImageStyle(backgroundImages.event)}>
        <div className="overlay"></div>
        <div className="container" style={{ paddingBottom: '3em' }}>
          <Invitation {...props as InvitationProps} />
        </div>
      </div>
    );
  }
  return <EventsSection />;
}
