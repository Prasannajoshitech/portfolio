import type { BlogPost } from "./index";

export const debuggingReactRerenders: BlogPost = {
  slug: "debugging-react-rerenders",
  title: "Debugging React Re-renders: A Practical Checklist I Use Before Profiling",
  description: "A practical checklist for finding why a React component re-renders: state placement, unstable props, context, keys and effects, before opening the Profiler.",
  excerpt: "Most slow React screens come from a handful of repeat offenders. Here is the checklist I run through, in order, before reaching for the Profiler.",
  coverImage: "/blog/covers/react-rerenders.svg",
  coverAlt: "Dark cover graphic with the title Debugging React Re-renders",
  tags: ["React", "Performance", "Debugging", "JavaScript"],
  datePublished: "2026-03-02",
  dateModified: "2026-03-23",
  readingTimeMinutes: 9,
  tldr: "A re-render is not a bug by itself. Confirm it's actually slow, then check in order: state that lives too high, new object/function props, context value churn, unstable keys, and effects that set state. Fix placement first, memoize last.",
  content: `## A re-render is not a bug

First, a correction to the common instinct. React re-rendering a component is normal; rendering is cheap when components are small. The goal is not zero re-renders. The goal is that interactions feel fast.

So before debugging anything, confirm there's a problem: typing lags, a list stutters while scrolling, a drag feels sticky. If nothing is noticeably slow, leave it alone. Memoizing preemptively adds code and bugs for no gain.

When something is slow, I run the checklist below in order. It's sorted by how often each item turns out to be the cause, and by how cheap each fix is. Only after it fails do I open the Profiler.

## Step 1: See what is rendering and why

Turn on "Highlight updates when components render" in React DevTools settings. Interact with the page. Anything flashing that shouldn't be is a suspect.

For a quick look at a single component, a render counter is enough:

\`\`\`tsx
import { useRef } from "react";

export function useRenderCount(name: string) {
  const count = useRef(0);
  count.current += 1;
  console.log(name + " rendered " + count.current + " times");
}
\`\`\`

In the Profiler, enable "Record why each component rendered". It tells you whether it was props, state, hooks or the parent. That single setting removes most of the guesswork.

Remember Strict Mode renders twice in development. Count in a production build or divide by two before panicking.

## Step 2: Is state living too high?

This is the most common cause, and the fix is free. If a piece of state changes often, but only one child needs it, every sibling and ancestor is re-rendering for nothing.

\`\`\`tsx
// Typing re-renders the entire page, including the heavy table
function Page() {
  const [query, setQuery] = useState("");
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <HeavyTable />
    </>
  );
}
\`\`\`

Push the state down into the component that owns it:

\`\`\`tsx
function SearchBox() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function Page() {
  return (
    <>
      <SearchBox />
      <HeavyTable />
    </>
  );
}
\`\`\`

If the parent really does need the state, a second trick is to pass the expensive part as \`children\`. Elements created above the stateful component keep the same identity, so React skips them:

\`\`\`tsx
function Dragger({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return <div onPointerMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>{children}</div>;
}

<Dragger>
  <HeavyTable />
</Dragger>
\`\`\`

Both fixes remove renders without a single \`memo\`.

## Step 3: Are props getting new identities every render?

If a child is wrapped in \`React.memo\` and still re-renders, the props are usually the reason. Objects, arrays and functions created inline are new on every render, and memo compares by reference.

\`\`\`tsx
// New object and new function each render, so memo(Row) never helps
<Row style={{ padding: 8 }} onSelect={() => select(item.id)} item={item} />
\`\`\`

Fixes, in order of preference:

\`\`\`tsx
// 1. Hoist constants out of the component
const rowStyle = { padding: 8 };

// 2. Stabilise callbacks that cross a memo boundary
const handleSelect = useCallback((id: string) => select(id), [select]);

// 3. Pass the id and let the child call back with it
<Row style={rowStyle} onSelect={handleSelect} item={item} />
\`\`\`

Here's the catch: \`useCallback\` and \`useMemo\` only matter if something downstream compares by reference, either a \`memo\` component or another hook's dependency array. Wrapping a handler passed to a plain \`<button>\` does nothing useful.

If you're on React 19 with the React Compiler enabled, much of this memoization is automatic, but you still need to understand it to read profiles and to know what the compiler can't fix, like state placed too high.

## Step 4: Is context value churn the cause?

Every consumer of a context re-renders when its value changes by reference. The usual bug:

\`\`\`tsx
// New object every render, so every consumer re-renders whenever Provider re-renders
<AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
\`\`\`

Memoize the value:

\`\`\`tsx
const value = useMemo(() => ({ user, logout }), [user, logout]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
\`\`\`

Better, split contexts by update frequency. Put rarely changing data (theme, user) apart from fast-changing data (cursor position, form draft). A single "AppContext" holding everything makes every consumer pay for every change.

If a store updates constantly, consider \`useSyncExternalStore\` or a selector-based library such as Zustand, where components subscribe to the slice they use and ignore the rest.

## Step 5: Are keys stable?

Bad keys cause more than warnings; they cause remounts, which throw away state and DOM.

\`\`\`tsx
// Remounts every row on every render
{items.map((item) => <Row key={Math.random()} item={item} />)}

// Index keys break when items reorder, insert or delete
{items.map((item, i) => <Row key={i} item={item} />)}

// Stable and unique
{items.map((item) => <Row key={item.id} item={item} />)}
\`\`\`

The same idea applies to components defined inside components. This creates a brand-new component type on every render, so React unmounts and remounts the whole subtree:

\`\`\`tsx
function Parent() {
  // New function identity each render means a new component type each render
  const Child = () => <input />;
  return <Child />;
}
\`\`\`

If an input loses focus while you type, this is almost always the reason. Move \`Child\` out to module scope.

## Step 6: Are effects setting state in loops?

An effect that sets state, which triggers a render, which re-runs the effect, is a loop in slow motion. Check dependency arrays for unstable values:

\`\`\`tsx
// Runs every render because options is a new object each time
useEffect(() => {
  fetchData(options).then(setData);
}, [options]);
\`\`\`

Ask first whether you need an effect at all. State derived from props or other state should be computed during render, not copied through an effect:

\`\`\`tsx
// Extra render for no reason
const [filtered, setFiltered] = useState<Item[]>([]);
useEffect(() => setFiltered(items.filter(match)), [items]);

// Compute it
const filtered = useMemo(() => items.filter(match), [items]);
\`\`\`

For fetching, prefer a data library such as TanStack Query over hand-written effects. It dedupes, caches and avoids most of this class of bug.

## Step 7: Reduce the cost of the render itself

If a render is justified but still slow, make it cheaper:

- **Virtualize long lists** with \`@tanstack/react-virtual\` or \`react-window\`. Rendering 5,000 rows is the problem; memoizing them is a patch.
- **Defer non-urgent updates** so typing stays responsive:

\`\`\`tsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const results = useMemo(() => search(deferredQuery), [deferredQuery]);
\`\`\`

- **Move expensive derivations out of render** or memoize them once, with a dependency array that actually holds steady.
- **Split big components** so a state change only touches a small subtree.

## Step 8: Now profile

If you've done the above and it's still slow, open the React Profiler and record the exact interaction. Look for:

1. The commit that takes the longest, shown in the flame chart.
2. The components with the widest bars (self time, not total).
3. The "why did this render" reason for each.

Cross-check with the browser's Performance panel, because sometimes the slow part isn't React at all. It's layout thrash, a large image decode or a heavy third-party script. Fix the thing the profile points to, then measure again. If the number didn't move, revert the change. Optimisations you can't measure are just complexity.

## Conclusion

Most re-render problems resolve before the Profiler, in a predictable order: confirm it's actually slow, move state closer to where it's used, stabilise props that cross memo boundaries, split and memoize context values, use stable keys and module-level components, and cut effects that mirror state. Reach for \`memo\`, \`useMemo\` and \`useCallback\` last, and only where something downstream compares by reference. Then profile, change one thing, and measure again.`,
};
