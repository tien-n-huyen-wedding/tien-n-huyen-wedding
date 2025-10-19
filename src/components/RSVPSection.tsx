'use client';

import { backgroundImages } from '@/lib/images';
import { getBackgroundImageStyle } from '@/lib/images/utils';

interface RSVPSectionProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  onSubmit?: (data: { name: string; email: string }) => void;
}

export default function RSVPSection({
  title = "Are You Attending?",
  description = "Please Fill-up the form to notify you that you're attending. Thanks.",
  backgroundImage,
  onSubmit
}: RSVPSectionProps) {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : getBackgroundImageStyle(backgroundImages.started);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string
    };

    if (onSubmit) {
      onSubmit(data);
    } else {
      // Default behavior - you can customize this
      console.log('RSVP Data:', data);
      alert('Thank you for your RSVP! We will contact you soon.');
    }
  };

  return (
    <div id="fh5co-started" className="fh5co-bg" style={backgroundStyle}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row animate-box">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="row animate-box">
          <div className="col-md-10 col-md-offset-1">
            <form className="form-inline" onSubmit={handleSubmit}>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <button type="submit" className="btn btn-default btn-block">
                    I am Attending
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
