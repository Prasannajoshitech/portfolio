export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description, under 160 characters */
  description: string;
  /** 1-2 sentences for cards */
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  /** ISO date */
  datePublished: string;
  dateModified: string;
  readingTimeMinutes: number;
  tldr: string;
  /** Markdown body without the title h1 (h2/h3 only) */
  content: string;
};

import { framerMotionProductionPatterns } from "./framer-motion-production-patterns";
import { reactTypescriptCleanerComponents } from "./react-typescript-cleaner-components";
import { nextjsVsViteChoosing } from "./nextjs-vs-vite-choosing";
import { coreWebVitalsChecklist } from "./core-web-vitals-checklist";
import { scalableReactFolderStructure } from "./scalable-react-folder-structure";
import { accessibleReactForms } from "./accessible-react-forms";
import { tailwindDesignSystems } from "./tailwind-design-systems";
import { debuggingReactRerenders } from "./debugging-react-rerenders";

export const blogPosts: BlogPost[] = [
  debuggingReactRerenders,
  tailwindDesignSystems,
  accessibleReactForms,
  framerMotionProductionPatterns,
  reactTypescriptCleanerComponents,
  nextjsVsViteChoosing,
  coreWebVitalsChecklist,
  scalableReactFolderStructure,
].sort(
  (a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Related posts ranked by number of shared tags, then by recency.
 * Falls back to the most recent posts when nothing overlaps.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const others = blogPosts.filter((post) => post.slug !== slug);
  const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));

  const scored = others.map((post) => ({
    post,
    score: post.tags.filter((t) => currentTags.has(t.toLowerCase())).length,
  }));

  // blogPosts is already newest-first and Array#sort is stable,
  // so ties keep recency order.
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.post);
}

export function getAllTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort(
    (a, b) => a.localeCompare(b),
  );
}
