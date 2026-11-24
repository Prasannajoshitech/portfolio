/**
 * Writes sitemap.xml + rss.xml into public/ (and dist/ after build).
 * Also prerenders route HTML shells into dist/ for crawlable content.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const siteUrl = "https://prasannajoshi.com.np";

const projects = [
  ["jobscater", "Jobscater", "Job portal connecting candidates and employers."],
  ["dubai-approvals", "Dubai Approvals", "Business site for approval and compliance services."],
  ["pizza-world", "Pizza World", "E-commerce experience for pizza orders online."],
  ["vatsalya", "Vatsalya", "Healthcare site with calm, readable clinic information."],
  ["erc-nepal", "ERC Nepal", "Public-facing government website for ERC Nepal."],
  ["aakar", "Aakar", "Consultancy website outlining services and contact."],
  ["travel-nepal", "Treavel Nepal", "Travel site for Nepal destinations and trips."],
  ["snb-consultancy", "SNB Consultancy", "Consultancy presence with service overview."],
  ["pokhara-motors", "Pokhara Motors", "Automotive group site for vehicles and info."],
  ["gladstone", "GladStone", "HRMS admin experience for HR workflows."],
  ["shine-consultancy", "Shine Consultancy", "Education consultancy site for students."],
  ["kbfeltnwool", "kbfeltnwool", "E-commerce storefront for felt and wool products."],
];

/** Keep in sync with src/content/blog — used for static SEO artifacts */
const posts = [
  {
    slug: "debugging-react-rerenders",
    title: "Debugging React Re-renders: A Practical Checklist I Use Before Profiling",
    description:
      "A practical checklist for finding why a React component re-renders: state placement, unstable props, context, keys and effects, before opening the Profiler.",
    date: "2026-03-02",
  },
  {
    slug: "tailwind-design-systems",
    title: "Building a Small Design System with Tailwind Without Overengineering",
    description:
      "A lean Tailwind design system for React: tokens in the theme, a few typed components with variants, and clear rules for when to stop abstracting.",
    date: "2026-02-18",
  },
  {
    slug: "accessible-react-forms",
    title: "Accessible React Forms: Labels, Errors, and Focus That Users Notice",
    description:
      "Build React forms that work with keyboards and screen readers: real labels, linked error messages, focus on submit, and a reusable TypeScript field.",
    date: "2026-02-05",
  },
  {
    slug: "scalable-react-folder-structure",
    title: "Building a Scalable Folder Structure for React Apps",
    description:
      "A practical React folder structure that stays clear as features, teams, and routes grow—without over-engineering day one.",
    date: "2026-01-22",
  },
  {
    slug: "core-web-vitals-checklist",
    title: "How I Build Performant Frontends: A Core Web Vitals Checklist",
    description:
      "A practical Core Web Vitals checklist for LCP, CLS, and INP—habits I use when shipping React frontends that feel fast.",
    date: "2026-01-08",
  },
  {
    slug: "nextjs-vs-vite-choosing",
    title: "Next.js vs Vite: How I Choose for Real Projects",
    description:
      "How I choose between Next.js and Vite for real projects—routing, SEO, hosting, and when a simpler SPA is the right call.",
    date: "2025-12-15",
  },
  {
    slug: "react-typescript-cleaner-components",
    title: "React + TypeScript: Patterns for Cleaner, Safer Components",
    description:
      "TypeScript patterns that keep React components safer and easier to change—props, unions, generics, and avoiding any.",
    date: "2025-11-28",
  },
  {
    slug: "framer-motion-production-patterns",
    title: "Framer Motion in React: Practical Animation Patterns I Use in Production",
    description:
      "Production Framer Motion patterns: fade-up reveals, reduced motion, staggered heroes, and hover polish without hurting LCP.",
    date: "2025-11-12",
  },
];

function writeSitemap(targetDir) {
  const urls = [
    ["/", "1.0"],
    ["/projects", "0.9"],
    ["/blog", "0.9"],
    ["/about", "0.8"],
    ...projects.map(([slug]) => [`/projects/${slug}`, "0.7"]),
    ...posts.map((p) => [`/blog/${p.slug}`, "0.8"]),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([path, priority]) => `  <url>
    <loc>${siteUrl}${path === "/" ? "/" : path}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(join(targetDir, "sitemap.xml"), xml);
}

function writeRss(targetDir) {
  const items = posts
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid>${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Prasanna Joshi — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Practical notes on React, TypeScript, performance, and shipping.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  writeFileSync(join(targetDir, "rss.xml"), rss);
}

function inject(html, { title, description, path, body }) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description.replace(/"/g, "&quot;")}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${siteUrl}${path}" />`,
  );
  out = out.replace(
    /property="og:title"\s+content="[^"]*"/,
    `property="og:title" content="${title.replace(/"/g, "&quot;")}"`,
  );
  out = out.replace(
    /property="og:description"\s+content="[^"]*"/,
    `property="og:description" content="${description.replace(/"/g, "&quot;")}"`,
  );
  out = out.replace(
    /property="og:url"\s+content="[^"]*"/,
    `property="og:url" content="${siteUrl}${path}"`,
  );
  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script/,
    `<div id="root">${body}</div>\n    <script`,
  );
  return out;
}

function prerender(dist) {
  if (!existsSync(join(dist, "index.html"))) {
    console.warn("dist/index.html missing — skip prerender");
    return;
  }
  const template = readFileSync(join(dist, "index.html"), "utf8");

  const routes = [
    {
      path: "/projects",
      title: "Projects | Prasanna",
      description:
        "Browse production React projects across e-commerce, healthcare, government, and consultancy.",
      body: `<main id="main"><h1>All projects</h1><p>Filter by category to explore shipped client and product work.</p></main>`,
    },
    {
      path: "/blog",
      title: "Blog | Prasanna",
      description:
        "Practical writing on React, TypeScript, performance, and shipping frontend products.",
      body: `<main id="main"><h1>Notes from shipping</h1><ul>${posts.map((p) => `<li><a href="${siteUrl}/blog/${p.slug}">${p.title}</a></li>`).join("")}</ul></main>`,
    },
    {
      path: "/about",
      title: "About | Prasanna",
      description:
        "About Prasanna Joshi — frontend developer focused on React, TypeScript, and accessible product UI.",
      body: `<main id="main"><h1>Prasanna Joshi</h1><p>Frontend developer focused on React, TypeScript, and polished UX.</p></main>`,
    },
    ...projects.map(([slug, title, description]) => ({
      path: `/projects/${slug}`,
      title: `${title} | Prasanna`,
      description,
      body: `<main id="main"><article><h1>${title}</h1><p>${description}</p><p><a href="${siteUrl}/projects">All projects</a></p></article></main>`,
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      title: `${p.title} | Prasanna`,
      description: p.description,
      body: `<main id="main"><article><h1>${p.title}</h1><p>${p.description}</p><p><a href="${siteUrl}/blog">All posts</a></p></article></main>`,
    })),
  ];

  for (const route of routes) {
    const dir =
      route.path === "/"
        ? dist
        : join(dist, ...route.path.split("/").filter(Boolean));
    mkdirSync(dir, { recursive: true });
    const file = route.path === "/" ? join(dist, "index.html") : join(dir, "index.html");
    if (route.path !== "/") {
      writeFileSync(
        file,
        inject(template, {
          title: route.title,
          description: route.description,
          path: route.path,
          body: route.body,
        }),
      );
    }
  }

  writeSitemap(dist);
  writeRss(dist);
  console.log(`Prerendered ${routes.length} routes; wrote sitemap + rss`);
}

// Always refresh public SEO files for local/dev
writeSitemap(join(root, "public"));
writeRss(join(root, "public"));

const dist = join(root, "dist");
if (existsSync(dist)) {
  prerender(dist);
  if (existsSync(join(root, "public", "_redirects"))) {
    copyFileSync(join(root, "public", "_redirects"), join(dist, "_redirects"));
  }
} else {
  console.log("Wrote public/sitemap.xml and public/rss.xml (no dist yet)");
}
