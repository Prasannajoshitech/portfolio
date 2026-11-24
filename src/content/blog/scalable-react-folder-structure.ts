import type { BlogPost } from "./index";

export const scalableReactFolderStructure: BlogPost = {
  slug: "scalable-react-folder-structure",
  title: "Building a Scalable Folder Structure for React Apps",
  description: "A feature-based React folder structure with clear boundaries: public APIs per feature, one-way dependencies, and ESLint rules that enforce them.",
  excerpt: "Organise by feature, not file type. A practical React structure with one-way dependencies, public feature APIs, and lint rules that keep it honest.",
  coverImage: "/blog/covers/react-folder-structure.svg",
  coverAlt: "Dark cover graphic with the title Scalable React Folder Structure",
  tags: ["React","Architecture","Project Structure","Code Quality"],
  datePublished: "2026-01-22",
  dateModified: "2026-01-30",
  readingTimeMinutes: 8,
  tldr: "Group code by feature, keep shared code free of domain knowledge, let dependencies flow app → pages → features → shared, expose each feature through an index.ts, and enforce the boundaries with ESLint instead of relying on discipline.",
  content: `## There is no perfect structure, but there are bad ones

Every React project starts with a tidy \`components/\` folder. Six months later it holds 140 files, three of them named \`Card\`, and nobody knows where to put the new thing. I've inherited that mess and I've created it. What follows is the structure I've settled on after enough painful refactors.

The core idea is simple: **organise by feature, not by file type**, and make dependencies flow in one direction.

## Why organising by type breaks down

The classic layout looks like this:

\`\`\`bash
src/
  components/
  hooks/
  utils/
  services/
  types/
\`\`\`

It feels clean at ten files. At two hundred, one feature (say, billing) is scattered across five folders. Changing it means opening five directories, and deleting it means hunting for orphans. Nothing tells you which pieces belong together or what is safe to change.

## The structure I use

\`\`\`bash
src/
  app/                # app shell: providers, router, global styles
  features/
    auth/
      components/
      hooks/
      api/
      types.ts
      index.ts        # public API of the feature
    billing/
      components/
      hooks/
      api/
      types.ts
      index.ts
    projects/
      ...
  shared/
    ui/               # design-system primitives: Button, Modal, Input
    hooks/            # generic hooks: useDebounce, useMediaQuery
    lib/              # utilities, API client, formatters
    types/
  pages/              # route components, thin composition only
\`\`\`

Each folder has a clear job:

- **\`app/\`** wires everything together: providers, router, error boundaries. It's the only place allowed to know about every feature.
- **\`features/\`** holds domain code. Everything about billing lives in \`features/billing\`.
- **\`shared/\`** holds code with no domain knowledge. If it mentions "invoice" or "project", it doesn't belong here.
- **\`pages/\`** are thin. They compose features and handle route params, nothing more.

## Rule 1: Dependencies flow downward

The layers have an order: \`app\` → \`pages\` → \`features\` → \`shared\`. A layer can import from those beneath it, never above.

- \`shared\` knows nothing about features.
- A feature must not import from \`pages\` or \`app\`.
- **Features should not import from each other's internals.**

That last one is where most codebases rot. When \`projects\` reaches into \`billing/components/PlanBadge\`, you've created a hidden coupling, and now billing can't change without breaking projects.

## Rule 2: Every feature exposes a public API

Use an \`index.ts\` as the front door. Anything not exported is private.

\`\`\`ts
// features/billing/index.ts
export { BillingSummary } from "./components/BillingSummary";
export { useSubscription } from "./hooks/useSubscription";
export type { Plan, Subscription } from "./types";
\`\`\`

\`\`\`tsx
// pages/SettingsPage.tsx
import { BillingSummary } from "@/features/billing";
// not: "@/features/billing/components/internal/InvoiceRow"
\`\`\`

Now you can refactor everything inside \`billing\` freely. The barrel file is the contract.

One caveat: barrel files can hurt tree-shaking and slow down dev servers in huge projects. In a feature-sized barrel exporting a handful of things it's fine. Avoid a single mega-barrel at \`shared/index.ts\` that re-exports hundreds of modules.

## Rule 3: Enforce it with tooling, not willpower

Conventions erode unless a machine checks them. ESLint's \`no-restricted-imports\` or the \`eslint-plugin-boundaries\` package can fail the build when someone breaks the rules.

\`\`\`js
// eslint.config.js (excerpt)
export default [
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message: "Import from the feature's index.ts, not its internals.",
            },
            {
              group: ["@/pages/*", "@/app/*"],
              message: "Features must not depend on pages or app.",
            },
          ],
        },
      ],
    },
  },
];
\`\`\`

Pair that with path aliases so imports stay readable:

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
\`\`\`

No more \`../../../../shared/lib/format\`.

## Rule 4: Colocate until it hurts

Keep tests, styles, and stories next to the code they cover:

\`\`\`bash
features/billing/components/
  BillingSummary/
    BillingSummary.tsx
    BillingSummary.test.tsx
    BillingSummary.module.css
    index.ts
\`\`\`

Colocation means that when you delete a component, its test and styles go with it. I only promote something to \`shared/\` when a second feature genuinely needs it. Not before. Premature sharing creates abstractions with five boolean props trying to serve two unrelated use cases. A bit of duplication is cheaper than the wrong abstraction.

## Where do things go? My quick answers

- **API calls:** \`features/<name>/api\`, wrapped around a typed client in \`shared/lib/api\`.
- **Server state:** TanStack Query hooks inside the feature, e.g. \`useProjects\`.
- **Global UI state** (theme, sidebar): a small store in \`app/\` or \`shared/\`, kept deliberately minimal.
- **Form schemas and validation:** inside the feature that owns the form.
- **Constants and config:** feature-local first, \`shared/lib\` if truly generic.
- **Types:** next to the code using them. Avoid a giant global \`types/\` folder.

A typical feature hook ends up like this:

\`\`\`ts
// features/projects/hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/fetchProjects";

export function useProjects(workspaceId: string) {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => fetchProjects(workspaceId),
  });
}
\`\`\`

## Starting small and evolving

Don't build all of this on day one. For a small app, a flat \`components/\` and \`pages/\` is fine. My rough triggers for adding structure:

1. **More than ~15 components:** introduce \`features/\` for the biggest domains.
2. **Two features need the same thing:** extract to \`shared/\`.
3. **Imports start tangling:** add lint boundaries.
4. **Build or dev server slows noticeably:** audit barrels and consider splitting.

Refactoring the structure is cheap early and miserable late, so move folders the moment the shape feels wrong, while the diff is still small.

## Common mistakes I see

- A \`utils/\` folder that becomes a junk drawer. Name modules by what they do (\`formatCurrency.ts\`), not by a vague category.
- \`shared/\` slowly filling with domain-specific code because it was "reused once."
- Pages containing business logic that can't be reused or tested.
- Circular imports between features, usually a sign that two features are really one.

## Conclusion

A scalable structure comes down to boundaries: group code by feature, keep shared code domain-free, let dependencies flow one way, and expose each feature through a small public API. Back the rules with lint checks so they survive deadlines and new teammates. Start simple, add structure when the pain appears, and the codebase stays easy to navigate as it grows.
`,
};
