type Variant = "home" | "blog" | "projects" | "about" | "post";

type HeroBackdropProps = {
  variant?: Variant;
  className?: string;
};

/**
 * Quiet, page-specific hero atmospheres.
 * One strong idea per page — no floating chips, orbits, or stacked effects.
 */
export default function HeroBackdrop({
  variant = "home",
  className = "",
}: HeroBackdropProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {variant === "home" ? <HomeBackdrop /> : null}
      {variant === "blog" ? <BlogBackdrop /> : null}
      {variant === "projects" ? <ProjectsBackdrop /> : null}
      {variant === "about" ? <AboutBackdrop /> : null}
      {variant === "post" ? <PostBackdrop /> : null}
    </div>
  );
}

/** Home — soft crescent light + fine baseline */
function HomeBackdrop() {
  return (
    <>
      <div className="hero-home-wash absolute inset-0" />
      <div className="hero-home-crescent absolute -right-[12%] top-[-30%] h-[140%] w-[70%] rounded-full" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-8 left-[max(1rem,calc(50%-550px))] hidden h-8 w-px bg-accent/50 sm:block" />
    </>
  );
}

/** Blog — magazine color tip + typed rule */
function BlogBackdrop() {
  return (
    <>
      <div className="hero-blog-panel absolute inset-y-0 right-0 w-[min(28%,220px)]" />
      <div className="absolute left-[max(1rem,calc(50%-550px))] top-10 h-10 w-10 rounded-full border border-border/80" />
      <div className="absolute left-[max(1.65rem,calc(50%-540px))] top-[3.15rem] h-1.5 w-1.5 rounded-full bg-accent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </>
  );
}

/** Projects — modular stepped blocks (card metaphor) */
function ProjectsBackdrop() {
  return (
    <>
      <div className="hero-projects-fade absolute inset-0" />
      <div className="absolute right-[6%] top-[18%] hidden gap-3 sm:flex">
        <div className="h-28 w-20 rounded-2xl border border-border/70 bg-surface-elevated/40" />
        <div className="mt-6 h-36 w-24 rounded-2xl border border-accent/25 bg-accent/[0.04]" />
        <div className="mt-3 h-24 w-16 rounded-2xl border border-border/60 bg-surface-elevated/30" />
      </div>
      <svg
        className="absolute bottom-0 left-0 h-24 w-full text-border"
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 96V48c120-32 240 16 360-8s240-40 360 0 240 40 360 8v56H0Z"
          fill="currentColor"
          opacity="0.25"
        />
      </svg>
    </>
  );
}

/** About — quiet portrait oval */
function AboutBackdrop() {
  return (
    <>
      <div className="hero-about-oval absolute right-[-5%] top-1/2 h-[120%] w-[55%] -translate-y-1/2 rounded-[50%]" />
      <div className="absolute left-[max(1rem,calc(50%-360px))] top-12 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
          Profile
        </span>
      </div>
    </>
  );
}

/** Post — almost empty; soft top veil only */
function PostBackdrop() {
  return (
    <>
      <div className="hero-post-veil absolute inset-x-0 top-0 h-40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-border/80" />
    </>
  );
}
