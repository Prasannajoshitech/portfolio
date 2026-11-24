export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experienceData: ExperienceItem[] = [
  {
    id: "dome",
    role: "Software Engineer",
    company: "Dome Infosys",
    period: "Jun 2024 — Present",
    bullets: [
      "Building and shipping web apps with React, Next.js, and TypeScript.",
      "Working on features that need clean UI, API integration, and maintainable code.",
      "Collaborating with the team on product work used by real users.",
    ],
  },
  {
    id: "kitwosd",
    role: "Associate Software Engineer",
    company: "Kitwosd IT Support Center",
    period: "Apr 2023 — May 2024",
    bullets: [
      "Built and maintained React front ends for client projects.",
      "Used Tailwind, TypeScript, and API tooling day to day.",
      "Learned how to take a feature from ticket to a working screen in production.",
    ],
  },
];
