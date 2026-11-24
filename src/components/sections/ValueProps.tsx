import { valueProps } from "../../data/site";
import Reveal from "../Reveal";
import Section from "../Section";

export default function ValueProps() {
  return (
    <Section
      id="value"
      eyebrow="Collaboration"
      title="How I like to work"
      description="A short take on what clients usually get from me."
    >
      <ul className="grid gap-6 sm:grid-cols-3">
        {valueProps.map((item, i) => (
          <Reveal
            key={item.id}
            as="li"
            delay={i * 0.06}
            className="rounded-2xl border border-border bg-surface-elevated p-6"
          >
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
