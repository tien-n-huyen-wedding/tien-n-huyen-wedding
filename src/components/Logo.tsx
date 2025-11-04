'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from './invitation/Invitation';
import { buildHomeUrl } from '@/utils/invitation-props';

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  src = '/images/main-qr-code.png',
  alt = 'Wedding',
  width = 50,
  height = 50,
  className = ''
}: LogoProps) {
  const { props } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);
  const homeUrl = buildHomeUrl(props);

  return (
    <div id="fh5co-logo" className={className}>
      <Link href={homeUrl}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          style={{ cursor: 'pointer' }}
        />
      </Link>
    </div>
  );
}

