'use client';

import { MAIN_WEDDING_PARTY_INFO } from '@/utils/constants';
import React from 'react';

interface WeddingPartyCardProps {
  className?: string;
  invitationText?: string;
  guestName?: string;
  restaurantName?: string;
  restaurantAddress?: string;
  city?: string;
  mapUrl?: string;
  time?: string;
  lunaDateStr?: string;
  thanksText?: string;
  openAt?: string;
  partyAt?: string;
}

export default function WeddingPartyCard({
  className = '',
  invitationText = "Trân trọng kính mời:",
  guestName = "Người Bạn Thân",
  restaurantName = MAIN_WEDDING_PARTY_INFO.restaurant,
  restaurantAddress = MAIN_WEDDING_PARTY_INFO.location,
  city = MAIN_WEDDING_PARTY_INFO.city,
  mapUrl = MAIN_WEDDING_PARTY_INFO.google_map_url,
  time = MAIN_WEDDING_PARTY_INFO.atStr,
  lunaDateStr = MAIN_WEDDING_PARTY_INFO.lunaDateStr,
  thanksText = "Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.",
  openAt = MAIN_WEDDING_PARTY_INFO.openAt,
  partyAt = MAIN_WEDDING_PARTY_INFO.partyAt,
}: WeddingPartyCardProps) {
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
  };

  const guestNameStyle: React.CSSProperties = {
    fontFamily: "'UTM Amherst', serif",
    fontSize: '2.0rem',
    fontWeight: '100',
    color: 'var(--text-dark)',
    marginBottom: '10px',
  };

  const restaurantNameStyle: React.CSSProperties = {
    fontSize: '2.0rem',
    fontWeight: '500',
    color: 'var(--text-dark)',
  };

  const dateTimeStyle: React.CSSProperties = {
    fontWeight: 900,
    color: 'var(--text-dark)',
  };

  const lunarDateStyle: React.CSSProperties = {
    fontStyle: 'italic',
    marginBottom: '1%',
  };

  const openAtStyle: React.CSSProperties = {
    marginBottom: '1%',
    marginTop: '1%',
  };

  return (
    <div className={`wedding-party-card ${className}`} style={cardStyle}>
      {/* Header */}
      <div style={invitationTextStyle}>
        <div>
          {invitationText}
        </div>
        <div style={guestNameStyle}>
          {guestName.toUpperCase()}
        </div>
        <div>
          Đến dự buổi tiệc
        </div>
        <div>
          Chung vui cùng gia đình chúng tôi tại
        </div>
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
          VÀO LÚC {time.toUpperCase()}
        </div>
        <div style={lunarDateStyle}>
          (Nhằm {lunaDateStr.toUpperCase()})
        </div>
        {thanksText.split('\n').map((element, index) => (
          <div key={index}>
            {element.toUpperCase().trim()}
          </div>
        ))}
        <div style={openAtStyle}>
          ĐÓN KHÁCH: {openAt.toUpperCase()} | KHAI TIỆC: {partyAt.toUpperCase()}
        </div>
        <div>
          Rất hân hạnh được đón tiếp
        </div>
      </div>
    </div>
  );
}
