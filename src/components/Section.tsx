import type { ReactNode } from "react";
import Container from "./ui/Container";
import Reveal from "./Reveal";

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
};

export default function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className = "",
  action,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`scroll-mt-24 py-16 sm:py-20 ${className}`}
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {eyebrow ? (
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                  {eyebrow}
                </p>
              ) : null}
              <h2
                id={id ? `${id}-heading` : undefined}
                className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-2 max-w-2xl text-muted">{description}</p>
              ) : null}
            </div>
            {action}
          </div>
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </Container>
    </section>
  );
}
