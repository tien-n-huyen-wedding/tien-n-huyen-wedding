import Image from 'next/image';

export default function Contact() {
  return (
    <>
      <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(/images/img_bg_1.jpg)'}}>
        <div className="overlay"></div>
        <div className="fh5co-container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div className="display-tc animate-box" data-animate-effect="fadeIn">
                  <h1>Contact</h1>
                  <h2>Free HTML5 templates Made by <a href="http://freehtml5.co" target="_blank" rel="noopener noreferrer">FreeHTML5.co</a></h2>
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
              <h3>30 November 2025 Gia Huy Palace, Đà Nẵng</h3>
              <p>We invited you to celebrate our wedding</p>
            </div>
          </div>
          <div className="couple-wrap animate-box">
            <div className="couple-half">
              <div className="groom">
                <Image src="/images/groom.jpg" alt="groom" width={300} height={400} className="img-responsive" />
              </div>
              <div className="desc-groom">
                <h3>Quang Tiến</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
              </div>
            </div>
            <p className="heart text-center"><i className="icon-heart2"></i></p>
            <div className="couple-half">
              <div className="bride">
                <Image src="/images/bride.jpg" alt="bride" width={300} height={400} className="img-responsive" />
              </div>
              <div className="desc-bride">
                <h3>Lệ Huyền</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fh5co-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-push-6 animate-box">
              <h3>Get In Touch</h3>
              <form action="#">
                <div className="row form-group">
                  <div className="col-md-6">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" className="form-control" placeholder="Your firstname" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" className="form-control" placeholder="Your lastname" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="Your email address" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" className="form-control" placeholder="Your subject of this message" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" cols={30} rows={10} className="form-control" placeholder="Write us something"></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <input type="submit" value="Send Message" className="btn btn-primary" />
                </div>
              </form>
            </div>
            <div className="col-md-5 col-md-pull-5 animate-box">
              <div className="fh5co-contact-info">
                <h3>Contact Information</h3>
                <ul>
                  <li className="address">198 West 21th Street, <br /> Suite 721 New York NY 10016</li>
                  <li className="phone"><a href="tel://1234567920">+ 1235 2355 98</a></li>
                  <li className="email"><a href="mailto:info@yoursite.com">info@yoursite.com</a></li>
                  <li className="url"><a href="http://gettemplates.co">gettemplates.co</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="map" className="fh5co-map"></div>
    </>
  );
}
