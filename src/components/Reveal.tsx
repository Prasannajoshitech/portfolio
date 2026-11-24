import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "section";
  delay?: number;
};

export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = fadeUp(!!reduced);
  const shared = {
    className,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: viewportOnce,
    variants,
    transition: { delay },
  };

  if (as === "li") return <motion.li {...shared}>{children}</motion.li>;
  if (as === "article")
    return <motion.article {...shared}>{children}</motion.article>;
  if (as === "section")
    return <motion.section {...shared}>{children}</motion.section>;
  return <motion.div {...shared}>{children}</motion.div>;
}
