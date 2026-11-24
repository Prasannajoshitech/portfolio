import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { getProjectBySlug, projectsData } from "../data/projects";
import { fade, fadeUp } from "../lib/motion";
import Seo from "../components/Seo";
import Container from "../components/ui/Container";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import { siteConfig } from "../data/site";

export default function ProjectPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const reduced = useReducedMotion();

  if (!project) {
    return (
      <Container className="py-24">
        <Seo title="Project not found" path={`/projects/${slug}`} noIndex />
        <h1 className="text-2xl font-semibold text-ink">Project not found</h1>
        <p className="mt-4 text-muted">
          <Link to="/projects" className="link-underline">
            Back to projects
          </Link>
        </p>
      </Container>
    );
  }

  const related = projectsData
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={fade}>
      <Seo
        title={project.title}
        description={project.description}
        path={`/projects/${project.slug}`}
        image={typeof project.img === "string" ? project.img : siteConfig.ogImage}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />

      <Container className="py-12 sm:py-16">
        <motion.div variants={fadeUp(!!reduced)}>
          <p className="text-sm text-muted">
            <Link to="/projects" className="link-underline">
              ← All projects
            </Link>
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">
            {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={project.link} target="_blank" rel="noopener noreferrer">
              <FiExternalLink aria-hidden /> Visit live site
            </Button>
            {project.github ? (
              <Button
                href={project.github}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub aria-hidden /> GitHub
              </Button>
            ) : null}
          </div>
        </motion.div>

        <motion.div variants={fadeUp(!!reduced)} className="mt-10 overflow-hidden rounded-2xl border border-border">
          <img
            src={project.img}
            alt={`${project.title} website screenshot`}
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
            className="aspect-video w-full object-cover"
          />
        </motion.div>

        {project.caseStudy ? (
          <motion.section
            variants={fadeUp(!!reduced)}
            className="mt-12 grid gap-6 sm:grid-cols-3"
            aria-labelledby="case-heading"
          >
            <h2 id="case-heading" className="sr-only">
              Case study
            </h2>
            {(
              [
                ["Problem", project.caseStudy.problem],
                ["Solution", project.caseStudy.solution],
                ["Result", project.caseStudy.result],
              ] as const
            ).map(([label, text]) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-surface-elevated p-5"
              >
                <h3 className="font-semibold text-ink">{label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </motion.section>
        ) : null}

        {related.length > 0 ? (
          <aside className="mt-16 border-t border-border pt-10">
            <h2 className="text-lg font-semibold text-ink">Related projects</h2>
            <ul className="mt-4 space-y-2">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/projects/${item.slug}`}
                    className="link-underline text-ink"
                  >
                    {item.title}
                  </Link>
                  <span className="text-sm text-muted"> — {item.category}</span>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Container>
    </motion.div>
  );
}
