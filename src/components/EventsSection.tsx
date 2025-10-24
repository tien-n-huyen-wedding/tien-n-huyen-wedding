import { backgroundImages } from '@/lib/images';
import { getBackgroundImageStyle } from '@/lib/images/utils';

interface Event {
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  month: string;
  description: string;
}

interface EventsSectionProps {
  title?: string;
  subtitle?: string;
  events?: Event[];
  backgroundImage?: string;
}

const defaultEvents: Event[] = [
  {
    title: "Main Ceremony",
    startTime: "4:00 PM",
    endTime: "6:00 PM",
    date: "Monday 28",
    month: "November, 2016",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
  },
  {
    title: "Wedding Party",
    startTime: "7:00 PM",
    endTime: "12:00 AM",
    date: "Monday 28",
    month: "November, 2016",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
  }
];

export default function EventsSection({
  title = "Wedding Events",
  subtitle = "Our Special Events",
  events = defaultEvents,
  backgroundImage
}: EventsSectionProps) {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : getBackgroundImageStyle(backgroundImages.event);

  return (
    <div id="fh5co-event" className="fh5co-bg" style={backgroundStyle}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>{subtitle}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="display-t">
            <div className="display-tc">
              <div className="col-md-10 col-md-offset-1">
                {events.map((event, index) => (
                  <div key={index} className="col-md-6 col-sm-6 text-center">
                    <div className="event-wrap animate-box">
                      <h3>{event.title}</h3>
                      <div className="event-col">
                        <i className="icon-clock"></i>
                        <span>{event.startTime}</span>
                        <span>{event.endTime}</span>
                      </div>
                      <div className="event-col">
                        <i className="icon-calendar"></i>
                        <span>{event.date}</span>
                        <span>{event.month}</span>
                      </div>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
