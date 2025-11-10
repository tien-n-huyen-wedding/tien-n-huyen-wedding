
import React from 'react';
import WeddingPartyCard from './WeddingPartyCard';
import MainCeremonyCard from './MainCeremonyCard';
import { PACKAGES, MainCeremonyCardProps, WeddingPartyCardProps } from '@/utils/constants';


const RenderInvitation = ({ ceremonyInfo, weddingPartyInfo, coupleGreeting }: { ceremonyInfo: MainCeremonyCardProps, weddingPartyInfo: WeddingPartyCardProps, coupleGreeting?: string }) => {
  return (
    <>
      <div className="row invitation-row">
        {/* Main Ceremony Card */}
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '3rem' }}>
          <MainCeremonyCard {...ceremonyInfo} coupleGreeting={coupleGreeting} />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <WeddingPartyCard {...weddingPartyInfo} coupleGreeting={coupleGreeting} />
        </div>
      </div>
    </>
  );
}

export const isEmptyString = (str: any) => {
  return str === null || str === undefined || (typeof str === 'string' && str.trim() === '');
}

export const CHANGEABLE_FIELDS = ['party', 'invitationText', 'invitationSecondText', 'guestName', 'thanksText', 'coupleGreeting'];

export interface InvitationProps {
  party: keyof typeof PACKAGES | string;
  invitationText?: string;
  invitationSecondText?: string;
  guestName?: string;
  thanksText?: string;
  coupleGreeting?: string;
}
export default function Invitation({ party = "mainParty", ...props }:InvitationProps ) {
  const selectedPackage = {
    ...PACKAGES[party as keyof typeof PACKAGES],
  };
  CHANGEABLE_FIELDS.forEach((key) => {
    const value = props[key as keyof typeof props] as string | any;
    if (isEmptyString(value)) return;
    // Only assign if the key exists in WeddingPartyCardProps
    if (key === 'coupleGreeting' || key in selectedPackage.weddingPartyInfo) {
      (selectedPackage.weddingPartyInfo as any)[key] = value;
    }
  });

  return <RenderInvitation ceremonyInfo={selectedPackage.ceremonyInfo} weddingPartyInfo={selectedPackage.weddingPartyInfo} coupleGreeting={props.coupleGreeting || 'chúng tôi'} />
};
