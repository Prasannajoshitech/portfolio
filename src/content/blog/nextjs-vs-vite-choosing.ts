import type { BlogPost } from "./index";

export const nextjsVsViteChoosing: BlogPost = {
  slug: "nextjs-vs-vite-choosing",
  title: "Next.js vs Vite: How I Choose for Real Projects",
  description: "A practical checklist for choosing between Next.js and Vite: SEO, server needs, app type, learning curve, and hosting, with real trade-offs.",
  excerpt: "Next.js and Vite solve different problems. Here is the five-question checklist I run through before starting any new React project.",
  coverImage: "/blog/covers/nextjs-vs-vite.svg",
  coverAlt: "Dark cover graphic with the title Next.js vs Vite",
  tags: ["Next.js","Vite","React","Architecture"],
  datePublished: "2025-12-15",
  dateModified: "2026-01-05",
  readingTimeMinutes: 8,
  tldr: "Pick Next.js for SEO-driven public pages or when you want a backend beside the UI. Pick Vite for interactive apps behind a login where simple static hosting and fast iteration matter more. Keep framework-specific code in a thin layer so switching stays cheap.",
  content: `## The question I get asked most

"Should we use Next.js or just Vite?" The honest answer is that it depends on three or four specific things about the project, and "which is better" is the wrong frame. They solve different problems. Vite is a build tool and dev server. Next.js is a full framework with routing, rendering strategies, and a server runtime. Comparing them directly is like comparing a toolbox to a workshop.

Here is the checklist I actually run through before starting something new.

## Question 1: Does SEO or first-load content matter?

If the page has to be crawled, shared, or found through search, server rendering is the easiest path. Marketing sites, blogs, e-commerce catalogues, and docs all fall here. Next.js gives you SSR, static generation, and incremental regeneration with almost no setup.

A pure client-rendered Vite app ships an empty \`<div id="root">\` and fills it after JavaScript runs. Googlebot does handle that, but social previews, slower crawlers, and users on weak connections all suffer. You can bolt on prerendering, but at that point you're rebuilding a piece of what Next.js already offers.

**My rule:** public, content-driven pages lean Next.js. Authenticated apps behind a login lean Vite.

## Question 2: Do I need a server?

Next.js route handlers and server components let me co-locate a small backend with the frontend: a form handler, a webhook, a token exchange that must keep a secret off the client.

\`\`\`ts
// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await fetch("https://api.example.com/subscribers", {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.EMAIL_API_KEY },
    body: JSON.stringify({ email }),
  });

  return NextResponse.json({ ok: true });
}
\`\`\`

With Vite, there is no server. You would stand up a separate API (Express, Fastify, serverless functions) and deploy it independently. That is perfectly reasonable when you already have a backend team and an existing API. It's overhead when you just need one endpoint.

## Question 3: Is this a dashboard or a document?

Dashboards, editors, internal tools, and anything heavily interactive behind authentication gain very little from server rendering. Users log in once and stay. SEO is irrelevant. What they care about is fast navigation and snappy interactions after the first load.

For those, I choose Vite almost every time:

\`\`\`bash
npm create vite@latest admin-panel -- --template react-ts
cd admin-panel && npm install && npm run dev
\`\`\`

Cold start is nearly instant, hot module replacement is quick, and the mental model is simple: it's a static bundle that talks to an API. You pair it with React Router or TanStack Router and TanStack Query, and you're done.

## Question 4: How much framework do I want to learn and maintain?

This is the question people skip. Next.js makes many decisions for you, and they change. The App Router, server components, caching semantics, and the boundary between server and client code carry a real learning curve. I have debugged "why is this stale?" more times than I'd like.

\`\`\`tsx
// This looks innocent, but it's a Server Component by default.
// Add hooks or browser APIs and you must opt in explicitly.
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

Vite plus React is smaller and more predictable. You own your routing, data fetching, and deployment. More wiring up front, fewer surprises later. For a team that's new to React, that predictability matters.

## Question 5: Where am I deploying?

Next.js runs best on platforms that understand it (Vercel, and increasingly others), and self-hosting is doable but requires you to think about Node servers, image optimization, and caching. A Vite build outputs static files. Drop them on any CDN, S3 bucket, or Netlify, and you're live.

If hosting simplicity or cost control is a hard constraint, static output is a genuinely strong argument.

## A quick decision table

| Situation | My pick |
| --- | --- |
| Marketing site, blog, docs | Next.js (or Astro) |
| E-commerce with SEO needs | Next.js |
| Internal dashboard or admin tool | Vite |
| SaaS app behind login | Vite, or Next.js if you want one repo for API and UI |
| Portfolio with a few pages | Either. Vite plus prerendering is fine |
| Prototype or hackathon | Vite |
| Needs auth, DB access, and API in one deploy | Next.js |

## What I've learned the hard way

- **Don't pick Next.js for resume reasons.** I've seen small internal tools burdened with server-rendering complexity that no user ever benefited from.
- **Don't pick Vite and then reinvent a framework.** If you find yourself hand-rolling SSR, file-based routing, and an image pipeline, you've picked the wrong tool.
- **Migration is easier than people fear.** Components, hooks, and styling carry over. The routing and data-loading layer is what changes. Keep business logic out of route files and the move gets cheaper.
- **Performance depends on what you ship, not the logo.** A bloated Next.js page and a bloated Vite page are equally slow. Both tools can produce excellent Core Web Vitals when you're disciplined about bundle size and images.

## Writing code that survives either choice

I try to keep framework-specific code in a thin layer:

\`\`\`ts
// lib/api/posts.ts: no framework imports
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(import.meta.env.VITE_API_URL + "/posts");
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}
\`\`\`

Pure functions, typed API clients, and presentational components are portable. Route files, loaders, and config are not, so I keep those small.

## Conclusion

Choose Next.js when you need server rendering, SEO, or a backend living next to the UI. Choose Vite when you're building an interactive app where simplicity, speed, and static hosting matter more. Ask what the project needs from a server, not which tool is more popular. The right answer is usually obvious once you do.
`,
};
