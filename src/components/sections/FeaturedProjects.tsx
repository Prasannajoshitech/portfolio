import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import ProjectCard from "../ProjectCard";
import Section from "../Section";

export default function FeaturedProjects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Featured projects"
      description="A handful of client sites I’ve worked on recently."
      action={
        <Link
          to="/projects"
          className="link-underline text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View all projects →
        </Link>
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.slice(0, 6).map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
