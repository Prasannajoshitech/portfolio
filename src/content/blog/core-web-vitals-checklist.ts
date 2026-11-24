import type { BlogPost } from "./index";

export const coreWebVitalsChecklist: BlogPost = {
  slug: "core-web-vitals-checklist",
  title: "How I Build Performant Frontends: A Core Web Vitals Checklist",
  description: "A hands-on Core Web Vitals checklist covering LCP, INP and CLS, with code for images, fonts, long tasks, bundle splitting and real-user monitoring.",
  excerpt: "A prioritised checklist for LCP, INP and CLS, built from the mistakes I keep seeing: lazy-loaded heroes, unsized images, and long main-thread tasks.",
  coverImage: "/blog/covers/core-web-vitals.svg",
  coverAlt: "Dark cover graphic with the title Core Web Vitals Checklist",
  tags: ["Performance","Core Web Vitals","Web Development","SEO"],
  datePublished: "2026-01-08",
  dateModified: "2026-01-18",
  readingTimeMinutes: 9,
  tldr: "Measure real users with web-vitals, then fix LCP (prioritise the hero, right-size images, cut blocking resources), INP (split long tasks, defer expensive renders, audit third-party scripts) and CLS (reserve space, tune fonts, animate with transform).",
  content: `## Start with the numbers, not the folklore

Performance advice online tends to be a pile of tips with no priority. I use Core Web Vitals as the spine because they map to what users feel, and because Google measures them. The three that matter:

- **LCP (Largest Contentful Paint):** how fast the main content appears. Target under 2.5s.
- **INP (Interaction to Next Paint):** how fast the page responds to input. Target under 200ms.
- **CLS (Cumulative Layout Shift):** how much stuff jumps around. Target under 0.1.

Below is the checklist I walk through on every project, roughly in order of payoff.

## Step 0: Measure real users, not only Lighthouse

Lighthouse is a lab test on one simulated device. Field data from real users is what counts. The \`web-vitals\` library takes a few lines:

\`\`\`ts
import { onCLS, onINP, onLCP } from "web-vitals";

function send(metric: { name: string; value: number; id: string }) {
  navigator.sendBeacon("/analytics", JSON.stringify(metric));
}

onCLS(send);
onINP(send);
onLCP(send);
\`\`\`

Pair it with Chrome's CrUX report or PageSpeed Insights for the field data on your public URL. Fix what the real distribution shows, especially the 75th percentile, since that's what Google evaluates.

## LCP checklist

The LCP element is usually a hero image or a big heading. Find it first (DevTools Performance panel marks it), then remove everything delaying it.

**1. Never lazy-load the LCP image, and prioritise it.**

\`\`\`html
<img
  src="/hero.avif"
  alt="Dashboard preview"
  width="1200"
  height="630"
  fetchpriority="high"
  decoding="async"
/>
\`\`\`

\`loading="lazy"\` on a hero is one of the most common self-inflicted wounds I see.

**2. Serve modern formats at the right size.** AVIF or WebP, with \`srcset\` so a phone doesn't download a 2400px image.

\`\`\`html
<img
  src="/photo-800.webp"
  srcset="/photo-480.webp 480w, /photo-800.webp 800w, /photo-1600.webp 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Team photo"
  width="800"
  height="533"
  loading="lazy"
/>
\`\`\`

**3. Cut render-blocking resources.** Inline critical CSS, defer the rest, and keep third-party scripts out of the head.

**4. Preload what you know you'll need.** Fonts and the hero image are the usual candidates.

\`\`\`html
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preconnect" href="https://api.example.com" crossorigin />
\`\`\`

**5. Reduce server response time.** If TTFB is 1.2s, no frontend tweak will rescue LCP. Use a CDN, cache HTML where you can, and consider static generation for pages that don't need per-request data.

## INP checklist

INP replaced FID, and it's harder to game because it measures every interaction across the visit. It is almost always a JavaScript problem: long tasks blocking the main thread.

**1. Split long tasks.** Anything running over 50ms can delay a tap. Yield to the browser in heavy loops:

\`\`\`ts
async function processInChunks<T>(items: T[], handle: (item: T) => void, chunk = 50) {
  for (let i = 0; i < items.length; i += chunk) {
    items.slice(i, i + chunk).forEach(handle);
    // let the browser handle input and paint
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
\`\`\`

**2. Keep React renders cheap.** Use \`useTransition\` or \`useDeferredValue\` for expensive updates triggered by typing, so the input stays responsive:

\`\`\`tsx
import { useDeferredValue, useState } from "react";

export function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = items.filter((i) => i.includes(deferred));

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultList results={results} />
    </>
  );
}
\`\`\`

**3. Memoise where profiling says so, not by default.** I open React DevTools Profiler first and only add \`memo\` or \`useMemo\` to components that demonstrably re-render too often.

**4. Audit third-party scripts.** Chat widgets, tag managers, and A/B tools are frequent INP culprits. Load them after interaction or idle time, and remove the ones nobody can justify.

**5. Virtualise long lists.** Rendering 5,000 DOM nodes will hurt regardless of how tidy your components are. Use a windowing library like TanStack Virtual.

## CLS checklist

Layout shift is the cheapest category to fix and the most embarrassing to ship.

**1. Always set image and video dimensions** (or \`aspect-ratio\`), so the browser reserves space before the file loads.

\`\`\`css
.card-media {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}
\`\`\`

**2. Reserve space for late content.** Ads, embeds, cookie banners, and async widgets need a fixed-height container or skeleton.

**3. Handle fonts carefully.** Swapping from fallback to web font shifts text. Use \`font-display: swap\` or \`optional\`, preload the key font, and adjust the fallback metrics:

\`\`\`css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-var.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "Inter Fallback";
  src: local("Arial");
  size-adjust: 107%;
  ascent-override: 90%;
}
\`\`\`

**4. Animate with \`transform\`, not layout properties.** Changing \`top\`, \`height\`, or \`margin\` shifts neighbours. \`transform\` doesn't.

**5. Don't inject content above existing content** unless it's a response to user action.

## Bundle and delivery fundamentals

These cut across all three metrics:

- **Analyse the bundle.** Run a visualiser and look for surprises. A single date library or icon pack can double your JS.

\`\`\`bash
npx vite-bundle-visualizer
# or for webpack-based builds
npx source-map-explorer dist/assets/*.js
\`\`\`

- **Code-split by route**, and lazy-load heavy components such as charts and editors:

\`\`\`tsx
import { lazy, Suspense } from "react";

const Chart = lazy(() => import("./Chart"));

export function Report() {
  return (
    <Suspense fallback={<div style={{ height: 320 }} />}>
      <Chart />
    </Suspense>
  );
}
\`\`\`

- **Compress with Brotli** and set long-lived \`Cache-Control\` headers for hashed assets.
- **Import narrowly.** \`import debounce from "lodash/debounce"\` instead of the whole library, or use native alternatives.
- **Drop dependencies** you're using for one function.

## My pre-launch routine

1. Run Lighthouse in an incognito window, mobile profile, throttled.
2. Check the Performance panel for long tasks over 50ms.
3. Test on an actual mid-range Android phone. Your laptop lies.
4. Verify every image has dimensions and the hero is prioritised.
5. Review the network waterfall for anything blocking first paint.
6. Wire up \`web-vitals\` so I see regressions after launch.

## Conclusion

Performance work is mostly the removal of avoidable mistakes: a lazy-loaded hero, an unsized image, a 400KB dependency, a long task on the main thread. Measure with real-user data, fix LCP, INP, and CLS in order of what hurts most, and keep monitoring after launch. Performance is a habit rather than a final sprint.
`,
};
