import Image from 'next/image';
import { coupleImages } from '@/lib/images';
import { getOptimizedImageProps } from '@/lib/images/utils';

interface CoupleSectionProps {
  weddingDate?: string;
  weddingLocation?: string;
  invitationMessage?: string;
  groomName?: string;
  brideName?: string;
  groomDescription?: string;
  brideDescription?: string;
}

export default function CoupleSection({
  weddingDate = "30 November 2025",
  weddingLocation = "Gia Huy Palace, Đà Nẵng",
  invitationMessage = "We invited you to celebrate our wedding",
  groomName = "Quang Tiến",
  brideName = "Lệ Huyền",
  groomDescription = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove",
  brideDescription = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove"
}: CoupleSectionProps) {
  return (
    <div id="fh5co-couple">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <h2>Hello!</h2>
            <h3>{weddingDate} {weddingLocation}</h3>
            <p>{invitationMessage}</p>
          </div>
        </div>
        <div className="couple-wrap animate-box">
          <div className="couple-half">
            <div className="groom">
              <Image {...getOptimizedImageProps(coupleImages.groom, 'left', 'scale(-1, 1)')} className="img-responsive" />
            </div>
            <div className="desc-groom">
              <h3>{groomName}</h3>
              <p>{groomDescription}</p>
            </div>
          </div>
          <p className="heart text-center"><i className="icon-heart2"></i></p>
          <div className="couple-half">
            <div className="bride">
              <Image {...getOptimizedImageProps(coupleImages.bride, 'right', 'scale(-1, 1)')} className="img-responsive" />
            </div>
            <div className="desc-bride">
              <h3>{brideName}</h3>
              <p>{brideDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
