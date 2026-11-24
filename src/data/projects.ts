import jobscater from "../img/jobscater.jpg";
import dubaiApproval from "../img/dubaiapprovals.png";
import pizzaWorld from "../img/pizza-world.png";
import vatsalya from "../img/vatsalya.png";
import erc from "../img/erc.png";
import aakar from "../img/aakar.png";
import travelNepal from "../img/travel-nepal.png";
import SNBConsultancy from "../img/consultancy.png";
import pokharauae from "../img/pokharauae.png";
import gladstone from "../img/galdstone.jpg";
import shine from "../img/shine.jpg";
import kbfeltnwool from "../img/kbfeltnwool.jpg";

export type CaseStudy = {
  problem: string;
  solution: string;
  result: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  /** One-line problem → solution for cards */
  summary: string;
  tech: string[];
  img: string;
  link: string;
  /** TODO: add real repo URL when public */
  github?: string;
  featured?: boolean;
  caseStudy?: CaseStudy;
  highlight?: boolean;
};

export const projectsData: Project[] = [
  {
    id: 12,
    slug: "jobscater",
    title: "Jobscater",
    category: "Job portal",
    description:
      "Job listings, resume upload, company profiles, alerts, live chat, interview scheduling, and a CV builder.",
    summary:
      "Job portal with listings, chat, scheduling, and role-based access—built in Next.js and TypeScript.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "RTK Query",
      "Socket.io",
      "Formik",
      "Vitest",
    ],
    img: jobscater,
    link: "https://www.jobscater.com/",
    github: undefined, // TODO: add GitHub URL if public
    featured: true,
    highlight: true,
    caseStudy: {
      problem:
        "Finding a role and applying took too many steps, and the old layout made listings hard to skim.",
      solution:
        "I built the product in Next.js with TypeScript—search, profiles, alerts, chat, and scheduling in one place.",
      result:
        "The live site covers the full hiring flow, from listing to interview calendar.",
    },
  },
  {
    id: 7,
    slug: "dubai-approvals",
    title: "Dubai Approvals",
    category: "Business",
    description:
      "Business site with appointments, services, blogs, join-us pages, and SEO-focused pages.",
    summary:
      "Service and appointment site with motion and SEO, using Next.js and RTK Query.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "RTK Query",
      "Formik",
    ],
    img: dubaiApproval,
    link: "https://www.dubaiapprovals.com/",
    featured: true,
    highlight: true,
    caseStudy: {
      problem:
        "People landed on the site and weren’t sure which service matched their case or how to reach the team.",
      solution:
        "I structured services, appointments, and contact flows in Next.js with clear CTAs.",
      result:
        "Visitors can find a service and book or inquire without guessing.",
    },
  },
  {
    id: 11,
    slug: "pizza-world",
    title: "Pizza World",
    category: "E-commerce",
    description:
      "Online ordering with wishlist, cart, store locator, reviews, social login, and SEO.",
    summary:
      "Pizza ordering site with cart, wishlist, and store locator in Next.js.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "RTK Query", "Formik"],
    img: pizzaWorld,
    link: "https://www.pizzaworld.com.np/",
    featured: true,
  },
  {
    id: 9,
    slug: "vatsalya",
    title: "Vatsalya",
    category: "Healthcare",
    description:
      "Clinic site with appointments, services, blogs, join-us, and SEO.",
    summary:
      "Healthcare site with appointments and services, plus light motion.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "RTK Query",
      "Framer Motion",
      "Formik",
    ],
    img: vatsalya,
    link: "https://vatsalya.com.np/",
    featured: true,
  },
  {
    id: 8,
    slug: "erc-nepal",
    title: "ERC Nepal",
    category: "Government",
    description:
      "Public commission site with i18n language switcher, services, blogs, PDF viewer, and SEO.",
    summary:
      "Government site with language switcher and PDF viewing for public docs.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "RTK Query",
      "Framer Motion",
      "Formik",
    ],
    img: erc,
    link: "https://erc.gov.np/",
    featured: true,
  },
  {
    id: 10,
    slug: "aakar",
    title: "Aakar",
    category: "Consultancy",
    description:
      "Consultancy site that lists services and makes it easy to contact the team.",
    summary:
      "Gave each service its own space and a simple contact path.",
    tech: ["React", "JavaScript", "CSS"],
    img: aakar,
    link: "https://aakar.com.np/",
    featured: true,
  },
  {
    id: 1,
    slug: "travel-nepal",
    title: "Treavel Nepal",
    category: "Travels",
    description:
      "Travel site for destinations and trip options related to Nepal.",
    summary:
      "Built pages for destinations and trips so travelers can browse what’s on offer.",
    tech: ["React", "JavaScript", "CSS"],
    img: travelNepal,
    link: "https://travelnepal.com.au/",
  },
  {
    id: 2,
    slug: "snb-consultancy",
    title: "SNB Consultancy",
    category: "Consultancy",
    description:
      "Company site with an overview of services and how to get in touch.",
    summary:
      "Simple service pages and contact details for a consultancy brand.",
    tech: ["React", "JavaScript", "CSS"],
    img: SNBConsultancy,
    link: "https://www.snbconsultancy.com.np/",
  },
  {
    id: 4,
    slug: "pokhara-motors",
    title: "Pokhara Motors",
    category: "E-commerce",
    description:
      "Automotive group site for vehicles and company information.",
    summary:
      "Front end for browsing vehicles and company info for the group.",
    tech: ["React", "JavaScript", "CSS"],
    img: pokharauae,
    link: "https://pokharagroup.com/",
  },
  {
    id: 5,
    slug: "gladstone",
    title: "GladStone",
    category: "HRMS",
    description:
      "HR admin for attendance, tasks, password bank, finance, roles, payroll, and leave.",
    summary:
      "HRMS admin with attendance, payroll, leave, and role management.",
    tech: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"],
    img: gladstone,
    link: "https://admin.domehrms.com/login",
    featured: true,
  },
  {
    id: 3,
    slug: "shine-consultancy",
    title: "Shine Consultancy",
    category: "Consultancy",
    description:
      "Education consultancy site covering programs and student guidance.",
    summary:
      "Laid out programs and guidance so students can see options more easily.",
    tech: ["React", "JavaScript", "CSS"],
    img: shine,
    link: "https://www.shineedu.com.np/",
  },
  {
    id: 6,
    slug: "kbfeltnwool",
    title: "kbfeltnwool",
    category: "E-commerce",
    description:
      "Online shop for felt and wool products.",
    summary:
      "Product browsing and storefront pages for a felt and wool shop.",
    tech: ["React", "JavaScript", "CSS"],
    img: kbfeltnwool,
    link: "https://kbfeltnwool.com/",
  },
];

export const featuredProjects = projectsData.filter((p) => p.featured);
export const highlightProjects = projectsData.filter((p) => p.highlight);

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getProjectTags(): string[] {
  return Array.from(new Set(projectsData.map((p) => p.category))).sort();
}
