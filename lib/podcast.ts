export type YouTubeEpisode = {
  title: string;
  videoId: string;
  published: string;
  url: string;
  guest: string;
  guestTitle: string;
  tags: string[];
};

export const youtubeEpisodes: YouTubeEpisode[] = [
  {
    title: "Building a Billion-Dollar Company With 10 Employees",
    videoId: "-1CdZN-N6ak",
    published: "May 20, 2026",
    url: "https://www.youtube.com/watch?v=-1CdZN-N6ak",
    guest: "Kirsten Karchmer",
    guestTitle: "CEO, Conceivable",
    tags: ["Leadership", "Startups", "Growth"]
  },
  {
    title: "Why In-Person Networking is About to Explode (Again)",
    videoId: "XWjV9m4ZKwA",
    published: "May 6, 2026",
    url: "https://www.youtube.com/watch?v=XWjV9m4ZKwA",
    guest: "Thom Singer",
    guestTitle: "CEO, Austin Technology Council",
    tags: ["Networking", "Community", "AI"]
  },
  {
    title: "AI Is Stealing Your Traffic (And You Can't Track It)",
    videoId: "QBr7ZQzo0RM",
    published: "Apr 22, 2026",
    url: "https://www.youtube.com/watch?v=QBr7ZQzo0RM",
    guest: "Ross Hudgens",
    guestTitle: "CEO, Siege Media",
    tags: ["AI", "Marketing", "SEO"]
  },
  {
    title: "AI Is Breaking Cybersecurity, And Most Companies Aren't Ready",
    videoId: "sCswyg_iSRM",
    published: "Apr 8, 2026",
    url: "https://www.youtube.com/watch?v=sCswyg_iSRM",
    guest: "Yasmin Abdi",
    guestTitle: "CEO, NoHack",
    tags: ["AI", "Cybersecurity", "Risk"]
  },
  {
    title: "How AI Is Changing Hiring",
    videoId: "JUaagFr0aAA",
    published: "Mar 9, 2026",
    url: "https://www.youtube.com/watch?v=JUaagFr0aAA",
    guest: "Prakhar Agrawal",
    guestTitle: "CEO, Senseloaf",
    tags: ["AI", "Hiring", "HR Tech"]
  },
  {
    title: "How AI Is Creating One-Person Teams",
    videoId: "xYB0ZO6W764",
    published: "Mar 6, 2026",
    url: "https://www.youtube.com/watch?v=xYB0ZO6W764",
    guest: "Sagar Babber",
    guestTitle: "CEO, GleanTap",
    tags: ["AI", "Future of Work", "Productivity"]
  }
];

export const spotifyShow = {
  title: "GILD Podcast",
  url: "https://open.spotify.com/show/0TSnQszN4VY8tyOgIYPsQy",
  embedUrl:
    "https://open.spotify.com/embed/show/0TSnQszN4VY8tyOgIYPsQy?utm_source=generator&theme=0",
  description:
    "The GILD Podcast is a focused extension of GILD's private roundtables. Each episode features a senior operator in a candid conversation about how AI is reshaping real companies."
};
