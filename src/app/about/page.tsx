import Image from 'next/image';

export default function About() {
  return (
    <>
      <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(/images/img_bg_1.jpg)'}}>
        <div className="overlay"></div>
        <div className="fh5co-container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="display-t">
                <div className="display-tc animate-box" data-animate-effect="fadeIn">
                  <h1>Couple Story</h1>
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
                <li className="timeline-inverted animate-box">
                  <div className="timeline-badge" style={{backgroundImage: 'url(/images/couple-1.jpg)'}}></div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h3 className="timeline-title">We Are Engaged</h3>
                      <span className="date">May 28, 2016</span>
                    </div>
                    <div className="timeline-body">
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                  </div>
                </li>
                <li className="animate-box">
                  <div className="timeline-badge" style={{backgroundImage: 'url(/images/couple-2.jpg)'}}></div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h3 className="timeline-title">We Are Getting Married</h3>
                      <span className="date">November 28, 2016</span>
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
    </>
  );
}
