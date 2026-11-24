/** Copy + topic groups for the blog index */
export const blogPageCopy = {
  eyebrow: "Blog",
  title: "Things I’ve learned while building",
  description:
    "Short posts on React, TypeScript, performance, and accessibility—based on bugs I’ve hit and choices I’d make again.",
  topicsIntro: "Pick a theme, or search if you already know the topic.",
} as const;

export const blogTopics = [
  {
    id: "react",
    label: "React & TypeScript",
    description: "How I structure components and types so changes hurt less later.",
    matchTags: ["React", "TypeScript", "JavaScript"],
  },
  {
    id: "performance",
    label: "Performance",
    description: "LCP, re-renders, and keeping animations from slowing the page down.",
    matchTags: ["Performance", "Debugging", "Core Web Vitals", "Animation"],
  },
  {
    id: "craft",
    label: "UI & CSS",
    description: "Tailwind habits, forms, a11y, and small design-system pieces.",
    matchTags: ["Tailwind CSS", "Design Systems", "Accessibility", "Forms", "CSS"],
  },
] as const;
