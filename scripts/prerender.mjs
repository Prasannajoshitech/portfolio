/**
 * Post-build: emit static HTML shells per route so crawlers get unique
 * title/description/content without a full SSR stack.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const siteUrl = "https://prasannajoshi.com.np";

const projects = [
  {
    slug: "jobscater",
    title: "Jobscater",
    description:
      "Job portal connecting candidates and employers with searchable listings and application flows.",
  },
  {
    slug: "dubai-approvals",
    title: "Dubai Approvals",
    description:
      "Business site for approval and compliance services, focused on clear service paths and inquiry.",
  },
  {
    slug: "pizza-world",
    title: "Pizza World",
    description:
      "E-commerce experience for browsing the menu and placing pizza orders online.",
  },
  {
    slug: "vatsalya",
    title: "Vatsalya",
    description:
      "Healthcare site presenting clinic information and services with a calm, readable layout.",
  },
  {
    slug: "erc-nepal",
    title: "ERC Nepal",
    description:
      "Public-facing government website for the Electricity Regulatory Commission of Nepal.",
  },
  {
    slug: "aakar",
    title: "Aakar",
    description:
      "Consultancy website outlining services and helping visitors get in touch.",
  },
  {
    slug: "travel-nepal",
    title: "Treavel Nepal",
    description:
      "Travel site for exploring destinations and trip offerings related to Nepal.",
  },
  {
    slug: "snb-consultancy",
    title: "SNB Consultancy",
    description:
      "Consultancy presence with service overview and contact pathways.",
  },
  {
    slug: "pokhara-motors",
    title: "Pokhara Motors",
    description:
      "Automotive group site for browsing vehicles and business information.",
  },
  {
    slug: "gladstone",
    title: "GladStone",
    description:
      "HRMS admin experience supporting day-to-day human resources workflows.",
  },
  {
    slug: "shine-consultancy",
    title: "Shine Consultancy",
    description:
      "Education consultancy site covering programs and student guidance.",
  },
  {
    slug: "kbfeltnwool",
    title: "kbfeltnwool",
    description:
      "E-commerce storefront for felt and wool products with product browsing.",
  },
];

const template = readFileSync(join(dist, "index.html"), "utf8");

function inject(html, { title, description, path, body }) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${siteUrl}${path}" />`
  );
  out = out.replace(
    /property="og:title"\s+content="[^"]*"/,
    `property="og:title" content="${title}"`
  );
  out = out.replace(
    /property="og:description"\s+content="[^"]*"/,
    `property="og:description" content="${description}"`
  );
  out = out.replace(
    /property="og:url"\s+content="[^"]*"/,
    `property="og:url" content="${siteUrl}${path}"`
  );
  out = out.replace(
    /name="twitter:title"\s+content="[^"]*"/,
    `name="twitter:title" content="${title}"`
  );
  out = out.replace(
    /name="twitter:description"\s+content="[^"]*"/,
    `name="twitter:description" content="${description}"`
  );
  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script/,
    `<div id="root">${body}</div>\n    <script`
  );
  return out;
}

for (const project of projects) {
  const path = `/projects/${project.slug}`;
  const dir = join(dist, "projects", project.slug);
  mkdirSync(dir, { recursive: true });
  const title = `${project.title} | Prasanna Joshi`;
  const body = `
      <main id="main">
        <article>
          <h1>${project.title}</h1>
          <p>${project.description}</p>
          <p><a href="${siteUrl}/">Back to portfolio</a></p>
        </article>
      </main>`;
  writeFileSync(
    join(dir, "index.html"),
    inject(template, {
      title,
      description: project.description,
      path,
      body,
    })
  );
}

// Ensure redirects still work for client-side routes without a folder
copyFileSync(join(dist, "_redirects"), join(dist, "_redirects"));

console.log(`Prerendered ${projects.length} project pages into dist/`);
