'use client';

import React from 'react';

interface MainCeremonyCardProps {
  groomName: string;
  brideName: string;
  groomParents: {
    father: string;
    mother: string;
    address: string;
  };
  brideParents: {
    father: string;
    mother: string;
    address: string;
  };
  ceremonyDate: string;
  ceremonyTime: string;
  ceremonyDateLunar: string;
  bridePronouns: string;
  groomPronouns: string;
  className?: string;
}

export default function MainCeremonyCard({
  groomName,
  brideName,
  groomParents,
  brideParents,
  ceremonyDate,
  ceremonyTime,
  ceremonyDateLunar,
  bridePronouns,
  groomPronouns,
  className = ''
}: MainCeremonyCardProps) {
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
    paddingTop: '40%',
  };

  const coupleNameStyle: React.CSSProperties = {
    fontSize: '2.4rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '8px',
    fontFamily: "'Work Sans', sans-serif",
    letterSpacing: '1px',
    lineHeight: '1.2',
  };

  const leafDecorationStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    color: 'var(--sage-green)',
    marginBottom: '25px',
    marginTop: '10px',
  };

  const parentsSectionStyle: React.CSSProperties = {
    marginBottom: '25px',
  };

  const parentLabelStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-medium)',
    marginBottom: '6px',
    textAlign: 'right',
  };

  const parentNameStyle: React.CSSProperties = {
    fontSize: '1.05rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '4px',
    lineHeight: '1.3',
    textAlign: 'right',
  };

  const parentAddressStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: 'var(--text-light)',
    fontStyle: 'italic',
    textAlign: 'right',
    marginBottom: '15px',
  };

  const ceremonySectionStyle: React.CSSProperties = {
    textAlign: 'right',
    marginTop: '20px',
  };

  const ceremonyTitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '12px',
    fontFamily: "'Work Sans', sans-serif",
    lineHeight: '1.3',
    textAlign: 'right',
  };

  const ceremonySubtitleStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    color: 'var(--text-medium)',
    marginBottom: '8px',
    lineHeight: '1.4',
    textAlign: 'right',
  };

  const dateTimeStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '6px',
    lineHeight: '1.3',
    textAlign: 'right',
  };

  const lunarDateStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: 'var(--text-light)',
    fontStyle: 'italic',
    marginTop: '8px',
    textAlign: 'right',
  };

  return (
    <div className={`main-ceremony-card ${className}`} style={cardStyle}>
      {/* Header with couple names */}
      <div style={headerStyle}>
        <div style={coupleNameStyle}>
          {groomName} &
        </div>
        <div style={coupleNameStyle}>
          {brideName}
        </div>

        {/* Leaf decoration */}
        <div style={leafDecorationStyle}>
          🌿 🌿
        </div>
      </div>

      {/* Parents information */}
      <div style={parentsSectionStyle}>
        {/* Bride's parents */}
        <div style={{ marginBottom: '20px' }}>
          <div style={parentLabelStyle}>{bridePronouns}</div>
          <div style={parentNameStyle}>
            {brideParents.mother}
          </div>
          <div style={parentAddressStyle}>
            {brideParents.address}
          </div>
        </div>

        {/* Groom's parents */}
        <div>
          <div style={parentLabelStyle}>{groomPronouns}</div>
          <div style={parentNameStyle}>
            {groomParents.father} & {groomParents.mother}
          </div>
          <div style={parentAddressStyle}>
            {groomParents.address}
          </div>
        </div>
      </div>

      {/* Ceremony details */}
      <div style={ceremonySectionStyle}>
        <div style={ceremonyTitleStyle}>
          LỄ VU QUY CỦA CON CHÚNG TÔI
        </div>
        <div style={ceremonySubtitleStyle}>
          TRÂN TRỌNG BÁO TIN
        </div>
        <div style={ceremonySubtitleStyle}>
          HÔN LỄ SẼ ĐƯỢC CỬ HÀNH TẠI TỪ GIA
        </div>

        <div style={dateTimeStyle}>
          VÀO LÚC {ceremonyTime}
        </div>
        <div style={dateTimeStyle}>
          {ceremonyDate}
        </div>
        <div style={lunarDateStyle}>
          {ceremonyDateLunar}
        </div>
      </div>
    </div>
  );
}
