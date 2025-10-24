import React from 'react';
import MainCeremonyCard from '../../components/invitation/MainCeremonyCard';
import WeddingPartyCard from '../../components/invitation/WeddingPartyCard';
import {
  THE_GROOM_FAMILY_INFO,
  THE_BRIDE_FAMILY_INFO,
  MAIN_CEREMONY_INFO,
  MAIN_WEDDING_PARTY_INFO
} from '../../utils/constants';

export default function InvitationPage() {
  return (
    <div className="container" style={{ padding: '0' }}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '3rem',
            marginBottom: '2rem',
            color: 'var(--sage-green)'
          }}>
            Wedding Invitations
          </h1>
          <p style={{
            fontFamily: 'var(--font-work-sans)',
            fontSize: '1.2rem',
            marginBottom: '3rem',
            color: 'var(--text-medium)'
          }}>
            Thiệp mời đám cưới
          </p>
        </div>
      </div>

      {/* Vietnamese Invitation Cards */}
      <div className="row" style={{ marginBottom: '4rem' }}>
        {/* Main Ceremony Card */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'var(--sage-green)'
          }}>
            Lễ Thành Hôn
          </h3>
          <MainCeremonyCard
            groomPronouns={THE_GROOM_FAMILY_INFO.pronouns}
            bridePronouns={THE_BRIDE_FAMILY_INFO.pronouns}
            groomName={THE_GROOM_FAMILY_INFO.full_name}
            brideName={THE_BRIDE_FAMILY_INFO.full_name}
            groomParents={{
              father: THE_GROOM_FAMILY_INFO.father,
              mother: THE_GROOM_FAMILY_INFO.mother,
              address: THE_GROOM_FAMILY_INFO.address
            }}
            brideParents={{
              father: "N/A",
              mother: THE_BRIDE_FAMILY_INFO.mother,
              address: THE_BRIDE_FAMILY_INFO.address
            }}
            ceremonyDate={`NGÀY ${MAIN_CEREMONY_INFO.at.split('/')[0]} THÁNG ${MAIN_CEREMONY_INFO.at.split('/')[1]} NĂM ${MAIN_CEREMONY_INFO.at.split('/')[2].split(' ')[0]}`}
            ceremonyTime={`${MAIN_CEREMONY_INFO.time} - ${MAIN_CEREMONY_INFO.dateOfWeek.toUpperCase()}`}
            ceremonyDateLunar={MAIN_CEREMONY_INFO.lunaDate}
          />
        </div>

        {/* Wedding Party Card */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'var(--sage-green)'
          }}>
            Tiệc Cưới
          </h3>
          <WeddingPartyCard />
        </div>
      </div>
    </div>
  );
}
