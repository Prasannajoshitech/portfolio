import { useMemo, useState } from "react";
import { getProjectTags, projectsData } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import HeroBackdrop from "../components/HeroBackdrop";
import Seo from "../components/Seo";
import Container from "../components/ui/Container";
import Tag from "../components/ui/Tag";
import Reveal from "../components/Reveal";

export default function ProjectsPage() {
  const tags = getProjectTags();
  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(
    () =>
      active === "All"
        ? projectsData
        : projectsData.filter((p) => p.category === active),
    [active],
  );

  return (
    <>
      <Seo
        title="Projects"
        description="React and Next.js projects I’ve built—job portals, shops, clinics, and public sites."
        path="/projects"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border">
        <HeroBackdrop variant="projects" />
        <Container className="relative py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Work
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              All projects
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Filter by category if you want a smaller list.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="flex flex-wrap gap-2">
          <Tag active={active === "All"} onClick={() => setActive("All")}>
            All
          </Tag>
          {tags.map((tag) => (
            <Tag
              key={tag}
              active={active === tag}
              onClick={() => setActive(tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
