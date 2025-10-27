'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Banner from '@/components/main_page_sections/Banner';
import CoupleSection from '@/components/main_page_sections/CoupleSection';
import StorySection from '@/components/main_page_sections/StorySection';
import GallerySection from '@/components/main_page_sections/GallerySection';
import InvitationSection from '@/components/main_page_sections/InvitationSection';
import BankAndMapSection from '@/components/main_page_sections/BankAndMapSection';
import ContactSection from '@/components/main_page_sections/ContactSection';
import WishesSection from '@/components/main_page_sections/WishesSection';
import { PACKAGES } from '@/utils/constants';

function HomeContent() {
  const searchParams = useSearchParams();
  const [invitationProps, setInvitationProps] = useState({
    package: 'mainParty',
    guestName: 'Bạn Mến Yêu',
    invitationText: 'Trân trọng kính mời:',
    invitationSecondText: 'Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại',
    thanksText: 'Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.'
  });

  useEffect(() => {
    // Get URL parameters
    const packageParam = searchParams.get('package') || 'mainParty';
    const guestName = searchParams.get('guestName') || 'Bạn Mến Yêu';
    const invitationText = searchParams.get('invitationText') || 'Trân trọng kính mời:';
    const invitationSecondText = searchParams.get('invitationSecondText') || 'Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại';
    const thanksText = searchParams.get('thanksText') || 'Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.';

    // Validate package exists
    const validPackage = PACKAGES[packageParam] ? packageParam : 'mainParty';

    setInvitationProps({
      package: validPackage,
      guestName,
      invitationText,
      invitationSecondText,
      thanksText
    });

    // Store in localStorage for InvitationSection to use
    localStorage.setItem('invitation_props', JSON.stringify({
      package: validPackage,
      guestName,
      invitationText,
      invitationSecondText,
      thanksText
    }));
  }, [searchParams]);

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
