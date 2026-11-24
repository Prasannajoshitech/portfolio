import { Link } from "react-router-dom";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import type { BlogPost } from "../content/blog";
import Reveal from "./Reveal";
import Tag from "./ui/Tag";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
  compact?: boolean;
  index?: number;
};

function formatDate(iso: string, long = false) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: long ? "long" : "short",
    day: "numeric",
  });
}

export default function BlogCard({
  post,
  featured = false,
  compact = false,
  index = 0,
}: BlogCardProps) {
  if (featured) {
    return (
      <Reveal
        as="article"
        className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-card"
      >
        <Link
          to={`/blog/${post.slug}`}
          className="grid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:grid-cols-[1.15fr_1fr]"
          aria-label={`Read ${post.title}`}
        >
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[300px]">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              width={1200}
              height={630}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/10 lg:to-surface-elevated"
            />
            <span className="absolute left-5 top-5 rounded-full border border-accent/50 bg-surface/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
              Featured
            </span>
          </div>

          <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-[1.75rem] sm:leading-snug">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-xs text-muted">
              <time dateTime={post.datePublished}>
                {formatDate(post.datePublished, true)}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <FiClock aria-hidden className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent">
                Read article
                <FiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    );
  }

  if (compact) {
    return (
      <Reveal as="article" delay={index * 0.04} className="group">
        <Link
          to={`/blog/${post.slug}`}
          className="flex gap-4 rounded-2xl border border-border bg-surface-elevated p-3 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <img
            src={post.coverImage}
            alt=""
            width={120}
            height={80}
            loading="lazy"
            className="h-20 w-28 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1 py-0.5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {formatDate(post.datePublished)} · {post.readingTimeMinutes} min
            </p>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
              {post.title}
            </h3>
          </div>
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal
      as="article"
      delay={index * 0.05}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated transition duration-200 hover:-translate-y-1 hover:border-accent/35 hover:shadow-card"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="relative block overflow-hidden"
        aria-label={`Read ${post.title}`}
      >
        <img
          src={post.coverImage}
          alt={post.coverAlt}
          width={1200}
          height={630}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface/90 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur-sm">
          <FiClock aria-hidden className="h-3 w-3" />
          {post.readingTimeMinutes} min
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
          <Link
            to={`/blog/${post.slug}`}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <time
            dateTime={post.datePublished}
            className="font-mono text-xs text-muted"
          >
            {formatDate(post.datePublished)}
          </time>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover:text-accent">
            Read
            <FiArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Reveal>
  );
}
