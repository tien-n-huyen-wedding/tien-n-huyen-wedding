'use client';

import Logo from './Logo';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from './invitation/Invitation';

export default function Navigation() {
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

  return (
    <nav className="fh5co-nav" role="navigation">
      <div className="container">
        <div className="row">
          <div className="col-xs-2">
            <Logo invitationProps={props} isLoaded={isLoaded} />
          </div>

        </div>
      </div>
    </nav>
  );
}

