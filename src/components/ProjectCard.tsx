import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { easeOutExpo, fadeUp, viewportOnce } from "../lib/motion";
import Tag from "./ui/Tag";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp(!!reduced)}
      whileHover={
        reduced
          ? undefined
          : { y: -4, transition: { duration: 0.18, ease: easeOutExpo } }
      }
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-none transition-shadow duration-200 hover:shadow-card"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="relative block overflow-hidden"
        aria-label={`View ${project.title} case study`}
      >
        <img
          src={project.img}
          alt={`${project.title} website screenshot`}
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            <Link
              to={`/projects/${project.slug}`}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {project.title}
            </Link>
          </h3>
          <FiArrowUpRight
            aria-hidden
            className="mt-1 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink link-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FiExternalLink aria-hidden /> Live
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink link-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FiGithub aria-hidden /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
