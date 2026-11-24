import { experienceData } from "../../data/experience";
import Reveal from "../Reveal";
import Section from "../Section";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Work history"
      description="Freelance and product work, mostly React front ends."
    >
      <ol className="relative space-y-8 border-l border-border pl-6">
        {experienceData.map((item) => (
          <Reveal key={item.id} as="li" className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.625rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-glow"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-ink">
                {item.role}
                <span className="font-normal text-muted">
                  {" "}
                  — {item.company}
                </span>
              </h3>
              <time className="font-mono text-xs text-muted">{item.period}</time>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted sm:text-base">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
