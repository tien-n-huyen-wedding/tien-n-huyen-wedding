import { THE_GROOM_FAMILY_INFO } from '@/utils/constants';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  phoneLabel?: string;
  emailLabel?: string;
}

export default function ContactSection({
  title = "Contact Us",
  subtitle = "Have questions? Feel free to reach out!",
  phoneLabel = "Phone",
  emailLabel = "Email"
}: ContactSectionProps) {
  return (
    <div id="fh5co-contact" className="fh5co-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>Get In Touch</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="contact-info-wrapper">
              {/* Phone Contact */}
              <div className="contact-item animate-box">
                <a
                  href={`tel:${THE_GROOM_FAMILY_INFO.phone}`}
                  className="contact-link"
                  aria-label={`Call ${THE_GROOM_FAMILY_INFO.contact_name}`}
                >
                  <div className="contact-icon">
                    <i className="icon-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h3>{phoneLabel}</h3>
                    <p className="contact-value">{THE_GROOM_FAMILY_INFO.phone}</p>
                    <p className="contact-name">{THE_GROOM_FAMILY_INFO.contact_name}</p>
                  </div>
                </a>
              </div>

              {/* Email Contact */}
              <div className="contact-item animate-box">
                <a
                  href={`mailto:${THE_GROOM_FAMILY_INFO.email}`}
                  className="contact-link"
                  aria-label={`Email ${THE_GROOM_FAMILY_INFO.contact_name}`}
                >
                  <div className="contact-icon">
                    <i className="icon-mail"></i>
                  </div>
                  <div className="contact-details">
                    <h3>{emailLabel}</h3>
                    <p className="contact-value">{THE_GROOM_FAMILY_INFO.email}</p>
                    <p className="contact-name">{THE_GROOM_FAMILY_INFO.contact_name}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fh5co-section {
          padding: 7em 0;
          background: #fff;
        }

        .contact-info-wrapper {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        .contact-item {
          flex: 1;
          min-width: 280px;
          max-width: 400px;
        }

        .contact-link {
          display: flex;
          align-items: center;
          padding: 40px 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          text-decoration: none;
          gap: 25px;
        }

        .contact-link:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
          text-decoration: none;
        }

        .contact-icon {
          flex-shrink: 0;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2E8B57 0%, #3CB371 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .contact-link:hover .contact-icon {
          transform: scale(1.1);
        }

        .contact-icon i {
          font-size: 32px;
          color: white;
        }

        .contact-details {
          flex: 1;
          text-align: left;
        }

        .contact-details h3 {
          font-family: 'Sacramento', cursive;
          font-size: 26px;
          margin: 0 0 10px 0;
          color: #2E8B57;
        }

        .contact-value {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 5px 0;
          word-break: break-word;
        }

        .contact-name {
          font-size: 14px;
          color: #999;
          margin: 5px 0 0 0;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .fh5co-section {
            padding: 4em 0;
          }

          .contact-info-wrapper {
            flex-direction: column;
            gap: 20px;
          }

          .contact-item {
            min-width: 100%;
            max-width: 100%;
          }

          .contact-link {
            padding: 30px 20px;
            gap: 20px;
          }

          .contact-icon {
            width: 60px;
            height: 60px;
          }

          .contact-icon i {
            font-size: 28px;
          }

          .contact-details h3 {
            font-size: 22px;
          }

          .contact-value {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .contact-link {
            flex-direction: column;
            text-align: center;
            padding: 25px 15px;
          }

          .contact-details {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

