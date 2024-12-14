import { BiCalendar, BiUser } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { GiPassport } from "react-icons/gi";
import { blogsData } from "../../data/blogData";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";

const RecentBlogs = () => {
  const navigate = useNavigate();
 const blogs = blogsData;
 const ref = useRef(null);
 const [inView, setInView] = useState(false);


 useEffect(() => {
   const observer = new IntersectionObserver(
     ([entry]) => {
       if (entry.isIntersecting) {
         setInView(true);
       }
     },
     { threshold: 0.1 } // Trigger when 50% of the element is in view
   );

   if (ref.current) {
     observer.observe(ref.current);
   }

   return () => {
     if (ref.current) {
       observer.unobserve(ref.current);
     }
   };
 }, []);
  return (
    <motion.div className="p-4 md:p-8 lg:p-12 rounded-3xl w-full text-darkGray overflow-hidden my-10">
        
      <div className=" w-full">
        <div className="">
        <div className="text-center">
        <motion.p 
       
     
       initial={{ opacity: 0, scale: 0.9, y: 20 }}
       animate={{
         opacity: inView ? 1 : 0,
         scale: inView ? 1 : 0.95,
         y: inView ? 0 : 20,
       }}
       transition={{
         ease: 'easeOut',
         duration: 0.6,
         delay: 0.2,
         type: 'spring',
         stiffness: 150,
         damping: 25,
       }}
     
        className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          Recent Blogs
        </motion.p>
      </div>
        
        </div>
        <div className="gap-4 grid grid-cols-5 md:grid-cols-3 lg:grid-cols-2 pt-10 ">
          {blogs?.slice(0, 4)?.map((blog, index) => (
            < motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: inView ? 1 : 0,
              scale: inView ? 1 : 0.95,
              y: inView ? 0 : 20,
            }}
            transition={{
              ease: 'easeOut',
              duration: 0.6,
              delay: 0.2 + index * 0.1,  // Make delay different for each item
              type: 'spring',
              stiffness: 150,
              damping: 25 + index * 5, // Increase damping for each item
            }}
          
              key={index}
            >
             
              <div 
              className="flex flex-col w-full space-y-2 border rounded-lg transition-all duration-500 cursor-pointer overflow-hidden ease-in-out shadow-md hover:scale-105 p-2"
              
              >
                <div>
                  <h3 className="mb-1 font-semibold text-xl">{blog.title}</h3>
                 
                  <p className="flex gap-1 items-center text-xs text-gray-500 my-1">
                    <BiCalendar /> {blog.created_at.split("T")[0]}
                  </p>


                  <p
                    className="text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>
                <button
                  className=" my-2 flex  gap-2 group items-center"
                  onClick={() => {
                    navigate(`blog`);
                  }}
                >
                  Read More
                  <BsArrowRight className="inline-block group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentBlogs;