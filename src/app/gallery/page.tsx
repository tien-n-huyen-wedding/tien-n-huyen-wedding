import Image from 'next/image';

export default function Gallery() {
  return (
    <>
      <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(/images/img_bg_1.jpg)'}}>
        <div className="overlay"></div>
        <div className="fh5co-container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div className="display-tc animate-box" data-animate-effect="fadeIn">
                  <h1>Gallery</h1>
                  <h2>Free HTML5 templates Made by <a href="http://freehtml5.co" target="_blank" rel="noopener noreferrer">FreeHTML5.co</a></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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
