import Link from 'next/link';

export default function NotFound() {
  return (
    <div id="page">
      <div className="container" style={{ minHeight: '60vh', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="animate-box">
              <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>404</h1>
              <h2 style={{ marginBottom: '20px' }}>Album Not Found</h2>
              <p style={{ fontSize: '18px', marginBottom: '30px', color: '#999' }}>
                Sorry, the album you're looking for doesn't exist.
              </p>
              <Link
                href="/#fh5co-gallery"
                className="btn btn-primary btn-lg"
                style={{
                  display: 'inline-block',
                  padding: '15px 40px',
                  background: '#F14E95',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

