import React from "react";
import { FaArrowRight, FaRegComments, FaRegUser } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";



const Blog = ({ blogsData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBlogListPage = location.pathname === "/blog";

return (
    <>
      {blogsData?.map((item) => (
        <React.Fragment key={item?.id}>
          <div className="rounded-lg w-full h-96 overflow-hidden">
            <img className="w-full h-full object-cover" src={item.image} />
          </div>
          <div className="flex flex-wrap justify-between md:justify-start gap-2 md:gap-5 my-5 font-normal text-[#4F3A8B] text-sm">
            <span className="flex items-center gap-2">
              <FaRegUser className="font-bold" />
              By admin
            </span>
            <span className="flex items-center gap-2">
              <FaRegCalendarDays />
            
            </span>
            <span className="flex items-center gap-2">
              <FaRegComments />
              Comments (05)
            </span>
          </div>
          <h1 className="font-semibold text-2xl md:text-5xl leading-tight">
            {item.title}
          </h1>

          <p
            className={`my-5 text-gray-500 text-sm ${
              isBlogListPage ? "line-clamp-3" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></p>
          <div className="my-5 mb-20 w-32">
            <button
              title="Learn More"
           
              className="bg-primary text-xs justify-between "
              icon={<FaArrowRight />}
            />
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default Blog;