import { BiCalendar } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { blogsData } from "../../data/blogData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const RecentBlogs = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="p-6 rounded-xl w-full max-w-screen-lg mx-auto text-darkGray my-10"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      ref={ref}
    >
      <motion.div className="w-full text-center" variants={titleVariants}>
        <h2 className="text-2xl sm:text-4xl font-medium mb-6">Recent Blogs</h2>
      </motion.div>

      <motion.div
        className=""
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogsData?.slice(0, 4)?.map((blog, index) => (
            <motion.div
              key={index}
              className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="flex items-center text-sm text-gray-500 mb-4">
                <BiCalendar className="mr-1" /> {blog.created_at.split("T")[0]}
              </p>
              <p
                className="text-sm text-gray-700 line-clamp-2 mb-4"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />

              <button
                className="flex items-center text-primary hover:underline"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Read More
                <BsArrowRight className="ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecentBlogs;
