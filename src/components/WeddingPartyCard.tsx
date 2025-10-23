'use client';

import React from 'react';

interface WeddingPartyCardProps {
  partyDate: string;
  partyTime: string;
  partyDateLunar: string;
  venue: string;
  venueAddress: string;
  className?: string;
}

export default function WeddingPartyCard({
  partyDate,
  partyTime,
  partyDateLunar,
  venue,
  venueAddress,
  className = ''
}: WeddingPartyCardProps) {
  const cardStyle: React.CSSProperties = {
    width: '500px',
    height: '700px',
    backgroundImage: 'url(/images/invitation_card_bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    margin: '0 auto',
    fontFamily: "'Work Sans', sans-serif",
    color: '#2C3E50',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    marginBottom: '30px',
  };

  const saveTheDateStyle: React.CSSProperties = {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '35px',
    fontFamily: "'Work Sans', sans-serif",
    letterSpacing: '3px',
    textAlign: 'left',
  };

  const invitationTextStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: 'var(--text-medium)',
    marginBottom: '15px',
    textAlign: 'right',
    fontWeight: '500',
    fontFamily: "'Work Sans', sans-serif",
  };

  const celebrationTextStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--text-medium)',
    marginBottom: '15px',
    textAlign: 'right',
    lineHeight: '1.4',
    fontFamily: "'Work Sans', sans-serif",
  };

  const attendTextStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--text-medium)',
    marginBottom: '35px',
    textAlign: 'right',
    fontFamily: "'Work Sans', sans-serif",
  };

  const venueSectionStyle: React.CSSProperties = {
    textAlign: 'right',
    marginBottom: '30px',
  };

  const venueNameStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '12px',
    letterSpacing: '2px',
    fontFamily: "'Work Sans', sans-serif",
    textAlign: 'right',
  };

  const venueAddressStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--text-light)',
    marginBottom: '30px',
    lineHeight: '1.3',
    fontFamily: "'Work Sans', sans-serif",
    textAlign: 'right',
  };

  const dateTimeSectionStyle: React.CSSProperties = {
    textAlign: 'right',
    marginBottom: '20px',
  };

  const dateTimeStyle: React.CSSProperties = {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '8px',
    fontFamily: "'Work Sans', sans-serif",
    textAlign: 'right',
  };

  const lunarDateStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: 'var(--text-light)',
    fontStyle: 'italic',
    marginBottom: '25px',
    fontFamily: "'Work Sans', sans-serif",
    textAlign: 'right',
  };

  const honorTextStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--text-medium)',
    textAlign: 'right',
    lineHeight: '1.4',
    fontStyle: 'italic',
    fontFamily: "'Work Sans', sans-serif",
  };

  return (
    <div className={`wedding-party-card ${className}`} style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={saveTheDateStyle}>
          SAVE the DATE
        </div>

        <div style={invitationTextStyle}>
          TRÂN TRỌNG KÍNH MỜI
        </div>

        <div style={celebrationTextStyle}>
          CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI
        </div>

        <div style={attendTextStyle}>
          ĐẾN DỰ BUỔI TIỆC
        </div>
      </div>

      {/* Venue information */}
      <div style={venueSectionStyle}>
        <div style={venueNameStyle}>
          {venue}
        </div>
        <div style={venueAddressStyle}>
          {venueAddress}
        </div>
      </div>

      {/* Date and time */}
      <div style={dateTimeSectionStyle}>
        <div style={dateTimeStyle}>
          VÀO LÚC {partyTime} | {partyDate}
        </div>
        <div style={lunarDateStyle}>
          {partyDateLunar}
        </div>
      </div>

      {/* Honor text */}
      <div style={honorTextStyle}>
        SỰ HIỆN DIỆN CỦA BẠN<br />
        LÀ NIỀM VINH DỰ CHO GIA ĐÌNH CHÚNG TÔI
      </div>
    </div>
  );
}
