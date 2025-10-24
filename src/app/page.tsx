'use client';

import Banner from '@/components/main_page_sections/Banner';
import CoupleSection from '@/components/main_page_sections/CoupleSection';
import EventsSection from '@/components/main_page_sections/EventsSection';
import StorySection from '@/components/main_page_sections/StorySection';
import GallerySection from '@/components/main_page_sections/GallerySection';
import InvitationSection from '@/components/main_page_sections/InvitationSection';

export default function Home() {
  return (
    <>
      <Banner />
      <CoupleSection />
      <InvitationSection />
      <EventsSection />
      <StorySection />
      <GallerySection />
    </>
  );
}
