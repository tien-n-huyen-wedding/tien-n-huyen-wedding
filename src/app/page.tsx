import Image from 'next/image';

export default function Home() {
  return (
    <>
      <header id="fh5co-header" className="fh5co-cover" role="banner" style={{backgroundImage: 'url(/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div className="display-tc animate-box" data-animate-effect="fadeIn">
                  <h1>Joefrey & Sheila</h1>
                  <h2>We Are Getting Married</h2>
                  <div className="simply-countdown simply-countdown-one"></div>
                  <p><a href="#" className="btn btn-default btn-sm">Save the date</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="fh5co-couple">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <h2>Hello!</h2>
              <h3>November 28th, 2016 New York, USA</h3>
              <p>We invited you to celebrate our wedding</p>
            </div>
          </div>
          <div className="couple-wrap animate-box">
            <div className="couple-half">
              <div className="groom">
                <Image src="/images/groom.jpg" alt="groom" width={300} height={400} className="img-responsive" />
              </div>
              <div className="desc-groom">
                <h3>Joefrey Mahusay</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
              </div>
            </div>
            <p className="heart text-center"><i className="icon-heart2"></i></p>
            <div className="couple-half">
              <div className="bride">
                <Image src="/images/bride.jpg" alt="bride" width={300} height={400} className="img-responsive" />
              </div>
              <div className="desc-bride">
                <h3>Sheila Mahusay</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-event" className="fh5co-bg" style={{backgroundImage: 'url(/images/img_bg_3.jpg)'}}>
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
                  <div className="timeline-badge" style={{backgroundImage: 'url(/images/couple-1.jpg)'}}></div>
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
                  <div className="timeline-badge" style={{backgroundImage: 'url(/images/couple-2.jpg)'}}></div>
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
                  <div className="timeline-badge" style={{backgroundImage: 'url(/images/couple-3.jpg)'}}></div>
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
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-1.jpg)'}}>
                  <a href="/images/gallery-1.jpg">
                    <div className="case-studies-summary">
                      <span>14 Photos</span>
                      <h2>Two Glas of Juice</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-2.jpg)'}}>
                  <a href="#" className="color-2">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-3.jpg)'}}>
                  <a href="#" className="color-3">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-4.jpg)'}}>
                  <a href="#" className="color-4">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-5.jpg)'}}>
                  <a href="#" className="color-5">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-6.jpg)'}}>
                  <a href="#" className="color-6">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-7.jpg)'}}>
                  <a href="#" className="color-7">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-8.jpg)'}}>
                  <a href="#" className="color-8">
                    <div className="case-studies-summary">
                      <span>30 Photos</span>
                      <h2>Timer starts now!</h2>
                    </div>
                  </a>
                </li>
                <li className="one-third animate-box" data-animate-effect="fadeIn" style={{backgroundImage: 'url(/images/gallery-9.jpg)'}}>
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

      <div id="fh5co-started" className="fh5co-bg" style={{backgroundImage: 'url(/images/img_bg_4.jpg)'}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row animate-box">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>Are You Attending?</h2>
              <p>Please Fill-up the form to notify you that you're attending. Thanks.</p>
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
