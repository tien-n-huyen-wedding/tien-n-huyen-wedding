'use client';

import React from 'react';
import InvitationCard from './InvitationCard';
import { InvitationData } from '../types/invitation';

// Example usage of the InvitationCard component
const exampleInvitationData: InvitationData = {
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

export default function InvitationExample() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: '#8B4513'
          }}>
            Our Wedding Invitation
          </h2>
          <p style={{
            fontFamily: 'var(--font-work-sans)',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: '#666'
          }}>
            We&apos;re excited to share our special day with you
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 text-center">
          <InvitationCard
            data={exampleInvitationData}
            size="medium"
            showRSVP={true}
            showDressCode={true}
            className="elegant"
            greeting="Kính gửi"
            guestName="Anh Chị"
            subtitle="Cùng với gia đình, chúng tôi trân trọng kính mời"
          />
        </div>
      </div>

      <div className="row" style={{ marginTop: '3rem' }}>
        <div className="col-md-12 text-center">
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-work-sans)',
              marginBottom: '1rem',
              color: '#333'
            }}>
              How to Use This Component
            </h3>
            <div style={{
              fontFamily: 'var(--font-work-sans)',
              color: '#666',
              textAlign: 'left'
            }}>
              <p><strong>Basic Usage:</strong></p>
              <pre style={{
                backgroundColor: '#f1f1f1',
                padding: '1rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                overflow: 'auto'
              }}>
{`<InvitationCard
  data={invitationData}
  size="medium"
  showRSVP={true}
  showDressCode={true}
  className="elegant"
/>`}
              </pre>

              <p style={{ marginTop: '1rem' }}>
                <strong>Customizable Props:</strong>
              </p>
              <ul style={{ paddingLeft: '2rem' }}>
                <li><strong>data:</strong> Wedding information object</li>
                <li><strong>size:</strong> &apos;small&apos;, &apos;medium&apos;, or &apos;large&apos;</li>
                <li><strong>showRSVP:</strong> Show/hide RSVP information</li>
                <li><strong>showDressCode:</strong> Show/hide dress code</li>
                <li><strong>className:</strong> Theme class (&apos;elegant&apos;, &apos;romantic&apos;, &apos;modern&apos;, &apos;classic&apos;)</li>
                <li><strong>greeting:</strong> Greeting text (e.g., &apos;Dear&apos;, &apos;Kính gửi&apos;, &apos;Kính thưa&apos;)</li>
                <li><strong>guestName:</strong> Guest name (e.g., &apos;Mr. & Mrs. Smith&apos;, &apos;Anh Chị&apos;, &apos;Ông Bà&apos;)</li>
                <li><strong>subtitle:</strong> Subtitle text (e.g., &apos;Together with their families&apos;)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
