import { artwork } from "./artwork";

export type WeddingEvent = {
  id: string;
  name: string;
  telugu?: string;
  date?: string;
  time?: string;
  venue?: string;
  confirmed: boolean;
};

export const wedding = {
  groom: { name: "Sai Kiran Reddy", short: "Sai Kiran Reddy", telugu: "సాయికిరణ్ రెడ్డి" },
  bride: { name: "Tejasree", short: "Tejasree", telugu: "తేజశ్రీ రెడ్డి" },
  displayDate: "Saturday, December 12, 2026",
  shortDate: "12 December 2026",
  muhurthamTime: "7:29 PM IST",
  // 2026-12-12 19:29 Asia/Kolkata (UTC+5:30)
  muhurthamISO: "2026-12-12T19:29:00+05:30",
  venue: {
    name: "SS Convention Hall",
    city: "Mylavaram, Andhra Pradesh",
    mapsUrl:
      "https://maps.app.goo.gl/kZayRBLBM6bFvHmx8",
  },
  groomFamily: {
    english: "Sri Kudumula Krishna Reddy & Smt. Venkata Ramana",
    telugu: "శ్రీ కుడుముల కృష్ణారెడ్డి – వెంకట రమణ",
  },
  brideFamily: {
    english: "Sri Bando Dharma Reddy & Smt. Vanaja",
    hometown: "Medipally Village, Medipally Mandal, Medchal District, Telangana",
  },
  // Set to the family's WhatsApp number (country code, digits only), e.g. "919876543210". Empty hides the button.
  rsvpWhatsApp: "",
  // Path to a licensed instrumental track, e.g. "/assets/audio/wedding.mp3". Empty hides the music button.
  audioSrc: artwork.audio.url,
  audioVolume: 0.6,
  artwork,
  invitationDetails: {
    title: "Wedding Day",
    teluguTitle: "శుభ వివాహ ఆహ్వానం",
    date: "12 December 2026 · Saturday",
    teluguDate: "12-12-2026 శనివారం",
    ceremony: "Sumuhurtham · 7:29 PM",
    teluguCeremony: "సుముహూర్తం · రాత్రి 07:29 గంటలకు",
    dinner: "Dinner · 7:00 PM at the wedding venue",
    teluguDinner: "విందు · రాత్రి 07:00 గంటలకు కళ్యాణ వేదిక నందు",
    venue: "SS Convention Hall, Nuzvid Road, Mylavaram",
    teluguVenue: "ఎస్.ఎస్. కన్వెన్షన్ హాల్, నూజివీడు రోడ్, మైలవరం",
    blessing: "Your presence and blessings will make our celebration complete.",
    teluguBlessing: "మీరు విచ్చేసి వధూవరులను ఆశీర్వదించగలరు.",
  },
  photoPlaceholder: "Our memories, coming soon",
  photoPlaceholderTelugu: "మా మధుర జ్ఞాపకాలు",
  instagramUrl: "",
  story:
    "Two hearts, one beautiful journey, and a lifetime of togetherness. Through every smile and every moment shared, our journey has brought us to this beautiful beginning. As we take the sacred vows of forever, we carry dreams of a wonderful future and the blessings of our families. With hearts full of love and gratitude, we invite you to celebrate the beginning of our forever.",
  hashtag: "#SaiKiranWedsTejaSree",
  // Couple photos (URLs). Empty shows decorative placeholders.
  photos: [] as string[], // Add paths such as "/photos/couple-01.jpg"; store files in public/photos/.
  events: [
    {
      id: "muhurtham",
      name: "Wedding Ceremony",
      telugu: "ముహూర్తం",
      date: "December 12, 2026",
      time: "7:29 PM IST",
      venue: "SS Convention Hall, Mylavaram",
      confirmed: true,
    },
    {
      id: "dinner",
      name: "Wedding Dinner",
      telugu: "విందు",
      date: "December 12, 2026",
      time: "7:00 PM IST",
      venue: "SS Convention Hall",
      confirmed: true,
    },
    { id: "haldi", name: "Haldi", telugu: "పసుపు", confirmed: false },
    { id: "pellikuthuru", name: "Pellikuthuru", telugu: "పెళ్లికూతురు", confirmed: false },
    { id: "pellikoduku", name: "Pellikoduku", telugu: "పెళ్లికొడుకు", confirmed: false },
    { id: "mehendi", name: "Mehendi", telugu: "మెహందీ", confirmed: false },
    { id: "reception", name: "Reception", telugu: "రిసెప్షన్", confirmed: false },
  ] as WeddingEvent[],
};
