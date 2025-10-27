import Image from 'next/image';
import { QR_IMAGES, MAIN_WEDDING_PARTY_INFO } from '@/utils/constants';

interface BankAndMapSectionProps {
  title?: string;
  groomBankLabel?: string;
  brideBankLabel?: string;
  restaurantMapLabel?: string;
}

export default function BankAndMapSection({
  title = "Bank Information & Restaurant Location",
  groomBankLabel = "Groom's Bank Account",
  brideBankLabel = "Bride's Bank Account",
  restaurantMapLabel = "Restaurant Map"
}: BankAndMapSectionProps) {
  return (
    <div id="fh5co-bank-map" className="fh5co-section-gray">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>Support & Directions</span>
            <h2>{title}</h2>
            <p>If you would like to support us or need directions to the venue</p>
          </div>
        </div>
        <div className="row">
          {/* Groom's Bank */}
          <div className="col-md-4 col-sm-6 text-center animate-box">
            <div className="bank-card">
              <div className="bank-card-image">
                <Image
                  src={QR_IMAGES.groomBank}
                  alt={groomBankLabel}
                  width={400}
                  height={500}
                  className="qr-image"
                  priority={false}
                />
              </div>
              <h3>{groomBankLabel}</h3>
            </div>
          </div>

          {/* Bride's Bank */}
          <div className="col-md-4 col-sm-6 text-center animate-box">
            <div className="bank-card">
              <div className="bank-card-image">
                <Image
                  src={QR_IMAGES.brideBank}
                  alt={brideBankLabel}
                  width={400}
                  height={500}
                  className="qr-image"
                  priority={false}
                />
              </div>
              <h3>{brideBankLabel}</h3>
            </div>
          </div>

          {/* Restaurant Map */}
          <div className="col-md-4 col-sm-12 text-center animate-box">
            <div
              className="bank-card clickable-card"
              onClick={() => window.open(MAIN_WEDDING_PARTY_INFO.google_map_url, '_blank')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open(MAIN_WEDDING_PARTY_INFO.google_map_url, '_blank');
                }
              }}
            >
              <div className="bank-card-image">
                <Image
                  src={QR_IMAGES.restaurantMap}
                  alt={restaurantMapLabel}
                  width={400}
                  height={500}
                  className="qr-image"
                  priority={false}
                />
              </div>
              <h3>
                <span className="map-link">
                  {restaurantMapLabel}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fh5co-section-gray {
          background: #f8f8f8;
          padding: 7em 0;
        }

        .bank-card {
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .bank-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .clickable-card {
          cursor: pointer;
        }

        .clickable-card:focus {
          outline: 2px solid #2E8B57;
          outline-offset: 2px;
        }

        .bank-card-image {
          margin-bottom: 20px;
          border-radius: 8px;
          overflow: hidden;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .bank-card-image :global(.qr-image) {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }

        .bank-card-image :global(img) {
          border-radius: 8px;
        }

        .bank-card h3 {
          font-family: 'Sacramento', cursive;
          font-size: 28px;
          margin-bottom: 15px;
          color: #2E8B57;
        }

        .bank-card h3 :global(.map-link) {
          color: #2E8B57;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .clickable-card:hover h3 :global(.map-link) {
          color: #236B43;
          text-decoration: underline;
        }

        .bank-card p {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .fh5co-section-gray {
            padding: 4em 0;
          }

          .bank-card {
            padding: 20px;
          }

          .bank-card-image {
            height: 350px;
          }

          .bank-card h3 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

