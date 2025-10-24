import React from 'react';
import InvitationCard from './InvitationCard';
import { InvitationData } from '@/types/invitation';

interface InvitationSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  invitationData?: InvitationData;
  showExamples?: boolean;
}

const defaultInvitationData: InvitationData = {
  groomName: 'Quang Tiến',
  brideName: 'Lệ Huyền',
  weddingDate: 'November 30, 2025',
  weddingTime: '4:00 PM',
  venue: 'Gia Huy Palace',
  venueAddress: '123 Wedding Street, Đà Nẵng, Vietnam',
  message: 'Together with their families, we invite you to celebrate our special day',
  rsvpInfo: 'Please RSVP by November 15, 2025',
  dressCode: 'Semi-formal attire',
  theme: 'elegant',
  colorScheme: {
    primary: '#8B4513',
    secondary: '#A0522D',
    accent: '#CD853F'
  }
};

export default function InvitationSection({
  invitationData = defaultInvitationData,
}: InvitationSectionProps) {
  return (
    <div id="fh5co-invitation" className="fh5co-section-gray">
      <div className="container">
        {/* <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>{subtitle}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-5 text-center" style={{ marginBottom: '3rem' }}>
            <InvitationCard
              data={invitationData}
              size="large"
              showRSVP={true}
              showDressCode={true}
              className="elegant"
              greeting="Kính gửi"
              guestName="Anh Chị"
              subtitle="Cùng với gia đình, chúng tôi trân trọng kính mời"
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5 text-center" style={{ marginBottom: '3rem' }}>
            <InvitationCard
              data={invitationData}
              size="large"
              showRSVP={true}
              showDressCode={true}
              className="elegant"
              greeting="Kính gửi"
              guestName="Anh Chị"
              subtitle="Cùng với gia đình, chúng tôi trân trọng kính mời"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
