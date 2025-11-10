'use client';

import Image from 'next/image';
import Link from 'next/link';
import { InvitationProps } from './invitation/Invitation';
import { buildHomeUrl } from '@/utils/invitation-props';

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  invitationProps?: Partial<InvitationProps>;
  isLoaded?: boolean;
}

export default function Logo({
  src = '/images/main-qr-code.png',
  alt = 'Wedding',
  width = 50,
  height = 50,
  className = '',
  invitationProps = {},
  isLoaded = false
}: LogoProps) {
  const homeUrl = buildHomeUrl(invitationProps);

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

