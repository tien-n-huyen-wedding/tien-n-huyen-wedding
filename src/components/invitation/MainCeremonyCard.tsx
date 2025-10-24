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
    backgroundImage: 'url(/images/invitation_card_info_bg.png)',
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
    paddingTop: '40%',
    paddingRight: '20%',
  };

  const coupleNameStyle: React.CSSProperties = {
    textAlign: 'right',
    fontSize: '2.4rem',
    fontWeight: '100',
    color: 'var(--text-dark)',
    marginBottom: '8px',
    fontFamily: "'UTM Amherst', serif",
    letterSpacing: '1px',
    lineHeight: '1.2',
  };

  const leafDecorationStyle: React.CSSProperties = {
    textAlign: 'left',
    fontSize: '1.2rem',
    marginTop: '10px',
    fontFamily: "'UTM Amherst', serif",
    paddingLeft: '13%',
  };

  const parentsSectionStyle: React.CSSProperties = {
    fontFamily: "'UTM Avo', sans-serif",
    fontWeight: '100',
  };

  const parentLabelStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    color: 'var(--text-medium)',
    marginBottom: '6px',
    textAlign: 'right',
  };

  const parentNameStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: 'var(--text-dark)',
    marginBottom: '4px',
    lineHeight: '1.3',
    textAlign: 'right',
  };

  const parentAddressStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--text-light)',
    fontStyle: 'italic',
    textAlign: 'right',
    marginBottom: '15px',
  };

  const ceremonySectionStyle: React.CSSProperties = {
    textAlign: 'right',
    fontFamily: "'UTM Avo', sans-serif",
  };

  const ceremonySubtitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: 'var(--text-medium)',
    marginBottom: '8px',
    lineHeight: '1.4',
    textAlign: 'right',
  };

  const ceremonyBoldStyle: React.CSSProperties = {
    fontWeight: 900,
    color: 'var(--text-dark)',
    fontFamily: "'UTM Avo', sans-serif",
  };

  const dateTimeStyle: React.CSSProperties = {
    fontSize: '1..5rem',
    color: 'var(--text-medium)',
    marginBottom: '6px',
    lineHeight: '1.3',
    textAlign: 'right',
  };

  const lunarDateStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    color: 'var(--text-medium)',
    fontStyle: 'italic',
    marginTop: '8px',
    textAlign: 'right',
  };

  return (
    <div className={`main-ceremony-card ${className}`} style={cardStyle}>
      {/* Header with couple names */}
      <div style={headerStyle}>
        <div style={coupleNameStyle}>
          {groomName.toUpperCase()}
        </div>
        <div style={coupleNameStyle}>
          &
        </div>
        <div style={coupleNameStyle}>
          {brideName.toUpperCase()}
        </div>

        {/* Leaf decoration */}
        <div style={leafDecorationStyle}>
          Út Nam & Quý Nữ
        </div>
      </div>

      {/* Parents information */}
      <div style={parentsSectionStyle}>
        {/* Groom's parents */}
        <div>
          <div style={parentLabelStyle}>{groomPronouns}</div>
          <div style={parentNameStyle}>
            {groomParents.father.toUpperCase()} & {groomParents.mother.toUpperCase()}
          </div>
          <div style={parentAddressStyle}>
            {groomParents.address}
          </div>
        </div>

        {/* Bride's parents */}
        <div style={{ marginBottom: '20px' }}>
          <div style={parentLabelStyle}>{bridePronouns}</div>
          <div style={parentNameStyle}>
            {brideParents.mother.toUpperCase()}
          </div>
          <div style={parentAddressStyle}>
            {brideParents.address}
          </div>
        </div>
      </div>

      {/* Ceremony details */}
      <div style={ceremonySectionStyle}>
        <div style={ceremonySubtitleStyle}>
          TRÂN TRỌNG BÁO TIN
        </div>
        <div style={ceremonySubtitleStyle}>
          <span style={ceremonyBoldStyle}>LỄ THÀNH HÔN</span> CỦA CON CHÚNG TÔI
        </div>
        <div style={ceremonySubtitleStyle}>
          HÔN LỄ ĐƯỢC CỬ HÀNH TẠI TƯ GIA NAM
        </div>

        <div style={dateTimeStyle}>
          VÀO LÚC {ceremonyTime}
        </div>
        <div style={dateTimeStyle}>
          <span style={ceremonyBoldStyle}>{ceremonyDate}</span>
        </div>
        <div style={lunarDateStyle}>
          NHẰM NGÀY {ceremonyDateLunar}
        </div>
      </div>
    </div>
  );
}
