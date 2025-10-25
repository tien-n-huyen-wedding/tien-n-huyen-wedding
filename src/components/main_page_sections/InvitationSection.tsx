'use client';

import React from 'react';
import Invitation, { CHANGEABLE_FIELDS, InvitationProps } from '../invitation/Invitation';
import { PACKAGES } from '@/utils/constants';
import { getBackgroundImageStyle } from '@/lib/images/utils';
import { backgroundImages } from '@/lib/images';
import EventsSection from './EventsSection';
import { useInvitationProps } from '@/hooks/useInvitationProps';

export default function InvitationSection() {
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

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
