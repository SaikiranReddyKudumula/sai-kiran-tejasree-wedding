import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Play,
  Pause,
  MessageCircle,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { wedding } from "@/config/wedding";
import { getCountdown } from "@/lib/countdown";

const art = wedding.artwork;
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const templeY = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const treeY = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);
  const treeScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.8], [1, 1, 0]);
  return (
    <section
      className="hero-scene"
      ref={ref}
      aria-label={`${wedding.groom.short} and ${wedding.bride.short}`}
    >
      <div className="hero-sticky">
        <img className="hero-sky" src={art.sky.url} alt="" fetchPriority="high" />
        <motion.img
          className="hero-temple"
          style={reduce ? {} : { y: templeY, scale: templeScale }}
          src={art.temple.url}
          alt="Colourful South Indian temple tower"
          fetchPriority="high"
        />
        <motion.img
          className="hero-tree"
          style={reduce ? {} : { y: treeY, scale: treeScale }}
          src={art.tree.url}
          alt=""
        />
        <motion.div className="hero-names" style={reduce ? {} : { y: textY, opacity: textOpacity }}>
          <h1>
            {wedding.groom.short}
            <span>WEDS</span>
            {wedding.bride.short}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
function Invitation() {
  return (
    <section className="illustrated-panel invitation-panel" aria-label="Wedding invitation">
      <img
        className="panel-art"
        src={art.frame.url}
        alt="Ornate colourful temple arch with lotus flowers"
      />
      <Reveal className="invitation-copy">
        <img className="ganesha" src={art.ganesha.url} alt="Lord Ganesha" />
        <p className="blessing font-telugu">శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు</p>
        <p className="invitation-intro">
          With the blessings of God and our beloved parents,
          <br />
          we cordially
        </p>
        <h2>Invite</h2>
        <div className="groom-family">
          <p>With the divine blessings of Lord Ganesha &amp; Shirdi Sai Baba,</p>
          <p>{wedding.groomFamily.english}</p>
          <p className="font-telugu">{wedding.groomFamily.telugu}</p>
          <p>joyfully invite you to celebrate the wedding of their beloved son</p>
        </div>
        <h3>{wedding.groom.short}</h3>
        <span className="couple-amp">&amp;</span>
        <h3>{wedding.bride.short}</h3>
        <div className="bride-family">
          <p>Beloved daughter of</p>
          <p>{wedding.brideFamily.english}</p>
          <p>{wedding.brideFamily.hometown}</p>
        </div>
        <h4>On the following events</h4>
      </Reveal>
    </section>
  );
}
function Events() {
  const events = wedding.events.filter((e) => e.confirmed);
  const [index, setIndex] = useState(0);
  const event = events[index];
  if (!event) return null;
  return (
    <section
      className="events-panel"
      aria-label="Wedding events"
      style={{ backgroundImage: `url(${art.invitation.url})` }}
    >
      <div className="event-card">
        <p className="event-couple">
          {wedding.groom.short} &amp; {wedding.bride.short}
        </p>
        <div className="event-tabs" aria-label="Choose an event">
          {events.map((item, i) => (
            <button key={item.id} aria-pressed={i === index} onClick={() => setIndex(i)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="event-layout">
          <div className="event-photo">
            <img src={event.image} alt={`${event.name} illustration`} loading="lazy" />
            <div className="event-navigation">
              <button
                aria-label="Previous event"
                onClick={() => setIndex((index + events.length - 1) % events.length)}
              >
                <ArrowLeft />
              </button>
              <button aria-label="Next event" onClick={() => setIndex((index + 1) % events.length)}>
                <ArrowRight />
              </button>
              <div className="event-dots">
                {events.map((e, i) => (
                  <button
                    key={e.id}
                    aria-label={`Show ${e.name}`}
                    aria-pressed={i === index}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="event-copy" aria-live="polite">
            <h2>{event.name}</h2>
            <div className="event-details">
              <p>
                <CalendarDays />
                {event.date}
              </p>
              {event.time && (
                <p>
                  <Clock3 />
                  {event.time}
                </p>
              )}
              <p>
                <MapPin />
                {event.venue}
              </p>
            </div>
            <p className="event-telugu font-telugu">{event.telugu}</p>
            {event.mapsUrl && (
              <a className="location-button" href={event.mapsUrl} target="_blank" rel="noreferrer">
                View Location
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
function TempleScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const templeScale = useTransform(scrollYProgress, [0, 1], [1, 1.01]);
  const coupleScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.58, 0.65, 0.68]);
  const leftCloudX = useTransform(scrollYProgress, [0, 1], ["-25vw", "100vw"]);
  const rightCloudX = useTransform(scrollYProgress, [0, 1], ["-70vw", "55vw"]);
  return (
    <section ref={ref} className="couple-scene" aria-label="Temple wedding scene">
      <div className="couple-sticky">
        <motion.img
          className="couple-background"
          src={art.portrait.url}
          alt=""
          loading="lazy"
          style={reduce ? {} : { scale: skyScale }}
        />
        <motion.img
          className="floating-cloud cloud-left"
          src={art.cloud.url}
          alt=""
          style={reduce ? {} : { x: leftCloudX }}
        />
        <motion.img
          className="floating-cloud cloud-right"
          src={art.cloud.url}
          alt=""
          style={reduce ? {} : { x: rightCloudX }}
        />
        <div className="couple-art-box">
          <motion.img
            className="couple-temple"
            src={art.groom.url}
            alt="Flower-decorated temple wedding pavilion"
            loading="lazy"
            style={reduce ? { scale: 1 } : { scale: templeScale }}
          />
          <motion.img
            className="couple-cutout"
            src={art.bride.url}
            alt="Bride and groom exchanging garlands"
            loading="lazy"
            style={reduce ? { scale: 0.68, y: "-15%" } : { scale: coupleScale, y: "-15%" }}
          />
        </div>
      </div>
    </section>
  );
}
function Gallery() {
  const [index, setIndex] = useState(0);
  const photos = wedding.photos;
  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 5000);
    return () => clearInterval(id);
  }, [photos.length]);
  if (!photos.length)
    return (
      <div className="story-gallery">
        <div className="gallery-photo-window photo-placeholder">
          <span aria-hidden="true">♡</span>
          <p>{wedding.photoPlaceholder}</p>
          <p lang="te" className="font-telugu">
            {wedding.photoPlaceholderTelugu}
          </p>
        </div>
        <img className="gallery-gold-frame" src={art.photoFrame.url} alt="" loading="lazy" />
      </div>
    );
  return (
    <div className="story-gallery">
      <div className="gallery-photo-window">
        {photos.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={`Couple photograph ${i + 1}`}
            loading="lazy"
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.7 }}
            aria-hidden={i !== index}
          />
        ))}
      </div>
      <img className="gallery-gold-frame" src={art.photoFrame.url} alt="" loading="lazy" />
      <button
        className="gallery-prev"
        aria-label="Previous photograph"
        onClick={() => setIndex((index + photos.length - 1) % photos.length)}
      >
        <ArrowLeft />
      </button>
      <button
        className="gallery-next"
        aria-label="Next photograph"
        onClick={() => setIndex((index + 1) % photos.length)}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
function Story() {
  return (
    <section className="illustrated-panel story-panel">
      <img
        className="panel-art"
        src={art.story.url}
        alt="Maroon and gold temple invitation border"
        loading="lazy"
      />
      <Reveal className="story-heading">
        <p>Meet The</p>
        <h2>Bride &amp; Groom</h2>
      </Reveal>
      <Reveal className="story-copy">
        <h2>Our Story</h2>
        <p>{wedding.story}</p>
      </Reveal>
      <Gallery />
    </section>
  );
}
function Closing() {
  const rsvp = wedding.rsvpWhatsApp
    ? `https://wa.me/${wedding.rsvpWhatsApp}?text=${encodeURIComponent(`We will attend the wedding of ${wedding.groom.short} & ${wedding.bride.short} on ${wedding.shortDate}.`)}`
    : null;
  return (
    <>
      <section className="illustrated-panel rsvp-panel">
        <img className="panel-art" src={art.rsvp.url} alt="" loading="lazy" />
        <Reveal className="rsvp-copy">
          <h2>
            <span>Will You</span>
            <br />
            Join Us?
          </h2>
          <p>
            We would be truly honoured to celebrate this day with you. Please let us know if you’ll
            be joining the festivities — your presence is the only gift we need.
          </p>
          {rsvp && (
            <>
              <a className="rsvp-button" href={rsvp} target="_blank" rel="noreferrer">
                <MessageCircle /> RSVP on WhatsApp
              </a>
              <small>TAP HERE</small>
            </>
          )}
        </Reveal>
      </section>
      <section className="wedding-details-panel">
        <h2>{wedding.invitationDetails.title}</h2>
        <h3 lang="te" className="font-telugu">
          {wedding.invitationDetails.teluguTitle}
        </h3>
        <p>
          {wedding.groom.name} &amp; {wedding.bride.name}
        </p>
        <p lang="te" className="font-telugu">
          {wedding.groom.telugu} &amp; {wedding.bride.telugu}
        </p>
        <div className="wedding-details-grid">
          {[
            [wedding.invitationDetails.date, wedding.invitationDetails.teluguDate],
            [wedding.invitationDetails.ceremony, wedding.invitationDetails.teluguCeremony],
            [wedding.invitationDetails.dinner, wedding.invitationDetails.teluguDinner],
            [wedding.invitationDetails.venue, wedding.invitationDetails.teluguVenue],
          ].map(([english, telugu]) => (
            <div key={english}>
              <p>{english}</p>
              <p lang="te" className="font-telugu">
                {telugu}
              </p>
            </div>
          ))}
        </div>
        <p>{wedding.groomFamily.english}</p>
        <p lang="te" className="font-telugu">
          {wedding.groomFamily.telugu}
        </p>
        <p className="details-blessing">{wedding.invitationDetails.blessing}</p>
        <p lang="te" className="font-telugu">
          {wedding.invitationDetails.teluguBlessing}
        </p>
      </section>
    </>
  );
}
function Countdown() {
  const [value, setValue] = useState<ReturnType<typeof getCountdown> | null>(null);
  useEffect(() => {
    const update = () => setValue(getCountdown(wedding.muhurthamISO));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="countdown" aria-label="Time until the wedding">
      {[
        ["D", value?.days],
        ["H", value?.hours],
        ["M", value?.minutes],
        ["S", value?.seconds],
      ].map(([label, number]) => (
        <span key={label}>
          {number === undefined ? "—" : String(number).padStart(2, "0")}
          <small>{label}</small>
        </span>
      ))}
    </div>
  );
}
function Finale() {
  return (
    <section className="illustrated-panel finale-panel">
      <img
        className="panel-art"
        src={art.gate.url}
        alt="Golden floral parchment with temple and mountains"
        loading="lazy"
      />
      <Reveal className="finale-copy">
        <h2>Counting the Days</h2>
        <Countdown />
        <p className="finale-date">
          {wedding.displayDate}
          <br />
          {wedding.muhurthamTime}
        </p>
        <div className="finale-map">
          <span>See you at</span>
          <br />
          {wedding.venue.name}
          <small>{wedding.venue.city}</small>
          <a className="maps-button" href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin />
            <span>Open in Google Maps</span>
            <ArrowRight />
          </a>
        </div>
        <div className="livestream-block">
          <a
            className="livestream-button"
            href={wedding.livestream.url}
            target="_blank"
            rel="noreferrer"
          >
            <Play fill="currentColor" size={18} /> YouTube Live <ArrowRight size={18} />
          </a>
          {wedding.livestream.isPlaceholder && <p>Preview link · Wedding livestream coming soon</p>}
        </div>
        <p className="finale-names">
          {wedding.groom.short} &amp; {wedding.bride.short}
        </p>
      </Reveal>
    </section>
  );
}
export function WeddingSite() {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const track = audio.current;
    if (!track || !wedding.audioAutoplay) return;
    track.volume = wedding.audioVolume;
    const removeFallback = () => {
      document.removeEventListener("pointerup", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    const startOnInteraction = (event: Event) => {
      // The music button handles its own gesture, avoiding a play/pause race.
      if (event.target instanceof Element && event.target.closest(".music-control")) return;
      void track.play().catch(() => {});
    };
    track.addEventListener("playing", removeFallback);
    document.addEventListener("pointerup", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
    // Audible autoplay is browser-controlled. Retry on a gesture if it is blocked.
    void track.play().catch(() => {});
    return () => {
      removeFallback();
      track.removeEventListener("playing", removeFallback);
    };
  }, []);
  const toggle = () => {
    const track = audio.current;
    if (!track) return;
    if (track.paused) {
      track.volume = wedding.audioVolume;
      track
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      track.pause();
      setPlaying(false);
    }
  };
  return (
    <main className="invitation-site">
      <Hero />
      <Invitation />
      <Events />
      <TempleScene />
      <Story />
      <Closing />
      <Finale />
      {wedding.audioSrc && (
        <>
          <audio
            src={wedding.audioSrc}
            ref={audio}
            loop
            autoPlay={wedding.audioAutoplay}
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <button
            onClick={toggle}
            className="music-control"
            aria-label={playing ? "Pause music" : "Play music"}
            title={playing ? "Pause music" : "Play music"}
          >
            {playing ? <Pause /> : <Play fill="currentColor" />}
          </button>
        </>
      )}
    </main>
  );
}
