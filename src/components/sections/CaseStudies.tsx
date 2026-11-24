import { Link } from "react-router-dom";
import { highlightProjects } from "../../data/projects";
import Reveal from "../Reveal";
import Section from "../Section";

export default function CaseStudies() {
  return (
    <Section
      id="case-studies"
      eyebrow="Case studies"
      title="A couple of case studies"
      description="What was wrong, what I changed, and how it turned out."
    >
      <ul className="grid gap-6 lg:grid-cols-2">
        {highlightProjects.map((project) => (
          <Reveal
            key={project.id}
            as="li"
            className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink">
              <Link
                to={`/projects/${project.slug}`}
                className="link-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {project.title}
              </Link>
            </h3>
            {project.caseStudy ? (
              <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="font-medium text-ink">Problem</dt>
                  <dd className="mt-1 text-muted">{project.caseStudy.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium text-ink">Solution</dt>
                  <dd className="mt-1 text-muted">
                    {project.caseStudy.solution}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-ink">Result</dt>
                  <dd className="mt-1 text-muted">{project.caseStudy.result}</dd>
                </div>
              </dl>
            ) : null}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
