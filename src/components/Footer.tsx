import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  footerNavLinks,
  footerResourceLinks,
  siteConfig,
} from "../data/site";
import BackToTop from "./BackToTop";
import ThemeToggle from "./ui/ThemeToggle";

export default function Footer() {
  const year = new Date().getFullYear();

  const social = [
    {
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      icon: FiMail,
    },
    {
      label: "GitHub",
      href: siteConfig.links.github,
      icon: FiGithub,
    },
    {
      label: "LinkedIn",
      href: siteConfig.links.linkedin,
      icon: FiLinkedin,
    },
    ...(siteConfig.links.twitter
      ? [
          {
            label: "X / Twitter",
            href: siteConfig.links.twitter,
            icon: FiTwitter,
          },
        ]
      : []),
  ];

  return (
    <footer className="relative mt-8 border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-t from-accent-soft to-transparent opacity-60"
      />
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-ink">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 open-dot" aria-hidden />
              {siteConfig.availability}
            </p>
            <p className="mt-3 font-mono text-xs text-muted">
              {/* TODO: confirm location display */}
              Based in {siteConfig.location}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Navigation
            </p>
            <ul className="mt-4 space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="link-underline text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Resources
            </p>
            <ul className="mt-4 space-y-2">
              {footerResourceLinks.map((link) => (
                <li key={link.href}>
                  {link.href.endsWith(".xml") || link.href.endsWith(".pdf") ? (
                    <a
                      href={link.href}
                      className="link-underline text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      {...(link.href.endsWith(".pdf")
                        ? { download: true }
                        : {})}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="link-underline text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={item.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Optional newsletter stub */}
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire newsletter provider
              }}
            >
              <label htmlFor="footer-email" className="text-sm text-muted">
                Get new posts by email
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}
          </p>
          <ThemeToggle />
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}
