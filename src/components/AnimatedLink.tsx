import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const underline =
  "relative inline-flex items-center gap-1 text-ink transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100";

type AnimatedLinkProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
} & (
  | {
      to: string;
      href?: never;
      target?: never;
      rel?: never;
    }
  | {
      href: string;
      to?: never;
      target?: string;
      rel?: string;
    }
);

export default function AnimatedLink({
  children,
  className = "",
  ...props
}: AnimatedLinkProps) {
  const classes = `${underline} ${className}`.trim();

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={props.href}
      className={classes}
      target={props.target}
      rel={props.rel}
      aria-label={props["aria-label"]}
    >
      {children}
    </a>
  );
}
