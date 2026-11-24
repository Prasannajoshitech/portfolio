import { motion, useReducedMotion } from "framer-motion";
import type { Skill } from "../../data/skills";
import { easeOutExpo, fadeUp, viewportOnce } from "../../lib/motion";

type SkillChipProps = {
  skill: Skill;
  large?: boolean;
  delay?: number;
};

export default function SkillChip({
  skill,
  large = false,
  delay = 0,
}: SkillChipProps) {
  const reduced = useReducedMotion();
  const Icon = skill.icon;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp(!!reduced, 12)}
      transition={{ delay }}
      whileHover={
        reduced
          ? undefined
          : { y: -3, transition: { duration: 0.18, ease: easeOutExpo } }
      }
      className={`group inline-flex items-center gap-2 rounded-xl border border-border bg-surface-elevated transition duration-200 hover:border-accent ${
        large ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs sm:text-sm"
      }`}
    >
      <Icon
        className={`text-muted transition group-hover:text-accent ${
          large ? "h-5 w-5" : "h-4 w-4"
        }`}
        aria-hidden
      />
      <span className="font-medium text-ink">{skill.name}</span>
    </motion.div>
  );
}
