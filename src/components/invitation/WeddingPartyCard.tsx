'use client';

import React from 'react';
import { WeddingPartyCardProps } from '@/utils/constants';

export default function WeddingPartyCard({
  className = '',
  invitationText,
  guestName,
  invitationSecondText,
  restaurantName,
  restaurantAddress,
  city,
  mapUrl,
  time,
  lunaDate,
  thanksText,
  openAt,
  partyAt,
  coupleGreeting,
}: WeddingPartyCardProps) {
  // Default values for comparison
  const defaultValues = {
    guestName: 'Bạn Mến Yêu',
    thanksText: 'Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.',
    invitationSecondText: 'Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại',
    coupleGreeting: 'chúng tôi'
  };

  // Apply guest name and couple greeting replacement logic
  let processedThanksText = thanksText;

  // Replace 'quý khách' with guestName if conditions are met
  if (
    thanksText === defaultValues.thanksText
  ) {
    if (guestName && guestName !== defaultValues.guestName) {
      processedThanksText = processedThanksText.replace('quý khách', guestName);
    }

    // Replace 'chúng tôi' with coupleGreeting if provided
    if (coupleGreeting && coupleGreeting !== defaultValues.coupleGreeting) {
      processedThanksText = processedThanksText.replace(/chúng tôi/g, coupleGreeting);
    }
  }
  let processedInvitationSecondText = invitationSecondText;
  if (invitationSecondText === defaultValues.invitationSecondText) {
    if (coupleGreeting && coupleGreeting !== defaultValues.coupleGreeting) {
      processedInvitationSecondText = processedInvitationSecondText.replace(/chúng tôi/g, coupleGreeting);
    }
  }

  const cardStyle: React.CSSProperties = {
    width: '500px',
    height: '700px',
    backgroundImage: 'url(/images/save_the_date.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    margin: '0 auto',
    fontFamily: "'UTM Avo', sans-serif",
    color: '#2C3E50',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: '1.5rem',
    textAlign: 'right',
    paddingTop: '40%',
  };

  const invitationTextStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    marginBottom: '3%',
  };

  const guestNameStyle: React.CSSProperties = {
    fontFamily: "'UTM Amherst', serif",
    fontSize: '2.0rem',
    fontWeight: '100',
    color: 'var(--text-dark)',
    marginBottom: '10px',
  };

  const restaurantNameStyle: React.CSSProperties = {
    marginTop: '3%',
    fontSize: '2.0rem',
    fontWeight: '500',
    color: 'var(--text-dark)',
  };

  const dateTimeStyle: React.CSSProperties = {
    marginTop: '3%',
    fontWeight: 900,
    color: 'var(--text-dark)',
  };

  const lunarDateStyle: React.CSSProperties = {
    fontStyle: 'italic',
    marginBottom: '3%',
  };

  const openAtStyle: React.CSSProperties = {
    marginBottom: '3%',
    marginTop: '3%',
  };
  const marginBottomStyle: React.CSSProperties = {
    marginBottom: '3%',
  };

  const lastTextStyle: React.CSSProperties = {
    fontStyle: 'italic',
  };

  debugger;
  return (
    <>
      <div className={`wedding-party-card ${className}`} style={cardStyle}>
      {/* Header */}
      <div>
        <div style={invitationTextStyle}>
          {invitationText}
        </div>
        <div style={guestNameStyle}>
          {guestName.toUpperCase()}
        </div>
        {processedInvitationSecondText.split('\n').map((element, index) => (
          <div key={index}>
            {element.trim()}
          </div>
        ))}
        <div style={restaurantNameStyle}>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            {restaurantName.toUpperCase()}
          </a>
        </div>
        <div>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            {restaurantAddress}
          </a>
        </div>
        <div>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            {city}
          </a>
        </div>
        <div style={dateTimeStyle}>
          VÀO LÚC {openAt.toUpperCase()} | {time.toUpperCase()}
        </div>
        <div style={lunarDateStyle}>
          (Nhằm {lunaDate.toUpperCase()})
        </div>
        {processedThanksText.split('\n').map((element, index) => (
          <div key={index}>
            {element.toUpperCase().trim()}
          </div>
        ))}
        <div style={openAtStyle}>
          ĐÓN KHÁCH: {openAt.toUpperCase()} | KHAI TIỆC: {partyAt.toUpperCase()}
        </div>
        <div style={lastTextStyle}>
          Rất hân hạnh được đón tiếp!
        </div>
      </div>
      </div>
    </>
  );
}
