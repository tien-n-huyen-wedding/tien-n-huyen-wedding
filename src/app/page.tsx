'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Banner from '@/components/main_page_sections/Banner';
import CoupleSection from '@/components/main_page_sections/CoupleSection';
import InvitationSection from '@/components/main_page_sections/InvitationSection';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from '@/components/invitation/Invitation';

// Lazy load sections below the fold for better initial page load
const StorySection = dynamic(() => import('@/components/main_page_sections/StorySection'), {
  ssr: true, // Keep SSR for SEO
});

const GallerySection = dynamic(() => import('@/components/main_page_sections/GallerySection'), {
  ssr: true,
});

const WishesSection = dynamic(() => import('@/components/main_page_sections/WishesSection'), {
  ssr: true,
});

const BankAndMapSection = dynamic(() => import('@/components/main_page_sections/BankAndMapSection'), {
  ssr: true,
});

const ContactSection = dynamic(() => import('@/components/main_page_sections/ContactSection'), {
  ssr: true,
});

function HomeContent() {
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

  return (
    <>
      <Banner />
      <CoupleSection invitationProps={props} isLoaded={isLoaded} />
      <InvitationSection invitationProps={props} isLoaded={isLoaded} />
      <StorySection coupleGreeting={props.coupleGreeting} />
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
