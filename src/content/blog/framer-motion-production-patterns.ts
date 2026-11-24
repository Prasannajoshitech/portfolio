import type { BlogPost } from "./index";

export const framerMotionProductionPatterns: BlogPost = {
  slug: "framer-motion-production-patterns",
  title: "Framer Motion in React: Practical Animation Patterns I Use in Production",
  description: "Motion tokens, reusable variants, AnimatePresence, layout animations and reduced-motion support: the Framer Motion patterns that hold up in production.",
  excerpt: "The Framer Motion patterns that survived code review and low-end devices: shared motion tokens, reusable variants, layout animations, and global reduced-motion support.",
  coverImage: "/blog/covers/framer-motion.svg",
  coverAlt: "Dark cover graphic with the title Framer Motion in Production",
  tags: ["React","Framer Motion","Animation","Performance","Accessibility"],
  datePublished: "2025-11-12",
  dateModified: "2025-12-02",
  readingTimeMinutes: 9,
  tldr: "Centralise durations and easings as motion tokens, extract reusable variants, use AnimatePresence for exits and the layout prop for reflow, animate only transform and opacity, and switch on reduced-motion support globally with MotionConfig.",
  content: `## Why I constrain animation on purpose

The first time I shipped Framer Motion to production, every component had its own hand-tuned \`transition\` object. Six months later nobody could tell why the card hovered at 0.25s but the modal opened at 0.4s, and half the animations felt subtly off. Animation is design language. If it isn't centralised, it turns into noise.

These are the patterns I now reach for by default. None of them are exotic. They are just the ones that survived code review, QA on low-end Android devices, and a few accessibility audits.

## 1. Define motion tokens once

Treat durations and easings like colour tokens. I keep one small file and import from it everywhere.

\`\`\`ts
// motion/tokens.ts
export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const spring = {
  snappy: { type: "spring", stiffness: 420, damping: 32 },
  soft: { type: "spring", stiffness: 180, damping: 24 },
} as const;
\`\`\`

Now "make it feel snappier" is a one-line change, and designers can reason about the system instead of individual components.

## 2. Reusable variants beat inline props

Inline \`initial\`/\`animate\` props are fine for a one-off. The moment a second component needs the same entrance, extract variants.

\`\`\`tsx
// motion/variants.ts
import type { Variants } from "framer-motion";
import { duration, ease } from "./tokens";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
\`\`\`

Then a list becomes declarative, and children inherit the parent's variant state without you wiring props down:

\`\`\`tsx
import { motion } from "framer-motion";
import { fadeUp, stagger } from "./motion/variants";

export function ProjectList({ projects }: { projects: { id: string; name: string }[] }) {
  return (
    <motion.ul variants={stagger} initial="hidden" animate="visible">
      {projects.map((p) => (
        <motion.li key={p.id} variants={fadeUp}>
          {p.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
\`\`\`

The detail people miss: children only need the variant names to match. No \`custom\` props, no shared state.

## 3. Exit animations need AnimatePresence, and a stable key

React removes unmounted nodes instantly, so exit animations require \`AnimatePresence\`. Two rules I enforce in review:

- The direct child must be a \`motion\` component (or forward the ref) with a unique \`key\`.
- \`AnimatePresence\` itself must stay mounted. Putting it inside the conditional defeats the purpose.

\`\`\`tsx
import { AnimatePresence, motion } from "framer-motion";

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          role="status"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
\`\`\`

For route transitions, I key on the pathname and use \`mode="wait"\`. It is a little slower than overlapping transitions, but it avoids two full pages fighting for layout at the same time.

## 4. Layout animations: the highest value-to-effort ratio

The \`layout\` prop is the feature that justifies the dependency. Reordering a list, expanding a card, toggling a filter: Motion measures before and after, then animates with transforms.

\`\`\`tsx
import { motion } from "framer-motion";
import { useState } from "react";

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout style={{ overflow: "hidden", borderRadius: 12 }}>
      <motion.button layout="position" onClick={() => setOpen((o) => !o)}>
        {title}
      </motion.button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
\`\`\`

Gotchas I have hit repeatedly:

- Border radius and box shadows distort during layout animations unless you set them via \`style\`, not CSS classes, so Motion can correct them.
- Text inside a scaling parent will stretch. Use \`layout="position"\` on children that shouldn't scale.
- Animating \`height: "auto"\` works, but wrap it in \`overflow: hidden\` or you will see content bleed.

## 5. Scroll reveals: trigger once, and don't overdo it

\`whileInView\` replaced my hand-rolled IntersectionObserver hooks.

\`\`\`tsx
<motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
>
  {/* content */}
</motion.section>
\`\`\`

\`once: true\` is non-negotiable for me. Content that re-animates every time you scroll past it feels like a toy, and it burns battery. The negative bottom margin makes the trigger fire slightly before the element is fully visible, which avoids the awkward moment where a user sees empty space.

If every section on a page fades up, nothing stands out. I pick one or two hero moments and leave the rest static.

## 6. Respect reduced motion, globally

This is the pattern I'd retrofit first on any existing codebase. \`MotionConfig\` can switch off transform animations for everyone who has asked for it, from a single place.

\`\`\`tsx
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
\`\`\`

With \`reducedMotion="user"\`, transform and layout animations are disabled while opacity and colour changes still run. For anything where motion carries meaning, such as a parallax hero, branch explicitly with \`useReducedMotion()\`.

## 7. Performance rules I actually follow

1. **Animate \`transform\` and \`opacity\` only.** Animating \`width\`, \`top\`, or \`box-shadow\` triggers layout or paint on every frame. Use \`layout\` or \`scale\` instead.
2. **Use \`LazyMotion\` for bundle size.** The full \`motion\` component pulls in every feature. Load only what you need:

\`\`\`tsx
import { LazyMotion, domAnimation, m } from "framer-motion";

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} />
    </LazyMotion>
  );
}
\`\`\`

\`strict\` throws if someone accidentally imports \`motion\` instead of \`m\`, which keeps the savings from quietly eroding.

3. **Use motion values for continuous input.** \`useMotionValue\` plus \`useTransform\` update the DOM without re-rendering React. Storing pointer position in \`useState\` is the classic way to turn a smooth effect into a stuttering one.
4. **Profile on a throttled CPU.** Chrome DevTools at 4x slowdown reveals which animations are only smooth on your machine.

## Things I avoid

- Springs on large surfaces. Bouncy modals look playful in a demo and tiring in a product.
- Animating on first paint above the fold. It delays Largest Contentful Paint for no benefit; I render the hero statically and animate secondary elements.
- Long staggers. Past roughly 8 items, a stagger becomes a wait. Cap the delay.

## Conclusion

Good production animation is mostly restraint plus consistency: shared tokens, a handful of reusable variants, \`AnimatePresence\` for exits, \`layout\` where it saves real effort, and a global reduced-motion switch. Do that, keep to transform and opacity, and Framer Motion stays an asset rather than a performance liability.
`,
};
