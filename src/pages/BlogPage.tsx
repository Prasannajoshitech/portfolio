import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiClock,
  FiRss,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { blogPosts, getAllTags } from "../content/blog";
import { blogPageCopy, blogTopics } from "../data/blogMeta";
import { siteConfig } from "../data/site";
import BlogCard from "../components/BlogCard";
import HeroBackdrop from "../components/HeroBackdrop";
import Seo from "../components/Seo";
import Container from "../components/ui/Container";
import Tag from "../components/ui/Tag";
import Reveal from "../components/Reveal";

export default function BlogPage() {
  const tags = getAllTags();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const totalMinutes = blogPosts.reduce(
    (sum, p) => sum + p.readingTimeMinutes,
    0,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tldr.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [query, activeTag]);

  const isDefault = !query.trim() && activeTag === "All";
  const featured = isDefault ? filtered[0] : null;
  const secondary = isDefault ? filtered.slice(1, 3) : [];
  const rest = isDefault ? filtered.slice(3) : filtered;

  const topicCounts = blogTopics.map((topic) => ({
    ...topic,
    count: blogPosts.filter((p) =>
      p.tags.some((t) =>
        topic.matchTags.some(
          (m) => m.toLowerCase() === t.toLowerCase(),
        ),
      ),
    ).length,
  }));

  return (
    <>
      <Seo
        title="Blog"
        description="Posts on React, TypeScript, performance, and accessibility from real project work."
        path="/blog"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroBackdrop variant="blog" />

        <Container className="relative py-16 sm:py-22 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {blogPageCopy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
              {blogPageCopy.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {blogPageCopy.description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: FiBookOpen,
                  label: "Articles",
                  value: `${blogPosts.length}`,
                },
                {
                  icon: FiClock,
                  label: "Total reading",
                  value: `${totalMinutes} min`,
                },
                {
                  icon: FiRss,
                  label: "Subscribe",
                  value: "RSS feed",
                  href: siteConfig.links.rss,
                },
              ].map((stat) => {
                const Icon = stat.icon;
                const inner = (
                  <>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                        {stat.label}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {stat.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={stat.label}>
                    {stat.href ? (
                      <a
                        href={stat.href}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated/80 px-4 py-3 transition hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated/80 px-4 py-3">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Topics */}
      <Container className="py-12 sm:py-14">
        <Reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Explore by topic
              </h2>
              <p className="mt-1 text-sm text-muted">{blogPageCopy.topicsIntro}</p>
            </div>
          </div>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {topicCounts.map((topic, i) => (
            <Reveal key={topic.id} as="li" delay={i * 0.05}>
              <button
                type="button"
                onClick={() => {
                  const first = topic.matchTags.find((t) =>
                    tags.some((x) => x.toLowerCase() === t.toLowerCase()),
                  );
                  if (first) {
                    const exact =
                      tags.find(
                        (t) => t.toLowerCase() === first.toLowerCase(),
                      ) ?? first;
                    setActiveTag(exact);
                    setQuery("");
                    document
                      .getElementById("blog-feed")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="h-full w-full rounded-2xl border border-border bg-surface-elevated p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {topic.count} post{topic.count === 1 ? "" : "s"}
                </p>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  {topic.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {topic.description}
                </p>
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* Filters + feed */}
      <section
        id="blog-feed"
        className="scroll-mt-24 border-t border-border bg-surface-elevated/30"
      >
        <Container className="py-12 sm:py-16">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-3 sm:p-4">
              <div className="relative">
                <FiSearch
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <label className="sr-only" htmlFor="blog-search">
                  Search posts
                </label>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles, tags, or ideas…"
                  className="w-full rounded-xl border border-border bg-surface-elevated py-3 pl-10 pr-10 text-sm text-ink placeholder:text-muted/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <FiX className="h-4 w-4" aria-hidden />
                  </button>
                ) : null}
              </div>

              <div
                role="toolbar"
                aria-label="Filter by tag"
                className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <Tag
                  active={activeTag === "All"}
                  onClick={() => setActiveTag("All")}
                >
                  All
                </Tag>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    active={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>

          {featured ? (
            <div className="mt-10 space-y-8">
              <BlogCard post={featured} featured />
              {secondary.length > 0 ? (
                <ul className="grid gap-6 lg:grid-cols-2">
                  {secondary.map((post, i) => (
                    <li key={post.slug}>
                      <BlogCard post={post} index={i} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className={featured ? "mt-12" : "mt-10"}>
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold text-ink">
                  {featured ? "All articles" : "Results"}
                </h2>
                <p className="font-mono text-xs text-muted">
                  {filtered.length} of {blogPosts.length}
                </p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <li key={post.slug}>
                    <BlogCard post={post} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {filtered.length === 0 ? (
            <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
              <p className="text-lg font-medium text-ink">No posts match</p>
              <p className="mt-2 text-sm text-muted">
                Try another tag or clear the search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveTag("All");
                }}
                className="mt-6 inline-flex rounded-xl border border-border px-4 py-2 text-sm text-ink transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Reset filters
              </button>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-14 sm:py-20">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-6 py-10 sm:px-10">
          <div className="relative max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Prefer email?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              New posts show up on the RSS feed. For a project or a quick
              question, just email me.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.links.rss}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <FiRss aria-hidden /> Follow RSS
              </a>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Contact me <FiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
