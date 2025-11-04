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

function HomeContent() {

  return (
    <>
      <Banner />
      <CoupleSection />
      <InvitationSection />
      <StorySection />
      <GallerySection />
      <WishesSection />
      <BankAndMapSection />
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
