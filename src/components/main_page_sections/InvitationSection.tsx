'use client';

import React from 'react';
import Invitation, { InvitationProps } from '../invitation/Invitation';
import { PACKAGES } from '@/utils/constants';
import { getBackgroundImageStyle } from '@/lib/images/utils';
import { backgroundImages } from '@/lib/images';
import EventsSection from './EventsSection';

interface InvitationSectionProps {
  invitationProps?: Partial<InvitationProps>;
  isLoaded?: boolean;
}

export default function InvitationSection({
  invitationProps = {},
  isLoaded = false
}: InvitationSectionProps) {
  if (isLoaded && invitationProps["party"] && invitationProps["party"] in PACKAGES) {
    return (
      <div id="fh5co-invitation" className="fh5co-bg" style={getBackgroundImageStyle(backgroundImages.event)}>
        <div className="overlay"></div>
        <div className="container" style={{ paddingBottom: '3em' }}>
          <Invitation {...invitationProps as InvitationProps} />
        </div>
      </div>
    );
  }
  return <EventsSection sectionId="fh5co-invitation" />;
}
