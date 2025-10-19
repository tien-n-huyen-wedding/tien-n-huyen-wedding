import Image from 'next/image';
import Banner from '@/components/Banner';
import { backgroundImages, coupleImages, galleryImages } from '@/lib/images';
import { getBackgroundImageStyle, getOptimizedImageProps } from '@/lib/images/utils';

export default function Home() {
  return (
    <>
      <Banner />
      <div id="fh5co-couple">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <h2>Hello!</h2>
              <h3>30 November 2025 Gia Huy Palace, Đà Nẵng</h3>
              <p>We invited you to celebrate our wedding</p>
            </div>
          </div>
          <div className="couple-wrap animate-box">
            <div className="couple-half">
              <div className="groom">
                <Image {...getOptimizedImageProps(coupleImages.groom, 'left', 'scale(-1, 1)')} className="img-responsive" />
              </div>
              <div className="desc-groom">
                <h3>Quang Tiến</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
              </div>
            </div>
            <p className="heart text-center"><i className="icon-heart2"></i></p>
            <div className="couple-half">
              <div className="bride">
                <Image {...getOptimizedImageProps(coupleImages.bride, 'right', 'scale(-1, 1)')} className="img-responsive" />
              </div>
              <div className="desc-bride">
                <h3>Lệ Huyền</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-event" className="fh5co-bg" style={getBackgroundImageStyle(backgroundImages.event)}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <span>Our Special Events</span>
              <h2>Wedding Events</h2>
            </div>
          </div>
          <div className="row">
            <div className="display-t">
              <div className="display-tc">
                <div className="col-md-10 col-md-offset-1">
                  <div className="col-md-6 col-sm-6 text-center">
                    <div className="event-wrap animate-box">
                      <h3>Main Ceremony</h3>
                      <div className="event-col">
                        <i className="icon-clock"></i>
                        <span>4:00 PM</span>
                        <span>6:00 PM</span>
                      </div>
                      <div className="event-col">
                        <i className="icon-calendar"></i>
                        <span>Monday 28</span>
                        <span>November, 2016</span>
                      </div>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 text-center">
                    <div className="event-wrap animate-box">
                      <h3>Wedding Party</h3>
                      <div className="event-col">
                        <i className="icon-clock"></i>
                        <span>7:00 PM</span>
                        <span>12:00 AM</span>
                      </div>
                      <div className="event-col">
                        <i className="icon-calendar"></i>
                        <span>Monday 28</span>
                        <span>November, 2016</span>
                      </div>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-couple-story">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <span>We Love Each Other</span>
              <h2>Our Story</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-md-offset-0">
              <ul className="timeline animate-box">
                <li className="animate-box">
                  <div className="timeline-badge" style={getBackgroundImageStyle(coupleImages.couple1)}></div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h3 className="timeline-title">First We Meet</h3>
                      <span className="date">December 25, 2015</span>
                    </div>
                    <div className="timeline-body">
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted animate-box">
                  <div className="timeline-badge" style={getBackgroundImageStyle(coupleImages.couple2)}></div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h3 className="timeline-title">First Date</h3>
                      <span className="date">December 28, 2015</span>
                    </div>
                    <div className="timeline-body">
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                  </div>
                </li>
                <li className="animate-box">
                  <div className="timeline-badge" style={getBackgroundImageStyle(coupleImages.couple3)}></div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h3 className="timeline-title">In A Relationship</h3>
                      <span className="date">January 1, 2016</span>
                    </div>
                    <div className="timeline-body">
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-gallery" className="fh5co-section-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <span>Our Memories</span>
              <h2>Wedding Gallery</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
          <div className="row row-bottom-padded-md">
            <div className="col-md-12">
              <ul id="fh5co-gallery-list">
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery1)}>
                  <a href="/images/gallery-1.jpg">
                    <div className="case-studies-summary">
                      <span>14 Photos</span>
                      <h2>Two Glas of Juice</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery2)}>
                  <a href="#" className="color-2">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery3)}>
                  <a href="#" className="color-3">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery4)}>
                  <a href="#" className="color-4">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery5)}>
                  <a href="#" className="color-5">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery6)}>
                  <a href="#" className="color-6">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery7)}>
                  <a href="#" className="color-7">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery8)}>
                  <a href="#" className="color-8">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={getBackgroundImageStyle(galleryImages.gallery9)}>
                  <a href="#" className="color-9">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-started" className="fh5co-bg" style={getBackgroundImageStyle(backgroundImages.started)}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row animate-box">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>Are You Attending?</h2>
              <p>Please Fill-up the form to notify you that you&apos;re attending. Thanks.</p>
            </div>
          </div>
          <div className="row animate-box">
            <div className="col-md-10 col-md-offset-1">
              <form className="form-inline">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <button type="submit" className="btn btn-default btn-block">I am Attending</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
