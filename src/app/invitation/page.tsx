import React from 'react';
import InvitationCard from '../../components/InvitationCard';
import MainCeremonyCard from '../../components/MainCeremonyCard';
import WeddingPartyCard from '../../components/WeddingPartyCard';
import { InvitationData } from '../../types/invitation';
import {
  THE_GROOM_FAMILY_INFO,
  THE_BRIDE_FAMILY_INFO,
  MAIN_CEREMONY_INFO,
  MAIN_WEDDING_PARTY_INFO
} from '../../utils/constants';

// Sample invitation data using constants
const sampleInvitationData: InvitationData = {
  groomName: THE_GROOM_FAMILY_INFO.name,
  brideName: THE_BRIDE_FAMILY_INFO.name,
  weddingDate: 'November 30, 2025',
  weddingTime: '4:00 PM',
  venue: MAIN_WEDDING_PARTY_INFO.restaurant,
  venueAddress: MAIN_WEDDING_PARTY_INFO.location,
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
            Choose your perfect invitation design
          </p>
        </div>
      </div>

      {/* New Vietnamese Invitation Cards */}
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: 'var(--sage-green)'
          }}>
            Vietnamese Wedding Invitations
          </h2>
        </div>
      </div>

      <div className="row" style={{ marginBottom: '4rem' }}>
        {/* Main Ceremony Card */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'var(--sage-green)'
          }}>
            Main Ceremony Invitation
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
            ceremonyTime={`${MAIN_CEREMONY_INFO.time}, ${MAIN_CEREMONY_INFO.date_of_week}`}
            ceremonyDateLunar={MAIN_CEREMONY_INFO.luna_date}
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
            Wedding Party Invitation
          </h3>
          <WeddingPartyCard
            partyDate={`NGÀY ${MAIN_WEDDING_PARTY_INFO.at.split('/')[0]} THÁNG ${MAIN_WEDDING_PARTY_INFO.at.split('/')[1]} NĂM ${MAIN_WEDDING_PARTY_INFO.at.split('/')[2].split(' ')[0]}`}
            partyTime={MAIN_WEDDING_PARTY_INFO.time}
            partyDateLunar={`(${MAIN_WEDDING_PARTY_INFO.luna_date})`}
            venue={MAIN_WEDDING_PARTY_INFO.restaurant}
            venueAddress={MAIN_WEDDING_PARTY_INFO.location}
          />
        </div>
      </div>

      {/* Original Invitation Cards */}
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: 'var(--sage-green)'
          }}>
            Traditional Invitation Styles
          </h2>
        </div>
      </div>

      <div className="row">
        {/* Vietnamese Greeting Example */}
        <div className="col-md-6 text-center" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sacramento)',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'var(--sage-green)'
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
            color: 'var(--sage-green)'
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
            color: 'var(--sage-green)'
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
            color: 'var(--sage-green)'
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
