
import React from 'react';
import WeddingPartyCard from './WeddingPartyCard';
import MainCeremonyCard from './MainCeremonyCard';
import { PACKAGES, MainCeremonyCardProps, WeddingPartyCardProps } from '@/utils/constants';


const RenderInvitation = ({ ceremonyInfo, weddingPartyInfo }: { ceremonyInfo: MainCeremonyCardProps, weddingPartyInfo: WeddingPartyCardProps }) => {
  return (
    <div className="row">
      {/* Main Ceremony Card */}
      <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
        <MainCeremonyCard {...ceremonyInfo} />
      </div>

      <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
        <WeddingPartyCard {...weddingPartyInfo} />
      </div>
    </div>
  );
}

export const isEmptyString = (str: any) => {
  return str === null || str === undefined || (typeof str === 'string' && str.trim() === '');
}

export const CHANGEABLE_FIELDS = ['party', 'invitationText', 'invitationSecondText', 'guestName', 'thanksText'];

export interface InvitationProps {
  party: keyof typeof PACKAGES | string;
  invitationText?: string;
  invitationSecondText?: string;
  guestName?: string;
  thanksText?: string;
}
export default function Invitation({ party = "mainParty", ...props }:InvitationProps ) {
  const selectedPackage = {
    ...PACKAGES[party as keyof typeof PACKAGES],
  };
  CHANGEABLE_FIELDS.forEach((key) => {
    const value = props[key as keyof typeof props] as string | any;
    if (isEmptyString(value)) return;
    selectedPackage.weddingPartyInfo[key as keyof WeddingPartyCardProps] = value;
  });

  return <RenderInvitation ceremonyInfo={selectedPackage.ceremonyInfo} weddingPartyInfo={selectedPackage.weddingPartyInfo} />
};
