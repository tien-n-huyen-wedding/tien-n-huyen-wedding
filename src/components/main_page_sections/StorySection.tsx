'use client';

import { useState, useRef, useEffect } from 'react';
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
  subtitle = "💞💞💞",
  description = "Mời bạn cùng lật giở từng trang kỷ niệm để theo dõi những dấu mốc quan trọng trong hành trình từ người lạ thành người thương của chúng mình nhé!",
  stories = defaultStories
}: StorySectionProps) {
  const [showStories, setShowStories] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Lazy load images when they come into viewport
  useEffect(() => {
    if (!showStories) return;

    let imageObserver: IntersectionObserver | null = null;
    let imageElements: NodeListOf<Element> | null = null;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      imageElements = document.querySelectorAll('.timeline-badge');
      imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const indexStr = entry.target.getAttribute('data-image-index');
              if (indexStr) {
                const index = parseInt(indexStr, 10);
                setLoadedImages((prev) => {
                  if (!prev.has(index)) {
                    return new Set([...prev, index]);
                  }
                  return prev;
                });
                imageObserver?.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
        }
      );

      // Observe all elements
      imageElements.forEach((el) => {
        imageObserver?.observe(el);
        // Also check if already in viewport and load immediately
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight + 50 && rect.bottom > -50;
        if (isInViewport) {
          const indexStr = el.getAttribute('data-image-index');
          if (indexStr) {
            const index = parseInt(indexStr, 10);
            setLoadedImages((prev) => {
              if (!prev.has(index)) {
                return new Set([...prev, index]);
              }
              return prev;
            });
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (imageObserver && imageElements) {
        imageElements.forEach((el) => imageObserver?.unobserve(el));
      }
    };
  }, [showStories]);

  const toggleAllStories = () => {
    const wasOpen = showStories;
    setShowStories(prev => !prev);

    // Nếu đang đóng lại (từ true -> false), scroll đến đầu section
    if (wasOpen) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100); // Delay nhỏ để đảm bảo animation đóng hoàn tất
    }
  };

  const getButtonStyle = (isClosed: boolean) => ({
    padding: '12px 32px',
    backgroundColor: '#8FBC8F',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: isClosed
      ? '0 4px 20px rgba(143, 188, 143, 0.6)'
      : '0 4px 12px rgba(143, 188, 143, 0.4)',
    letterSpacing: '0.5px',
    animation: isClosed ? 'breath 2s ease-in-out infinite' : 'none',
    transform: isClosed ? 'scale(1)' : 'scale(1)',
  } as React.CSSProperties);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#A8C8A8';
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(143, 188, 143, 0.5)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#8FBC8F';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(143, 188, 143, 0.4)';
  };

  return (
    <div id="fh5co-couple-story" ref={sectionRef}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes breath {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 4px 20px rgba(143, 188, 143, 0.6);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 6px 25px rgba(143, 188, 143, 0.8);
            }
          }
        `
      }} />
        <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>{subtitle}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-md-offset-0 text-center" style={{ marginBottom: '30px' }}>
            <button
              onClick={toggleAllStories}
              className="story-toggle-all-btn"
              style={getButtonStyle(!showStories)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>{showStories ? 'Tạm đóng lại' : 'Lật mở'}</span>
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.3s ease',
                  transform: showStories ? 'rotate(180deg)' : 'rotate(0deg)',
                  fontSize: '14px'
                }}
              >
                ▼
              </span>
            </button>
          </div>
        </div>
        <div
          className="row"
          style={{
            opacity: showStories ? 1 : 0,
            maxHeight: showStories ? 'none' : 0,
            overflow: showStories ? 'visible' : 'hidden',
            transition: 'opacity 0.5s ease-in-out, max-height 0.5s ease-in-out',
          }}
        >
          <div className="col-md-12 col-md-offset-0">
            <ul className="timeline animate-box">
              {stories.map((story, index) => (
                <li key={index} className={`animate-box ${(index) % 2 === 0 ? '' : 'timeline-inverted'}`}>
                  <div
                    className="timeline-badge"
                    style={{
                      backgroundImage: loadedImages.has(index) ? `url(${story.image})` : 'none',
                      backgroundColor: loadedImages.has(index) ? 'transparent' : '#f0f0f0',
                      transition: 'background-image 0.3s ease-in-out'
                    }}
                    data-image-src={story.image}
                    data-image-index={index}
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
        {showStories && (
          <div className="row">
            <div className="col-md-12 col-md-offset-0 text-center" style={{ marginTop: '40px', marginBottom: '30px' }}>
              <button
                onClick={toggleAllStories}
                className="story-toggle-all-btn-bottom"
                style={getButtonStyle(false)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>Tạm đóng lại</span>
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s ease',
                    transform: 'rotate(180deg)',
                    fontSize: '14px'
                  }}
                >
                  ▼
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
