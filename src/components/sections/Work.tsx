import { featuredProjects } from "../../data/projects";
import ProjectCard from "../ProjectCard";
import Section from "../Section";

export default function Work() {
  return (
    <Section id="work" title="Selected work">
      <ul className="list-none">
        {featuredProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
