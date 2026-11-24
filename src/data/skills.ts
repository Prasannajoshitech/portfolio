import type { IconType } from "react-icons";
import {
  SiCss3,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiReactquery,
  SiRedux,
  SiRadixui,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
} from "react-icons/si";
import { LuBoxes } from "react-icons/lu";

export type Skill = {
  id: string;
  name: string;
  icon: IconType;
  core?: boolean;
};

export type SkillGroup = {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
};

export const coreStackIds = [
  "react",
  "nextjs",
  "typescript",
  "tailwind",
  "react-query",
  "redux",
] as const;

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "What I use most for UI and app logic.",
    skills: [
      { id: "react", name: "React", icon: SiReact, core: true },
      { id: "nextjs", name: "Next.js", icon: SiNextdotjs, core: true },
      { id: "typescript", name: "TypeScript", icon: SiTypescript, core: true },
      { id: "javascript", name: "JavaScript", icon: SiJavascript },
      { id: "html", name: "HTML", icon: SiHtml5 },
      { id: "css", name: "CSS", icon: SiCss3 },
      { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, core: true },
      { id: "mui", name: "MUI", icon: SiMui },
      { id: "shadcn", name: "shadcn/ui", icon: SiRadixui },
    ],
  },
  {
    id: "state",
    label: "Data & state",
    description: "Fetching, caching, and client state on real products.",
    skills: [
      { id: "react-query", name: "React Query", icon: SiReactquery, core: true },
      { id: "redux", name: "RTK / RTK Query", icon: SiRedux, core: true },
      { id: "zustand", name: "Zustand", icon: LuBoxes },
      { id: "mongodb", name: "MongoDB", icon: SiMongodb },
      { id: "nodejs", name: "Node.js", icon: SiNodedotjs },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    description: "Design, motion, tests, and day-to-day workflow.",
    skills: [
      { id: "figma", name: "Figma", icon: SiFigma },
      { id: "framer", name: "Framer Motion", icon: SiFramer },
      { id: "vitest", name: "Vitest", icon: SiVitest },
      { id: "git", name: "Git", icon: SiGit },
      { id: "github", name: "GitHub", icon: SiGithub },
      { id: "vite", name: "Vite", icon: SiVite },
      { id: "postman", name: "Postman", icon: SiPostman },
    ],
  },
  {
    id: "learning",
    label: "Currently learning",
    description: "Things I’m sharpening on the side of shipping work.",
    skills: [
      { id: "nextjs-learn", name: "Next.js App Router", icon: SiNextdotjs },
      { id: "vitest-learn", name: "Vitest", icon: SiVitest },
      { id: "zustand-learn", name: "Zustand", icon: LuBoxes },
    ],
  },
];

export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills);

export const coreStack: Skill[] = coreStackIds
  .map((id) => allSkills.find((s) => s.id === id))
  .filter((s): s is Skill => Boolean(s));
