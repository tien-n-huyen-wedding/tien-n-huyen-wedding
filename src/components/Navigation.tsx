'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from './invitation/Invitation';

export default function Navigation() {
  const { props } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

  return (
    <nav className="fh5co-nav" role="navigation">
      <div className="container">
        <div className="row">
          <div className="col-xs-2">
            <Logo invitationProps={props} />
          </div>

        </div>
      </div>
    </nav>
  );
}

