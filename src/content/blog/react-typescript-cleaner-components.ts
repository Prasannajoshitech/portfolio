import type { BlogPost } from "./index";

export const reactTypescriptCleanerComponents: BlogPost = {
  slug: "react-typescript-cleaner-components",
  title: "React + TypeScript: Patterns for Cleaner, Safer Components",
  description: "Practical React + TypeScript patterns: native prop inheritance, discriminated unions, generic components, satisfies, and boundary validation with Zod.",
  excerpt: "Loose types are the real source of messy React code. These patterns make invalid states unrepresentable and components harder to misuse.",
  coverImage: "/blog/covers/react-typescript.svg",
  coverAlt: "Dark cover graphic with the title React and TypeScript Patterns",
  tags: ["React","TypeScript","Patterns","Code Quality"],
  datePublished: "2025-11-28",
  dateModified: "2025-12-20",
  readingTimeMinutes: 8,
  tldr: "Inherit native element props, model state with discriminated unions, make list-like components generic, prefer as const and satisfies over enums and annotations, and validate external data once at the boundary instead of trusting casts.",
  content: `## The problem isn't TypeScript, it's how we type components

Most of the messy React + TypeScript code I review isn't wrong, it's loose. Props typed as \`any\` "for now", optional flags that combine into impossible states, \`as\` casts sprinkled around to quiet the compiler. TypeScript only pays off when the types describe what is actually valid.

Here are the patterns I use to make components harder to misuse.

## 1. Extend native element props instead of re-declaring them

If your \`Button\` wraps a \`<button>\`, don't re-type \`onClick\`, \`disabled\`, and \`type\` one by one. Inherit them.

\`\`\`tsx
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "ghost";
  loading?: boolean;
};

export function Button({ variant = "primary", loading, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading}
      data-variant={variant}
    >
      {children}
    </button>
  );
}
\`\`\`

Consumers get \`aria-*\`, \`form\`, \`onKeyDown\` and everything else for free. Use \`ComponentPropsWithoutRef\` rather than \`ComponentProps\` unless you are forwarding a ref, otherwise \`ref\` leaks into your props type in confusing ways.

## 2. Discriminated unions kill impossible states

The most valuable habit I picked up: stop modelling state with independent booleans.

\`\`\`tsx
// Before: 8 possible combinations, 3 of them meaningful
type Props = {
  isLoading?: boolean;
  error?: Error;
  data?: User[];
};
\`\`\`

\`\`\`tsx
// After: each state carries exactly what it needs
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: T };

function UserList({ state }: { state: AsyncState<User[]> }) {
  switch (state.status) {
    case "idle":
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage error={state.error} />;
    case "success":
      return <ul>{state.data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
  }
}
\`\`\`

Inside each branch TypeScript narrows the type, so \`state.data\` is only accessible when it exists. Add a new status later and the switch stops compiling until you handle it.

The same technique works for props. A component that takes either \`href\` or \`onClick\`, but never both, should say so:

\`\`\`tsx
type ActionProps =
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never };
\`\`\`

## 3. Generic components for lists and selects

If a component renders arbitrary data, make it generic so callers keep their types.

\`\`\`tsx
type SelectProps<T> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getKey: (option: T) => string;
  getLabel: (option: T) => string;
};

export function Select<T>({ options, value, onChange, getKey, getLabel }: SelectProps<T>) {
  return (
    <select
      value={getKey(value)}
      onChange={(e) => {
        const next = options.find((o) => getKey(o) === e.target.value);
        if (next) onChange(next);
      }}
    >
      {options.map((o) => (
        <option key={getKey(o)} value={getKey(o)}>
          {getLabel(o)}
        </option>
      ))}
    </select>
  );
}
\`\`\`

\`onChange\` receives a \`Country\`, not a \`string\` you must look up again. One note: in \`.tsx\` files an arrow-function generic needs a trailing comma (\`<T,>\`) to avoid being parsed as JSX. A plain function declaration sidesteps that.

## 4. Prefer \`as const\` objects over enums

I stopped using \`enum\` in application code. A const object plus a derived union is lighter, tree-shakeable, and plays nicely with string literals coming from APIs.

\`\`\`ts
export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
\`\`\`

One source of truth drives the type, the runtime validation, and any dropdown that lists the roles.

## 5. Use \`satisfies\` to keep literals narrow

Annotating a config object with a type widens everything to that type. \`satisfies\` checks the shape but preserves the specifics.

\`\`\`ts
type Route = { path: string; auth: boolean };

const routes = {
  home: { path: "/", auth: false },
  dashboard: { path: "/dashboard", auth: true },
} satisfies Record<string, Route>;

routes.dashboard.path; // "/dashboard", not just string
type RouteName = keyof typeof routes; // "home" | "dashboard"
\`\`\`

You get autocomplete on keys and still catch typos in values. This is the cleanest approach I know for route maps, theme tokens, and feature flags.

## 6. Type event handlers by derivation, not memory

Nobody remembers whether it's \`ChangeEvent<HTMLInputElement>\` or \`FormEvent\`. Let inference do it: define the handler inline, or derive the type from the element.

\`\`\`tsx
import type { ComponentProps } from "react";

type InputChange = ComponentProps<"input">["onChange"];

const handleChange: InputChange = (event) => {
  setQuery(event.target.value);
};
\`\`\`

## 7. Validate at the boundary, then trust your types

TypeScript types vanish at runtime. A \`fetch<User>()\` generic is a promise you made to the compiler, not a guarantee. I parse external data once, at the edge, with a schema library like Zod, and infer the types from the schema.

\`\`\`ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(["admin", "editor", "viewer"]),
});

export type User = z.infer<typeof UserSchema>;

export async function getUser(id: string): Promise<User> {
  const res = await fetch("/api/users/" + id);
  return UserSchema.parse(await res.json());
}
\`\`\`

If the API changes, you get a clear error at the boundary instead of an \`undefined is not a function\` three components deep.

## Habits that keep things clean

- **Skip \`React.FC\`.** Plain function components with typed props are simpler and avoid the old implicit-children baggage.
- **Don't export giant prop interfaces "just in case."** Export the component; derive props with \`ComponentProps<typeof Button>\` when someone truly needs them.
- **Turn on \`strict\`** and keep \`noUncheckedIndexedAccess\` in mind for array-heavy code. It's annoying for a week and then saves you.
- **Treat \`as\` as a code smell.** Every cast is a spot where the compiler stops helping. If you need one, leave a comment explaining why it's safe.
- **Avoid \`any\`; reach for \`unknown\`** and narrow it. It forces you to check before you use.

## Conclusion

Cleaner components come from making invalid states unrepresentable: inherit native props, model state with discriminated unions, use generics where data varies, and validate once at the boundary. None of it requires clever type gymnastics. It requires deciding what's valid and letting the compiler hold you to it.
`,
};
