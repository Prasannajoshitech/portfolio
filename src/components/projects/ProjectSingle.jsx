import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectSingle = ({ title, category, image, linked }) => {
  console.log(linked);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}
      className="rounded-xl   shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark   overflow-hidden "
    >
      {/* <Link
        to="/projects/single-project"
        aria-label="Single Project"
        className="h-[200px] border-2 border-yellow-500 overflow-hidden "
      > */}
      <div className="flex flex-col justify-between h-full overflow-hidden ">
        <div className="h-full overflow-hidden ">
          <img
            src={image}
            className="rounded-t-xl  h-full  object-cover"
            alt="Single Project"
          />
        </div>
        <div className=" h-2/6 text-center px-4 py-6 ">
          <div className="flex  justify-center gap-2">
            <p className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2 ">
              {title}
            </p>
            {/* <span className=" font-light text-lg text-ternary-dark dark:text-ternary-light">
              {category}
            </span> */}
          </div>
          <a
            target="_blank"
            href={linked}
            className="text-lg text-ternary-dark dark:text-ternary-light"
          >
            visit site
          </a>
        </div>
      </div>
      {/* </Link> */}
    </motion.div>
  );
};

export default ProjectSingle;
