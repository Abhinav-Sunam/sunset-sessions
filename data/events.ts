export interface MediaItem {
  type: 'photo' | 'video';
  src: string | null;
  caption: string;
}

export interface TicketTier {
  name: string;
  price: string;
  note: string;
  left: number | null;
}

export interface SunsetEvent {
  id: string;
  name: string;
  venue: string;
  city: 'Darjeeling' | 'Gangtok';
  date: string;
  time: string;
  tone: 'gold' | 'amber' | 'dusk' | 'red';
  poster: string | null;
  video: string | null;
  exclusive?: boolean;
  blurb?: string;
  tiers?: TicketTier[];
  media?: MediaItem[];
  mapUrl?: string;
}

export const EVENTS: SunsetEvent[] = [
  {
    id: 'dasailing-25',
    name: 'Dasailing',
    venue: 'The Buzz',
    city: 'Darjeeling',
    date: '2025-10-05',
    time: '6 PM onward',
    tone: 'gold',
    poster: '/media/party-pics/party-1.jpg',
    video: null,
    blurb: 'The inaugural Dasailing session on the terrace at The Buzz. Deep selections as the sun dropped behind the hills.',
    media: [
      { type: 'photo', src: '/media/party-pics/party-1.jpg', caption: 'Terrace opening set' },
      { type: 'photo', src: '/media/party-pics/000170850012_.jpg', caption: 'Golden hour crowd' },
      { type: 'photo', src: '/media/party-pics/party-5.jpg', caption: 'Bar and balcony' },
      { type: 'photo', src: '/media/party-pics/c66643d6819512cd2b6d6f3ea6ee3e3a.jpg', caption: 'Peak evening groove' },
      { type: 'photo', src: '/media/party-pics/party-2.jpeg', caption: 'Last light on the ridge' }
    ]
  },
  {
    id: 'orchid-triple',
    name: 'Orchid Pre Party',
    venue: 'The Triple Star',
    city: 'Gangtok',
    date: '2025-11-22',
    time: '7 PM onward',
    tone: 'amber',
    poster: '/media/party-pics/49c26e8dc00b8accf95dc7a38607703b.jpg',
    video: null,
    blurb: 'Our first gathering in Gangtok. Intimate indoor energy at Triple Star with friends from across the state.',
    media: [
      { type: 'photo', src: '/media/party-pics/49c26e8dc00b8accf95dc7a38607703b.jpg', caption: 'Doors open at Triple Star' },
      { type: 'photo', src: '/media/party-pics/party-4.png', caption: 'Soundcheck and lights' },
      { type: 'photo', src: '/media/party-pics/f5193176aade9b3721724a9d790423b6.jpg', caption: 'Late night floor' },
      { type: 'photo', src: '/media/party-pics/party-6.avif', caption: 'Encore set' }
    ]
  },
  {
    id: 'orchid-barn',
    name: 'Orchid Pre Party',
    venue: 'Barn & Soy',
    city: 'Gangtok',
    date: '2025-11-29',
    time: '7 PM onward',
    tone: 'dusk',
    poster: '/media/party-pics/a45af22b0d2340b876ed791956c86de7.jpg',
    video: null,
    blurb: 'Second Gangtok chapter at Barn & Soy. Packed room, warm basslines, and late-night hillside conversations.',
    media: [
      { type: 'photo', src: '/media/party-pics/a45af22b0d2340b876ed791956c86de7.jpg', caption: 'Barn & Soy booth' },
      { type: 'photo', src: '/media/party-pics/lighter.webp', caption: 'Warm-up vinyl selections' },
      { type: 'photo', src: '/media/party-pics/party-3.webp', caption: 'Gathering on the deck' },
      { type: 'photo', src: '/media/party-pics/4c1778b8edb0476d8be959c9db95328c.jpg', caption: 'Closing tracks' },
      { type: 'photo', src: '/media/party-pics/party-5.jpg', caption: 'Crew and friends' }
    ]
  },
  {
    id: 'y2k',
    name: 'Y2K Era',
    venue: 'The Buzz',
    city: 'Darjeeling',
    date: '2026-08-14',
    time: '7 PM onward',
    tone: 'red',
    poster: '/media/party-pics/party-7.webp',
    video: null,
    blurb: 'Throwback millennium sounds, styling, and raw energy upstairs at The Buzz. Vintage house and garage.',
    media: [
      { type: 'photo', src: '/media/party-pics/party-7.webp', caption: 'Y2K Era entrance' },
      { type: 'photo', src: '/media/party-pics/party-8.webp', caption: 'Fits and throwback styling' },
      { type: 'photo', src: '/media/party-pics/ScreenShot2019-01-15at1.58.42AM-r38dd.png.webp', caption: 'Floor in full motion' },
      { type: 'photo', src: '/media/party-pics/lighter-2.webp', caption: 'Bassline drops' },
      { type: 'photo', src: '/media/party-pics/Tiff+Mike_Cabo_Mexico_Wedding_ChelliseMichaelPhotography-170_websize.jpg.webp', caption: 'Last song singalong' }
    ]
  },
  {
    id: 'members-house',
    name: 'Members Only House Party',
    venue: 'Trippers Hostel',
    city: 'Darjeeling',
    date: '2026-09-19',
    time: '8 PM onward',
    tone: 'dusk',
    poster: '/media/party-pics/anyone-into-film-cameras-highly-recommend-bringing-a-v0-tm4sfbxag4k41.jpg.webp',
    video: null,
    exclusive: true,
    blurb: 'A small one. Members and their plus-ones only, at Trippers Hostel. No door sales, no walk-ins.',
    tiers: [],
    media: [
      { type: 'photo', src: '/media/party-pics/anyone-into-film-cameras-highly-recommend-bringing-a-v0-tm4sfbxag4k41.jpg.webp', caption: 'Living room warmup' },
      { type: 'photo', src: '/media/party-pics/images-12.jpeg', caption: 'Intimate selector corner' },
      { type: 'photo', src: '/media/party-pics/images-13.jpeg', caption: 'Hostel rooftop banter' }
    ],
    mapUrl: 'https://maps.google.com/?q=Trippers+Hostel+Darjeeling'
  },
  {
    id: 'dasailing-26',
    name: 'Dasailing 2026',
    venue: 'The Buzz',
    city: 'Darjeeling',
    date: '2026-10-23',
    time: '6 PM onward',
    tone: 'gold',
    poster: '/media/party-pics/party-6.avif',
    video: null,
    blurb: 'Dasai weekend, back at The Buzz. Sunset on the terrace, then inside till late.',
    tiers: [
      { name: 'Early bird', price: '₹399', note: 'Till 10 Oct', left: 38 },
      { name: 'Regular', price: '₹499', note: 'Online', left: null },
      { name: 'Door', price: '₹599', note: 'If any left', left: null }
    ],
    media: [
      { type: 'photo', src: '/media/party-pics/party-6.avif', caption: 'Dasailing 2026 preview' },
      { type: 'photo', src: '/media/party-pics/party-1.jpg', caption: 'Terrace sundowner setup' },
      { type: 'photo', src: '/media/party-pics/party-3.webp', caption: 'Golden horizon vibes' }
    ],
    mapUrl: 'https://maps.google.com/?q=The+Buzz+Darjeeling'
  }
];

export function getEventById(id: string): SunsetEvent | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getAllEvents(): SunsetEvent[] {
  return [...EVENTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
