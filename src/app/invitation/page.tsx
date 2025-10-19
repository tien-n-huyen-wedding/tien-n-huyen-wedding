import React from 'react';
import InvitationCard from '../../components/InvitationCard';
import { InvitationData } from '../../types/invitation';

// Sample invitation data
const sampleInvitationData: InvitationData = {
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

export default function InvitationPage() {
  return (
    <div className="container" style={{ padding: '0' }}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '3rem',
            marginBottom: '2rem',
            color: '#8B4513'
          }}>
            Wedding Invitations
          </h1>
          <p style={{
            fontFamily: 'var(--font-work-sans)',
            fontSize: '1.2rem',
            marginBottom: '3rem',
            color: '#666'
          }}>
            Choose your perfect invitation design
          </p>
        </div>
      </div>

      <div className="row">
        {/* Vietnamese Greeting Example */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#8B4513'
          }}>
            Vietnamese Greeting
          </h3>
          <InvitationCard
            data={sampleInvitationData}
            size="medium"
            showRSVP={true}
            showDressCode={true}
            className="elegant"
            greeting="Kính gửi"
            guestName="Anh Chị"
            subtitle="Cùng với gia đình, chúng tôi trân trọng kính mời"
          />
        </div>

        {/* English Greeting Example */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#8B4513'
          }}>
            English Greeting
          </h3>
          <InvitationCard
            data={sampleInvitationData}
            size="medium"
            showRSVP={true}
            showDressCode={true}
            className="elegant"
            greeting="Dear"
            guestName="Mr. & Mrs. Smith"
            subtitle="Together with their families, we invite you to celebrate our special day"
          />
        </div>
      </div>

      <div className="row">
        {/* Formal Vietnamese Greeting Example */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#8B4513'
          }}>
            Formal Vietnamese
          </h3>
          <InvitationCard
            data={sampleInvitationData}
            size="medium"
            showRSVP={true}
            showDressCode={true}
            className="elegant"
            greeting="Kính thưa"
            guestName="Ông Bà"
            subtitle="Cùng với gia đình, chúng tôi trân trọng kính mời"
          />
        </div>

        {/* No Greeting Example */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#8B4513'
          }}>
            No Greeting
          </h3>
          <InvitationCard
            data={sampleInvitationData}
            size="medium"
            showRSVP={true}
            showDressCode={true}
            className="elegant"
            subtitle="Together with their families, we invite you to celebrate our special day"
          />
        </div>
      </div>
    </div>
  );
}
