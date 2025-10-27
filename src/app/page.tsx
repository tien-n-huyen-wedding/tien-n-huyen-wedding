'use client';

import Banner from '@/components/main_page_sections/Banner';
import CoupleSection from '@/components/main_page_sections/CoupleSection';
import StorySection from '@/components/main_page_sections/StorySection';
import GallerySection from '@/components/main_page_sections/GallerySection';
import InvitationSection from '@/components/main_page_sections/InvitationSection';
import BankAndMapSection from '@/components/main_page_sections/BankAndMapSection';

export default function Home() {
  return (
    <>
      <Banner />
      <CoupleSection />
      <InvitationSection />
      <StorySection />
      <GallerySection />
      <BankAndMapSection />
    </>
  );
}
