import { coupleImages } from '@/lib/images';

interface StoryItem {
  title: string;
  date: string;
  description: string;
  image: string;
  inverted?: boolean;
}

interface StorySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stories?: StoryItem[];
}

const defaultStories: StoryItem[] = [
  {
    title: "First We Meet",
    date: "December 25, 2015",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    image: coupleImages.couple1.src,
    inverted: false
  },
  {
    title: "First Date",
    date: "December 28, 2015",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    image: coupleImages.couple2.src,
    inverted: true
  },
  {
    title: "In A Relationship",
    date: "January 1, 2016",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    image: coupleImages.couple3.src,
    inverted: false
  }
];

export default function StorySection({
  title = "Our Story",
  subtitle = "We Love Each Other",
  description = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
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
                <li key={index} className={`animate-box ${story.inverted ? 'timeline-inverted' : ''}`}>
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
