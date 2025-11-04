'use client';

import Logo from './Logo';

export default function Navigation() {
  return (
    <nav className="fh5co-nav" role="navigation">
      <div className="container">
        <div className="row">
          <div className="col-xs-2">
            <Logo />
          </div>

        </div>
      </div>
    </nav>
  );
}

