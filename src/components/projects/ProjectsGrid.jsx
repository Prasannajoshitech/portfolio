import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import ProjectSingle from "./ProjectSingle";
import { ProjectsContext } from "../../context/ProjectsContext";
import ProjectsFilter from "./ProjectsFilter";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProjectsGrid = () => {
  const {
    projects,
    searchProject,
    setSearchProject,
    searchProjectsByTitle,
    selectProject,
    setSelectProject,
    selectProjectsByCategory,
  } = useContext(ProjectsContext);
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="py-5 sm:py-10 mt-5 sm:mt-10 ">
      <div className="text-center">
        <h2 className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          Projects portfolio
        </h2>
        <h3
          className="font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-xl
                        my-5
                        "
        >
          Search projects by title or filter by category
        </h3>
      </div>

      <div className="mt-10 mb-5">
        <div
          className="
                        flex
                        justify-between
                        border-b border-primary-light
                        dark:border-secondary-dark
                        pb-3
                        gap-3
                        "
        >
          <div className="flex justify-between gap-2">
            <span
              className="
                                hidden
                                sm:block
                                bg-primary-light
                                dark:bg-ternary-dark
                                p-2.5
                                shadow-sm
                                rounded-xl
                                cursor-pointer
                                "
            >
              <FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5"></FiSearch>
            </span>
            <input
              onChange={(e) => {
                setSearchProject(e.target.value);
              }}
              className="font-general-medium 
                                pl-3
                                pr-1
                                sm:px-4
                                py-2
                                border 
                            border-gray-200
                                dark:border-secondary-dark
                                rounded-lg
                                text-sm
                                sm:text-md
                                bg-secondary-light
                                dark:bg-ternary-dark
                                text-primary-dark
                                dark:text-ternary-light
                                "
              id="name"
              name="name"
              type="search"
              required=""
              placeholder="Search Projects"
              aria-label="Name"
            />
          </div>

          <ProjectsFilter setSelectProject={setSelectProject} />
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-6 sm:gap-10"
        ref={ref}
      >
        {selectProject
          ? selectProjectsByCategory.map((project) => (
              <ProjectSingle
                title={project.title}
                category={project.category}
                image={project.img}
                key={project.id}
                linked={project.link || ""}
              />
            ))
          : searchProject
          ? searchProjectsByTitle.map((project) => (
              <ProjectSingle
                title={project.title}
                category={project.category}
                image={project.img}
                key={project.id}
                linked={project.link || ""}
              />
            ))
          : projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView && { opacity: 1, delay: 1, y: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.7,
                  delay: index * 0.25,
                }}
                key={project.id}
              >
                <ProjectSingle
                  title={project.title}
                  category={project.category}
                  image={project.img}
                  key={project.id}
                  linked={project.link || ""}
                />
              </motion.div>
            ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
