import { coupleImages } from '@/lib/images';

interface StoryItem {
  title: string;
  date: string;
  description: string;
  image: string;
}

interface StorySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stories?: StoryItem[];
}

const defaultStories: StoryItem[] = [
  {
    title: "Lần đầu gặp gỡ",
    date: "Ngày 07, Tháng 4, 2022",
    description: "Họ gặp nhau lần đầu trong một buổi tiệc ở 18+ Station. Anh ấy ngồi cùng nhóm QA, còn cô ấy tham dự tiệc chia tay của một đồng nghiệp - một sự tình cờ thú vị khi hai bàn lại cùng thuộc công ty S. Khi ra về, ai cũng có người đưa người đón, chỉ còn cô ấy lặng lẽ với chiếc xe CUP 50 nhỏ xinh. Thấy vậy, anh ấy quyết định âm thầm đi theo phía sau để chắc rằng cô ấy về an toàn. Nhưng mọi chuyện chưa bắt đầu từ đó - cô ấy không biết anh ấy là ai, còn anh ta thì cũng chẳng nghĩ nhiều về lần gặp gỡ ấy.",
    image: "/images/our_story_images/1.png",
  },
  {
    title: "Tiếp cận gần hơn",
    date: "Ngày 10, Tháng 5, 2023",
    description: "Mọi chuyện bắt đầu một cách âm thầm vào những ngày tháng 4, một năm sau đó. Anh dần bị thu hút bởi cô gái nhỏ nhắn ấy - qua những cuộc trò chuyện ngắn nơi bàn ăn trưa, những lần “vô tình” cùng làm “cú” rồi bắt chuyện. Để có cớ tiếp cận, anh còn khéo léo tổ chức một giải bida nội bộ trong công ty và sắp xếp sao cho hai người cùng một đội. Nhờ những buổi “luyện tập”, “thi đấu” ấy, khoảng cách giữa hai người cũng dần được rút ngắn.",
    image: "/images/our_story_images/2.png",
  },
  {
    title: "Kết nối mạnh mẽ",
    date: "Nhiều ngày năm 2023",
    description: "Rồi những ngày sau đó, họ kết nối nhiều hơn - trò chuyện, tâm sự, chia sẻ đủ chuyện trên đời. Mỗi lần gặp, khoảng cách giữa hai người lại ngắn đi một chút. Có nhiều niềm vui hơn, nhiều nụ cười hơn... Trời ạ, nhìn nụ cười này đi, dù là người xa lạ nhất cũng nhận ra, cô ấy đã “say” mất rồi và ai mà không yêu nụ cười này?",
    image: "/images/our_story_images/3.png",
  },
  {
    title: "Và họ chính thức yêu nhau",
    date: "Giáng sinh hạnh phúc, Năm 2023",
    description: "Rồi sau bao lần e thẹn và hẹn sẽ trả lời sau, cuối cùng cô ấy cũng NGÃ vào lòng anh ấy. Ngã cả nghĩa đen và nghĩa bóng ấy nhé, tôi đang không cố ý nói là cô ấy thực sự bị ngã vào hôm được tỏ tình đâu.",
    image: "/images/our_story_images/4.jpg",
  },
  {
    title: "Vẫn chiều hôm ấy",
    date: "Ngay sau đó",
    description: "Đấy, đồng ý sớm hơn có phải hạnh phúc sớm hơn không? Lúc nào cũng chần chừ và mất thời gian lắm. Bật mí nhỏ là sau này, việc gì cũng vậy, cô ấy vẫn giữ thói quen này, buồn nhẹ!!!",
    image: "/images/our_story_images/5.png",
  },
  {
    title: "Đồng hành cùng nhau",
    date: "Nhiều nhiều ngày",
    description: "Từ đó, họ đồng hành cùng nhau — chia sẻ từng niềm vui, nỗi buồn, và trải nghiệm mọi cung bậc cảm xúc mà cuộc sống mang lại. Phần nhiều thời gian luôn hạnh phúc và ngọt ngào. Ngọt đến tiểu đường ấy.",
    image: "/images/our_story_images/6.png",
  },
  {
    title: "Vượt qua khó khăn",
    date: "Nhiều nhiều ngày +1",
    description: "Bên nhau không chỉ là niềm vui, mà còn cả những lúc giận hờn, hiểu lầm, khiến cô ấy khóc nhiều. Nhưng chưa bao giờ họ nghĩ đến việc rời xa nhau. Họ chia sẻ, cùng nhau giải quyết mọi chuyện — dù đôi khi tốn không ít nước mắt (như đã nói, cô ấy vốn rất “mít ướt” mà! “MÍT ƯỚT” lắm!!!)",
    image: "/images/our_story_images/7.png",
  },
  {
    title: "Tận hưởng hạnh phúc",
    date: "Nhiều nhiều ngày +2",
    description: "Nhìn nụ cười của kẻ chiến thắng đó đi, bạn biết ai chiến thắng mà? Còn anh ấy đã thấy ai thắng. Anh ấy thấy cô ấy thắng, anh ấy thắng. Họ đã cùng nhau thắng lớn!",
    image: "/images/our_story_images/8.png",
  },
  {
    title: "Cô ấy say “Yes”",
    date: "Ngày 5, Tháng 3, 2025",
    description: "Vâng, cô ấy say “Yes” và câu chuyện bận rộn của họ bắt đầu từ đó.",
    image: "/images/our_story_images/9.png",
  },
  {
    title: "Upcoming...",
    date: "Suốt nửa năm sau đó....",
    description: "Sau ngày đính hôn hạnh phúc 01.06.2025, họ đã cùng nhau tất bật chuẩn bị cho ngày trọng đại sắp tới. Và giờ đây, họ rất mong bạn sẽ đến để chung vui, và cùng họ viết tiếp câu chuyện hạnh phúc này. 💍",
    image: "/images/our_story_images/10.jpg",
  },
];

export default function StorySection({
  title = "Our Story",
  subtitle = "We Love Each Other",
  description = "Mời bạn cùng lật giở từng trang kỷ niệm để theo dõi những dấu mốc quan trọng trong hành trình từ người lạ thành người thương của chúng mình nhé!",
  stories = defaultStories
}: StorySectionProps) {
  return (
    <div id="fh5co-couple-story">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>{subtitle}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-md-offset-0">
            <ul className="timeline animate-box">
              {stories.map((story, index) => (
                <li key={index} className={`animate-box ${(index) % 2 === 0 ? '' : 'timeline-inverted'}`}>
                  <div
                    className="timeline-badge"
                    style={{ backgroundImage: `url(${story.image})` }}
                  ></div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h3 className="timeline-title">{story.title}</h3>
                      <span className="date">{story.date}</span>
                    </div>
                    <div className="timeline-body">
                      <p>{story.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
