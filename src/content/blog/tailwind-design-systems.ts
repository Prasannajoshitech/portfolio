import type { BlogPost } from "./index";

export const tailwindDesignSystems: BlogPost = {
  slug: "tailwind-design-systems",
  title: "Building a Small Design System with Tailwind Without Overengineering",
  description: "A lean Tailwind design system for React: tokens in the theme, a few typed components with variants, and clear rules for when to stop abstracting.",
  excerpt: "You don't need Storybook and forty components. Tokens in the Tailwind theme, a handful of variant-driven primitives, and some firm rules are enough.",
  coverImage: "/blog/covers/tailwind-design-systems.svg",
  coverAlt: "Dark cover graphic with the title Small Design Systems with Tailwind",
  tags: ["Tailwind CSS", "Design Systems", "React", "CSS"],
  datePublished: "2026-02-18",
  dateModified: "2026-03-10",
  readingTimeMinutes: 8,
  tldr: "Put colours, radii and spacing intent in tailwind.config as tokens, build five or six primitives with typed variants (cva plus tailwind-merge), keep everything else as plain utilities, and only extract a component after the third repeat.",
  content: `## Most projects need a design system of about eight files

"Design system" tends to conjure a token pipeline, a documentation site and a dedicated team. On a client site or a product with one to four developers, that's overkill. What you actually need is consistency: the same blue everywhere, the same button in every form, and a way for the next developer to add a screen without inventing new spacing.

Tailwind gets you most of the way there already. The trick is deciding what to add on top, and what to refuse to add.

## Step 1: Put decisions in the theme, not in class strings

The first mistake is scattering raw values through markup: \`bg-[#4f46e5]\`, \`rounded-[10px]\`, \`mt-[22px]\`. Each one is a design decision made in a place nobody will look later.

Move decisions into \`tailwind.config\` and name them by purpose, not by value.

\`\`\`js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          subtle: "#eef2ff",
        },
        surface: "#ffffff",
        "surface-muted": "#f8fafc",
        ink: "#0f172a",
        "ink-muted": "#475569",
        danger: "#dc2626",
      },
      borderRadius: {
        control: "0.625rem",
        card: "1rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.06)",
      },
    },
  },
};
\`\`\`

Now \`bg-brand\` and \`rounded-control\` read as intent. Rebranding is a config change, not a find-and-replace across two hundred files. I keep the palette small: one brand colour with hover and subtle variants, two or three neutrals, and semantic colours for danger and success. If you catch yourself adding a ninth shade of grey, the answer is probably an existing one.

## Step 2: Make dark mode a variable swap

If you need themes, don't write \`dark:\` variants on every element. Define tokens as CSS variables and let the theme switch the values.

\`\`\`css
:root {
  --surface: 255 255 255;
  --ink: 15 23 42;
  --brand: 79 70 229;
}

.dark {
  --surface: 11 13 18;
  --ink: 248 250 252;
  --brand: 129 140 248;
}
\`\`\`

\`\`\`js
// tailwind.config.js
colors: {
  surface: "rgb(var(--surface) / <alpha-value>)",
  ink: "rgb(var(--ink) / <alpha-value>)",
  brand: "rgb(var(--brand) / <alpha-value>)",
}
\`\`\`

\`bg-surface text-ink\` now works in both themes with no \`dark:\` prefix, and opacity modifiers like \`bg-brand/10\` still work thanks to the \`<alpha-value>\` placeholder. Keep explicit \`dark:\` for the rare one-off.

## Step 3: Build a few primitives with typed variants

Utilities in markup are fine until the same twelve classes appear in nine places. That's when a component earns its existence. I reach for \`class-variance-authority\` (cva) for variants and \`tailwind-merge\` so callers can override without conflicts.

\`\`\`ts
// src/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\`\`\`

\`\`\`tsx
// src/components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-hover",
        secondary: "bg-surface-muted text-ink hover:bg-brand-subtle",
        ghost: "text-ink-muted hover:bg-surface-muted hover:text-ink",
        danger: "bg-danger text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props} />
  );
}
\`\`\`

\`VariantProps\` gives you autocomplete and compile-time errors: \`<Button variant="primry">\` fails the build. \`twMerge\` means \`<Button className="px-8">\` replaces \`px-4\` instead of fighting it by stylesheet order.

Notice what's baked in: a visible focus ring, disabled styling and consistent height. The primitive carries accessibility and polish so callers can't forget them.

## Step 4: Decide what is a primitive and what isn't

This is where over-engineering creeps in. My working list for most projects:

- **Button**, **Input/Field**, **Card**, **Badge**, **Container/Section**, **Heading**.
- Maybe **Dialog** and **Tabs**, but I use Radix primitives underneath rather than writing focus traps myself.

Everything else stays as utilities in the page or feature component. A pricing table is not a design-system component; it's a feature that uses design-system components.

My extraction rule is simple: **copy once, extract on the third repeat.** Two similar blocks might diverge; three is a pattern. Extracting too early produces components with eight boolean props, each added because one caller needed it.

\`\`\`tsx
// Smell: a component that is really a conditional maze
<Card hasHeader hasFooter compact bordered elevated headerAlign="left" />

// Better: composition
<Card>
  <Card.Header>Plan</Card.Header>
  <Card.Body>...</Card.Body>
</Card>
\`\`\`

When a prop list starts to grow, switch to composition or let callers pass \`className\` and children.

## Step 5: Avoid the traps

A few things I've learnt to avoid:

**Don't use \`@apply\` for everything.** It reproduces the CSS-file problem Tailwind was designed to remove, and hides what a class does. I use it for third-party markup I can't add classes to, such as rendered markdown, and nowhere else.

**Don't build dynamic class names.** Tailwind scans source text, so this breaks in production:

\`\`\`tsx
// Won't generate the class
<div className={"bg-" + color + "-500"} />

// Map to complete strings instead
const tone = { info: "bg-brand-subtle", error: "bg-red-50" } as const;
<div className={tone[kind]} />
\`\`\`

**Don't wrap every HTML element.** A \`<Div>\` or \`<Text>\` component adds an import to every file and removes nothing.

**Don't duplicate tokens in JavaScript.** If animation code needs the brand colour, read the CSS variable instead of hard-coding the hex a second time.

## Step 6: Document with the code, not around it

You don't need Storybook on day one. A single \`/design\` route in the app that renders every variant of every primitive is a visual regression check you can open in a second, and it's a page new developers can copy from.

\`\`\`tsx
export function DesignPage() {
  return (
    <main className="space-y-8 p-8">
      {(["primary", "secondary", "ghost", "danger"] as const).map((variant) => (
        <div key={variant} className="flex gap-3">
          <Button variant={variant} size="sm">Small</Button>
          <Button variant={variant}>Default</Button>
          <Button variant={variant} disabled>Disabled</Button>
        </div>
      ))}
    </main>
  );
}
\`\`\`

Add a short README listing the tokens, the primitives and the extraction rule. That's about a page. If the team grows and the page stops being enough, that's the moment to reach for Storybook, not before.

## Conclusion

A small Tailwind design system is three things: named tokens in the theme, a handful of typed primitives built with \`cva\` and \`tailwind-merge\`, and discipline about everything else. Keep decisions out of class strings, extract on the third repeat, prefer composition over boolean props, and resist the urge to wrap what doesn't need wrapping. You'll get most of the consistency of a full design system at a fraction of the maintenance.`,
};
