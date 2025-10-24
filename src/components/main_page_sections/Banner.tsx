import { getBackgroundImageStyle } from "@/lib/images/utils";
import Countdown from "../Countdown";
import { backgroundImages } from "@/lib/images";

export default function Banner() {
  return (
    <header id="fh5co-header" className="fh5co-cover" role="banner" style={getBackgroundImageStyle(backgroundImages.hero)} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="display-t">
              <div className="display-tc animate-box" data-animate-effect="fadeIn">
                <h1 className="tp-lacosta-font">Quang Tiến</h1>
                <h1 className="tp-lacosta-font"> & </h1>
                <h1 className="tp-lacosta-font">Lệ Huyền</h1>
                <h2>We Are Getting Married</h2>
                <Countdown />
                <p><a href="#" className="btn btn-default btn-sm">Save the date</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
