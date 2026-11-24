import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** landing ~1100px, blog reading ~720px */
  size?: "content" | "prose";
};

export default function Container({
  children,
  className = "",
  size = "content",
}: ContainerProps) {
  const max = size === "prose" ? "max-w-prose" : "max-w-content";
  return (
    <div className={`mx-auto w-full ${max} px-4 sm:px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
