import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiLinkedin,
  FiLink2,
  FiTwitter,
} from "react-icons/fi";
import { useState } from "react";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
} from "../content/blog";
import { siteConfig } from "../data/site";
import Seo from "../components/Seo";
import Container from "../components/ui/Container";
import Tag from "../components/ui/Tag";
import BlogCard from "../components/BlogCard";
import Markdown, { extractHeadings } from "../components/blog/Markdown";
import ReadingProgress from "../components/blog/ReadingProgress";
import TableOfContents from "../components/blog/TableOfContents";
import Reveal from "../components/Reveal";
import HeroBackdrop from "../components/HeroBackdrop";
import profileImage from "../img/mypic1.jpg";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <Container className="py-24">
        <Seo title="Post not found" path={`/blog/${slug}`} noIndex />
        <h1 className="text-2xl font-semibold text-ink">Post not found</h1>
        <Link to="/blog" className="link-underline mt-4 inline-block text-muted">
          Back to blog
        </Link>
      </Container>
    );
  }

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post.slug, 3);
  const index = blogPosts.findIndex((p) => p.slug === post.slug);
  const prev = blogPosts[index + 1];
  const next = blogPosts[index - 1];
  const absoluteUrl = `${siteConfig.url}/blog/${post.slug}`;
  const shareUrl = encodeURIComponent(absoluteUrl);
  const shareText = encodeURIComponent(post.title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl,
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        article={{
          publishedTime: post.datePublished,
          modifiedTime: post.dateModified,
          tags: post.tags,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        jsonLd={blogPostingLd}
      />
      <ReadingProgress />

      {/* Article hero */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop variant="post" />

        <Container size="prose" className="relative py-12 sm:py-16">
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FiArrowLeft aria-hidden /> All posts
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={profileImage}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
                />
                <div>
                  <p className="text-sm font-medium text-ink">{siteConfig.name}</p>
                  <p className="font-mono text-[11px] text-muted">
                    {siteConfig.role}
                  </p>
                </div>
              </div>
              <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />
              <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <time dateTime={post.datePublished}>
                  {formatDate(post.datePublished)}
                </time>
                <span className="inline-flex items-center gap-1.5">
                  <FiClock aria-hidden className="h-3.5 w-3.5" />
                  {post.readingTimeMinutes} min read
                </span>
                {post.dateModified !== post.datePublished ? (
                  <span>Updated {formatDate(post.dateModified)}</span>
                ) : null}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-border shadow-card">
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="aspect-[1.9/1] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="mt-8 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent-soft to-transparent p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                TL;DR
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">
                {post.tldr}
              </p>
            </aside>
          </Reveal>

          <div className="mt-8 lg:hidden">
            <TableOfContents headings={headings} />
          </div>
        </Container>
      </header>

      {/* Body + sidebar */}
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_minmax(0,720px)] lg:py-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <TableOfContents headings={headings} />

            <div className="rounded-2xl border border-border bg-surface-elevated p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Share
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-sm text-muted transition hover:border-border hover:bg-surface hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <FiTwitter aria-hidden /> Share on X
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-sm text-muted transition hover:border-border hover:bg-surface hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <FiLinkedin aria-hidden /> Share on LinkedIn
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-sm text-muted transition hover:border-border hover:bg-surface hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <FiLink2 aria-hidden />
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <article id="article-body" className="min-w-0">
          <Markdown content={post.content} />

          {/* Mobile share */}
          <div className="mt-10 flex flex-wrap gap-2 lg:hidden">
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-muted hover:text-ink"
            >
              <FiTwitter aria-hidden /> X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-muted hover:text-ink"
            >
              <FiLinkedin aria-hidden /> LinkedIn
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-muted hover:text-ink"
            >
              <FiLink2 aria-hidden />
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>

          {/* Author */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface-elevated">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
              <img
                src={profileImage}
                alt={siteConfig.photoAlt}
                width={88}
                height={88}
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-border"
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Written by
                </p>
                <p className="mt-1 text-lg font-semibold text-ink">
                  {siteConfig.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {siteConfig.tagline} Based in {siteConfig.location}.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link to="/about" className="link-underline text-ink">
                    About me
                  </Link>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink"
                  >
                    GitHub
                  </a>
                  <Link to="/#contact" className="link-underline text-ink">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Post navigation"
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="group rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <p className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  <FiArrowLeft aria-hidden /> Previous
                </p>
                <p className="mt-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="group rounded-2xl border border-border bg-surface-elevated p-5 text-right transition hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <p className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Next <FiArrowRight aria-hidden />
                </p>
                <p className="mt-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            ) : null}
          </nav>
        </article>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface-elevated/25">
          <Container className="py-14 sm:py-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Keep reading
              </h2>
              <Link
                to="/blog"
                className="link-underline text-sm text-muted hover:text-ink"
              >
                All posts
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <li key={item.slug}>
                  <BlogCard post={item} index={i} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
