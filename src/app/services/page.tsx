import Image from 'next/image';

export default function Services() {
  return (
    <>
      <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(/images/img_bg_1.jpg)'}}>
        <div className="overlay"></div>
        <div className="fh5co-container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div className="display-tc animate-box" data-animate-effect="fadeIn">
                  <h1>Services</h1>
                  <h2>Free html5 templates Made by <a href="http://freehtml5.co" target="_blank" rel="noopener noreferrer">FreeHTML5.co</a></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="fh5co-couple" className="fh5co-section-gray">
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

      <div id="fh5co-services" className="fh5co-section-gray">
        <div className="container">
          <div className="row animate-box">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>We Offer Services</h2>
              <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="feature-left animate-box" data-animate-effect="fadeInLeft">
                <span className="icon">
                  <i className="icon-calendar"></i>
                </span>
                <div className="feature-copy">
                  <h3>We Organized Events</h3>
                  <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.</p>
                </div>
              </div>

              <div className="feature-left animate-box" data-animate-effect="fadeInLeft">
                <span className="icon">
                  <i className="icon-image"></i>
                </span>
                <div className="feature-copy">
                  <h3>Photoshoot</h3>
                  <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.</p>
                </div>
              </div>

              <div className="feature-left animate-box" data-animate-effect="fadeInLeft">
                <span className="icon">
                  <i className="icon-video"></i>
                </span>
                <div className="feature-copy">
                  <h3>Video Editing</h3>
                  <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 animate-box">
              <div className="fh5co-video fh5co-bg" style={{backgroundImage: 'url(/images/img_bg_3.jpg)'}}>
                <a href="https://vimeo.com/channels/staffpicks/93951774" className="popup-vimeo"><i className="icon-video2"></i></a>
                <div className="overlay"></div>
              </div>
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
