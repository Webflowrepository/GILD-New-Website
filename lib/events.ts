export type ForumEvent = {
  date: string;
  meta: string;
  title: string;
  location: string;
  locationFull: string;
  status: string;
  url: string;
  coverUrl: string;
  cardColor: string;
  borderColor: string;
  description: string;
  isNextUp?: boolean;
};

export const forumEvents: ForumEvent[] = [
  {
    date: "Jun 16",
    meta: "6:00 PM - 8:30 PM CT",
    title: "Dallas GILD AI Forum x Tecla: AI and Engineering Leaders Dinner",
    location: "Dallas, TX",
    locationFull: "Dallas, Texas",
    status: "Open",
    url: "https://luma.com/Gild21",
    coverUrl:
      "https://images.lumacdn.com/uploads/2t/61a03d61-e487-4769-94b8-b2c303502d73.png",
    cardColor: "#070D1B",
    borderColor: "#263B68",
    description:
      "This GILD AI Forum brings together CTOs, VPs of Engineering, Heads of AI, and senior technical leaders for candid off-the-record conversation.",
    isNextUp: true,
  },
  {
    date: "Jul 14",
    meta: "6:00 PM - 8:30 PM CT",
    title: "Austin GILD AI Forum x Tecla: AI and Engineering Leaders Dinner",
    location: "Austin, TX",
    locationFull: "Austin, Texas",
    status: "Open",
    url: "https://luma.com/GILD23",
    coverUrl:
      "https://images.lumacdn.com/uploads/dp/6aec0330-430d-4922-a153-54eac40f5321.png",
    cardColor: "#0E0504",
    borderColor: "#3B1C18",
    description:
      "The Austin GILD AI Forum brings together senior AI and engineering leaders for candid conversations about what's actually working.",
  },
  {
    date: "Jul 21",
    meta: "6:00 PM - 8:30 PM ET",
    title: "Miami GILD AI Forum x Tecla: AI and Engineering Leaders Dinner",
    location: "Miami, FL",
    locationFull: "Miami, Florida",
    status: "Open",
    url: "https://luma.com/Gild25",
    coverUrl:
      "https://images.lumacdn.com/uploads/ye/49f6b5ba-fde9-4cb0-9cdb-8303d7224ae2.png",
    cardColor: "#080E1C",
    borderColor: "#203052",
    description:
      "This GILD AI Forum brings together CTOs, VPs of Engineering, Heads of AI, and senior technical leaders for candid off-the-record conversation.",
  },
  {
    date: "Aug 11",
    meta: "6:00 PM - 8:30 PM CT",
    title: "Austin GILD AI Forum x Tecla: AI and Engineering Leaders Dinner",
    location: "Austin, TX",
    locationFull: "Austin, Texas",
    status: "Open",
    url: "https://luma.com/GILD24",
    coverUrl:
      "https://images.lumacdn.com/uploads/dp/6aec0330-430d-4922-a153-54eac40f5321.png",
    cardColor: "#0E0504",
    borderColor: "#3B1C18",
    description:
      "The Austin GILD AI Forum brings together senior AI and engineering leaders for candid conversations about what's actually working.",
  },
];
