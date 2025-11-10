'use client';

import { Suspense } from 'react';
import Banner from '@/components/main_page_sections/Banner';
import CoupleSection from '@/components/main_page_sections/CoupleSection';
import StorySection from '@/components/main_page_sections/StorySection';
import GallerySection from '@/components/main_page_sections/GallerySection';
import InvitationSection from '@/components/main_page_sections/InvitationSection';
import BankAndMapSection from '@/components/main_page_sections/BankAndMapSection';
import ContactSection from '@/components/main_page_sections/ContactSection';
import WishesSection from '@/components/main_page_sections/WishesSection';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from '@/components/invitation/Invitation';

function HomeContent() {
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

  return (
    <>
      <Banner />
      <CoupleSection invitationProps={props} isLoaded={isLoaded} />
      <InvitationSection invitationProps={props} isLoaded={isLoaded} />
      <StorySection />
      <GallerySection invitationProps={props} isLoaded={isLoaded} />
      <WishesSection invitationProps={props} isLoaded={isLoaded} />
      <BankAndMapSection invitationProps={props} isLoaded={isLoaded} />
      <ContactSection />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
