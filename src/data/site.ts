export const siteConfig = {
  name: "Prasanna Joshi",
  shortName: "Prasanna",
  role: "Software Engineer",
  headline: "Software engineer building React & Next.js apps",
  tagline: "Software engineer — React, Next.js, TypeScript.",
  title: "Prasanna | Software Engineer (React, Next.js)",
  description:
    "Software engineer with 2.5+ years building web apps in React and Next.js. Based in Lalitpur, Nepal.",
  url: "https://prasannajoshi.com.np",
  email: "prasannajoshitech@gmail.com",
  phone: "+977 9803513810",
  location: "Lalitpur, Nepal",
  availability: "Open to freelance and full-time roles",
  openToWork: true,
  ogImage: "/og.jpg",
  locale: "en",
  twitterHandle: "",
  links: {
    github: "https://github.com/Prasannajoshitech",
    linkedin: "https://www.linkedin.com/in/prasanna-joshi-tech/",
    twitter: "",
    resume: "/files/Prasanna_resume.pdf",
    website: "https://prasannajoshi.com.np",
    rss: "/rss.xml",
    sitemap: "/sitemap.xml",
  },
  photo: "/src/img/mypic1.jpg",
  photoAlt: "Portrait of Prasanna Joshi",
  currentlyLearning: ["Next.js App Router", "Vitest", "Zustand"],
  currentlyBuilding:
    "Product work at Dome Infosys, plus this portfolio and blog",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Redux Toolkit",
    "React Query",
    "Framer Motion",
  ],
  stats: {
    yearsExperience: 2.5,
    projectsShipped: 8,
    technologies: 16,
  },
  emailjs: {
    serviceId: "service_3c5dlin",
    templateId: "contact_form",
    publicKey: "2V9e2NMlBOtXVjktn",
  },
} as const;

export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export const footerNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export const footerResourceLinks: NavLink[] = [
  { href: "/blog", label: "Latest posts" },
  { href: "/rss.xml", label: "RSS feed" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: siteConfig.links.resume, label: "Resume" },
];

export const valueProps = [
  {
    id: "craft",
    title: "Clear UI",
    description:
      "I keep layouts simple, watch keyboard and contrast basics, and only add motion when it helps—not for show.",
  },
  {
    id: "performance",
    title: "Speed matters",
    description:
      "I check LCP and layout shift early: smaller images, leaner bundles, and less JavaScript on the first paint when I can.",
  },
  {
    id: "product",
    title: "Straight talk",
    description:
      "If a brief is vague, I ask questions, sketch the flow, and leave components that someone else can edit later.",
  },
] as const;
