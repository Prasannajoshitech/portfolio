import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition: Transition = {
  duration: 0.5,
  ease: easeOutExpo,
};

export const fastTransition: Transition = {
  duration: 0.2,
  ease: easeOutExpo,
};

export const fadeUp = (reduced = false, y = 16): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : y },
  visible: { opacity: 1, y: 0, transition },
});

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: easeOutExpo } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeOutExpo } },
};

export const stagger = (
  reduced = false,
  staggerChildren = 0.08,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren: reduced ? 0 : 0.04,
    },
  },
});

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
};
