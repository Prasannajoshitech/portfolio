type TagProps = {
  children: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export default function Tag({
  children,
  className = "",
  active,
  onClick,
}: TagProps) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs tracking-wide transition duration-200 ${
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-border bg-surface-elevated text-muted hover:border-accent/40"
      } ${onClick ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" : ""} ${className}`.trim()}
    >
      {children}
    </Comp>
  );
}
