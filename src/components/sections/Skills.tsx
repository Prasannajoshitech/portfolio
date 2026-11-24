import { useState } from "react";
import { allSkills, coreStack, skillGroups } from "../../data/skills";
import SkillChip from "../ui/SkillChip";
import Section from "../Section";
import Reveal from "../Reveal";

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];
  const marquee = [...allSkills, ...allSkills];

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="Tech I work with"
      description="What I reach for most often when building React apps."
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated/50 py-4">
        <div className="marquee-track gap-6 px-4" aria-hidden>
          {marquee.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <span
                key={`${skill.id}-${i}`}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-muted"
              >
                <Icon className="h-4 w-4" />
                {skill.name}
              </span>
            );
          })}
        </div>
      </div>

      <Reveal className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Core stack
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {coreStack.map((skill, i) => (
            <SkillChip key={skill.id} skill={skill} large delay={i * 0.04} />
          ))}
        </div>
      </Reveal>

      <div className="mt-10">
        <div
          role="tablist"
          aria-label="Skill categories"
          className="flex flex-wrap gap-2"
        >
          {skillGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active === g.id}
              onClick={() => setActive(g.id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active === g.id
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-muted hover:text-ink"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-6">
          <p className="text-sm text-muted">{group.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {group.skills.map((skill, i) => (
              <SkillChip key={skill.id} skill={skill} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
