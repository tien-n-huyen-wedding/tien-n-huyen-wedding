import Image from 'next/image';
import { coupleImages } from '@/lib/images';
import { getOptimizedImageProps } from '@/lib/images/utils';
import { CHANGEABLE_FIELDS, InvitationProps } from '../invitation/Invitation';
import { useInvitationProps } from '@/hooks/useInvitationProps';

interface CoupleSectionProps {
  weddingDate?: string;
  weddingLocation?: string;
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
  groomName = "Quang Tiến",
  brideName = "Lệ Huyền",
  groomDescription = "“Anh ấy - một Developer đỉnh chóp trong lòng mình. Là người thẳng thắn, bộc trực nhưng luôn thể hiện tình yêu một cách dịu dàng và ấm áp.”",
  brideDescription = "“Cô ấy - một HR tận tâm, mang vẻ đẹp dịu dàng cùng nụ cười toả nắng. Ẩn sau sự mạnh mẽ là một tâm hồn nhạy cảm, luôn chứa đựng tình yêu và sự chân thành vô bờ bến.”"
}: CoupleSectionProps) {
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);
  const guestName = isLoaded && props.guestName ? props.guestName : null;
  const coupleGreeting = isLoaded && props.coupleGreeting ? props.coupleGreeting : 'chúng mình';
  return (
    <div id="fh5co-couple">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <h2>Xin chào{guestName ? `, ${guestName} !!!` : '!'}</h2>
            <p>Một cột mốc quan trọng đang đến. Và {coupleGreeting} tin rằng, khoảnh khắc này sẽ ý nghĩa hơn rất nhiều nếu có sự chứng kiến và chung vui của {guestName ? guestName : 'bạn'}
            </p>
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
