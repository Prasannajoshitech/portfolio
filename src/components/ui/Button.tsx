import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:brightness-110 shadow-sm border border-transparent",
  secondary:
    "bg-surface-elevated text-ink border border-border hover:border-accent/50",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-accent-soft",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    to?: never;
    href?: never;
  };

type ButtonAsLink = Common & { to: string; href?: never };

type ButtonAsAnchor = Common & {
  href: string;
  to?: never;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60";
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
      >
        {children}
      </a>
    );
  }

  const {
    children: _c,
    className: _cl,
    variant: _v,
    to: _t,
    href: _h,
    type = "button",
    ...rest
  } = props as ButtonAsButton & { to?: undefined; href?: undefined };

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
