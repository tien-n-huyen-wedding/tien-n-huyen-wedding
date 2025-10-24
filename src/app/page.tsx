'use client';

import Banner from '@/components/Banner';
import CoupleSection from '@/components/CoupleSection';
import EventsSection from '@/components/EventsSection';
import StorySection from '@/components/StorySection';
import GallerySection from '@/components/GallerySection';
import InvitationSection from '@/components/InvitationSection';

export default function Home() {
  return (
    <>
      <Banner />
      <CoupleSection />
      <EventsSection />
      <StorySection />
      <GallerySection />

      {/* Invitation Section */}
      <InvitationSection />
    </>
  );
}
