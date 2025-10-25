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

const Description = ({ description }: { description: string }) => {
  return (
    <p>
      {description.split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}
    </p>
  )
};

export default function CoupleSection({
  weddingDate = "30 November 2025",
  weddingLocation = "Gia Huy Palace, Đà Nẵng",
  invitationMessage = "We invited you to celebrate our wedding",
  groomName = "Quang Tiến",
  brideName = "Lệ Huyền",
  groomDescription = "Một developer trực tính.\nĐẹp trai, hào hoa và tiêu sái là những tính từ gần đủ chính xác để mô tả về anh ấy",
  brideDescription = "Một HR tận tâm, mang vẻ đẹp dịu dàng và nụ cười tỏa nắng.\nẨn sau sự mạnh mẽ là một tâm hồn nhạy cảm, luôn chứa đựng tình yêu và sự chân thành vô bờ bến."
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
              <Description description={groomDescription} />
            </div>
          </div>
          <p className="heart text-center"><i className="icon-heart2"></i></p>
          <div className="couple-half">
            <div className="bride">
              <Image {...getOptimizedImageProps(coupleImages.bride, 'right', 'scale(-1, 1)')} className="img-responsive" />
            </div>
            <div className="desc-bride">
              <h3>{brideName}</h3>
              <Description description={brideDescription} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
