export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  images: string[];
  slug: string;
  tools: string[];
  role: string;
  description: string;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
};

export type AboutData = {
  name: string;
  role: string;
  location: string;
  email: string;
  summary: string;
  resumeUrl: string;
  skills: string[];
  software: { name: string; icon: string; color: string }[];
  socialLinks: { name: string; url: string; color: string }[];
};

export type ContactData = {
  header: string;
  subtitle: string;
  email: string;
  networkTitle: string;
  networkLinks: { name: string; url: string }[];
  availableText: string;
};

export type HeroAction = {
  label: string;
  href: string;
};

export type PublishState = {
  isPublished: boolean;
  lastSaved: string | null;
};

export type SiteData = {
  heroText: string;
  heroActions: HeroAction[];
  about: AboutData;
  contact: ContactData;
  portfolioProjects: PortfolioProject[];
  blogPosts: BlogPost[];
  publish: PublishState;
};

export const LOCAL_STORAGE_KEY = 'sundarrajanSiteData';

export const defaultSiteData: SiteData = {
  heroText:
    'Crafting immersive visuals, slot games, character design, environment art, concept illustration, and engaging player experiences.',
  heroActions: [
    { label: 'Artworks', href: '#portfolio' },
    { label: 'Hire Me', href: '#contact' },
  ],
  about: {
    name: 'Sundarrajan',
    role: 'Game artist & slot specialist',
    location: 'Remote, Global',
    email: 'hello@sundarrajanart.com',
    summary:
      'I am a Game Artist focused on the slot industry, with a passion for visually striking, player-focused design. For the past several years, I\'ve dedicated myself to understanding what makes a slot game not just playable, but memorable. My work goes beyond just making things look good. I focus on hierarchy, readability, and the psychology behind color and light to create experiences that keep players engaged. My ultimate vision is to lead art teams as an Art Director, establishing high-end visual pillars and mentoring the next generation of game artists.',
    resumeUrl: 'https://example.com/resume.pdf',
    skills: [
      'GAME ART',
      'SLOT UI',
      'SYMBOL DESIGN',
      'ENVIRONMENT DESIGN',
      'CHARACTER ART',
      'ILLUSTRATION',
      'CONCEPT ART',
    ],
    software: [
      { name: 'Photoshop', icon: 'Ps', color: '#31A8FF' },
      { name: 'Illustrator', icon: 'Ai', color: '#FF9A00' },
      { name: 'Blender', icon: 'Bl', color: '#EA7600' },
      { name: 'ZBrush', icon: 'Zb', color: '#444444' },
      { name: 'Substance', icon: 'Sp', color: '#E33324' },
      { name: 'Spine 2D', icon: 'S2', color: '#888888' },
    ],
    socialLinks: [
      { name: 'ArtStation', url: 'https://artstation.com', color: '#13B5EA' },
      { name: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
      { name: 'LinkedIn', url: 'https://linkedin.com', color: '#0077B5' },
      { name: 'Instagram', url: 'https://instagram.com', color: '#E1306C' },
      { name: 'Facebook', url: 'https://facebook.com', color: '#4267B2' },
    ],
  },
  contact: {
    header: 'Let\'s Create Something Great.',
    subtitle:
      'Whether you are a studio looking to expand your team or a client needing freelance art, I\'m ready to bring my expertise to your next project.',
    email: 'hello@sundarrajanart.com',
    networkTitle: 'Network',
    networkLinks: [
      { name: 'LinkedIn', url: 'https://linkedin.com' },
      { name: 'ArtStation', url: 'https://artstation.com' },
      { name: 'Behance', url: 'https://behance.net' },
    ],
    availableText: 'Available for Freelance & Full-time',
  },
  portfolioProjects: [
    {
      id: '1',
      title: "Pharaoh's Riches",
      category: 'Game Art',
      shortDescription:
        'Main slot game interface and symbol designs for an Egyptian-themed casino game.',
      image: 'https://picsum.photos/seed/egypt_gold/1920/1080',
      images: [
        'https://picsum.photos/seed/pharaoh_throne/1920/1440',
        'https://picsum.photos/seed/egypt_pyramid/1920/1080',
        'https://picsum.photos/seed/gold_coin/1920/1080',
      ],
      slug: 'pharaohs-riches',
      tools: ['Photoshop', 'Illustrator', 'Spine 2D'],
      role: 'Lead 2D Artist',
      description:
        'Designed the complete UI, background, and high-paying symbols for a top-performing slot game. Focused on vibrant, gold-accented visuals to enhance player engagement and convey luxury.',
    },
    {
      id: '2',
      title: 'Neon Cyber City',
      category: 'Environment',
      shortDescription: 'Background environment art for a cyberpunk slot game.',
      image: 'https://picsum.photos/seed/cyber_city/1920/1080',
      images: [
        'https://picsum.photos/seed/neon_street/1920/1440',
        'https://picsum.photos/seed/cyber_night/1920/1080',
      ],
      slug: 'neon-cyber-city',
      tools: ['Blender', 'Photoshop'],
      role: 'Environment Artist',
      description:
        'Created a highly detailed, multi-layered cyberpunk city background with parallax effects in mind. The goal was to create a dark, atmospheric sci-fi world with contrasting neon lights.',
    },
    {
      id: '3',
      title: "Dragon's Horde",
      category: 'Characters',
      shortDescription: 'Character design and symbol art for a fantasy dragon slot.',
      image: 'https://picsum.photos/seed/fantasy_dragon/1920/1080',
      images: [
        'https://picsum.photos/seed/dragon_eye/1920/1440',
        'https://picsum.photos/seed/dragon_treasure/1920/1080',
        'https://picsum.photos/seed/fire_breath/1920/1080',
      ],
      slug: 'dragons-horde',
      tools: ['ZBrush', 'Substance Painter', 'Photoshop'],
      role: 'Character Artist',
      description:
        'Sculpted and painted the main dragon character used as the expanding wild symbol. Rendered cinematic sequences for big win animations.',
    },
    {
      id: '4',
      title: "Leprechaun's Luck",
      category: 'Game Art',
      shortDescription: 'Classic Irish-themed slot game assets.',
      image: 'https://picsum.photos/seed/clover_gold/1920/1080',
      images: [
        'https://picsum.photos/seed/irish_hills/1920/1440',
        'https://picsum.photos/seed/pot_of_gold/1920/1080',
      ],
      slug: 'leprechaun-luck',
      tools: ['Photoshop', 'Illustrator'],
      role: '2D Artist',
      description:
        'A vibrant, colorful take on the classic Irish theme. Designed all symbols, background, and UI elements to be clear and appealing on mobile devices.',
    },
    {
      id: '5',
      title: 'Mystic Forest',
      category: 'Environment',
      shortDescription: 'Lush, magical forest background with animated flora.',
      image: 'https://picsum.photos/seed/magic_forest/1920/1080',
      images: [
        'https://picsum.photos/seed/glowing_plants/1920/1440',
        'https://picsum.photos/seed/ethereal_woods/1920/1080',
      ],
      slug: 'mystic-forest',
      tools: ['Photoshop', 'After Effects'],
      role: 'Concept Artist & Animator',
      description:
        'Developed the visual style for a relaxing, magical forest-themed slot. Animated glowing plants and fireflies for the idle state.',
    },
    {
      id: '6',
      title: 'Viking Conquest',
      category: 'Characters',
      shortDescription: 'Fierce Viking characters for a high-volatility game.',
      image: 'https://picsum.photos/seed/viking_warrior/1920/1080',
      images: [
        'https://picsum.photos/seed/viking_ship/1920/1440',
        'https://picsum.photos/seed/norse_god/1920/1080',
        'https://picsum.photos/seed/battle_axe/1920/1080',
      ],
      slug: 'viking-conquest',
      tools: ['ZBrush', 'Photoshop'],
      role: 'Senior Character Artist',
      description:
        'Designed three distinct Viking characters representing different bonus features. Focused on gritty, realistic textures and cinematic lighting.',
    },
  ],
  blogPosts: [
    {
      id: '1',
      title: 'Mastering Slot Symbol Clarity on Mobile Devices',
      category: 'Tutorials',
      date: 'Oct 15, 2026',
      excerpt:
        'Learn the techniques I use to ensure that highly detailed symbols remain readable and impactful on small smartphone screens.',
      image: 'https://picsum.photos/seed/design_workspace/800/500',
      slug: 'slot-symbol-clarity',
    },
    {
      id: '2',
      title: "From Concept to Final Render: Dragon's Horde",
      category: 'Case Studies',
      date: 'Oct 08, 2026',
      excerpt:
        'A deep dive into the 3D workflow for creating the main character of Dragon\'s Horde, including sculpting, retopology, and rendering.',
      image: 'https://picsum.photos/seed/3d_sculpt/800/500',
      slug: 'concept-to-render-dragon',
    },
    {
      id: '3',
      title: 'The Future of Art Direction in Casino Games',
      category: 'Industry Insights',
      date: 'Oct 01, 2026',
      excerpt:
        'Exploring the shift towards cinematic, narrative-driven experiences in the slot game industry and what it means for artists.',
      image: 'https://picsum.photos/seed/art_direction/800/500',
      slug: 'future-art-direction-casino',
    },
  ],
  publish: {
    isPublished: false,
    lastSaved: null,
  },
};

export function loadSavedSiteData(): SiteData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteData;
  } catch {
    return null;
  }
}

export function saveSiteData(data: SiteData) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
