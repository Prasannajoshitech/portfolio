import React, { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";



const BlogSidebar = ({
  setSearchTerm,
  searchTerm,
  setCategory,
  setFilteredData,
  handleSearch
}) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("All");
  const [selectedTagSlug, setSelectedTagSlug] = useState(
    "All"
  );

  

  return (
    <div>
      <div className="shadow-lg p-5 rounded-xl">
        <span className="pb-3 w-full font-bold text-primary">Search Here </span>
        <hr className="mt-3" />
        <div className="flex items-center gap-3 border-gray-500 mt-10 mb-3 px-3 py-2 border rounded-2xl text-xs">
          <input
            className="w-full text-sm outline-none"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value) , handleSearch()}}
          />
          <IoIosSearch size={24} />
        </div>
      </div>
      {/* popular post */}
      {/* <div className="shadow-lg my-5 p-5 rounded-xl ">
        <span className="pb-3 w-full font-bold text-primary">
          Popular Posts
        </span>
        <hr className="mt-3" />
        <div
          className="max-h-96 overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          {data?.map((item, index) => (
            <>
              <Link to={`${PATH.blog}/${item?.slug}`}>
                <div
                  key={index}
                  className="flex items-center gap-3 my-3 py-2 rounded-2xl text-xs"
                >
                  <div className="flex w-4/12 h-[90px]">
                    <img
                      src={item.image}
                      alt="blog image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-8/12">
                    <div className="flex items-center gap-3 mb-2">
                      <FaRegCalendarDays />
                      <span>{formatDate(item?.created_at)}</span>
                    </div>
                    <span className="font-semibold text-base text-primary">
                      {item?.title}
                    </span>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div> */}
      {/* category */}
      {/* <div className="shadow-lg my-5 p-5 rounded-xl">
        <span className="pb-3 w-full font-bold text-primary">Category</span>
        <hr className="my-3" />

        {allBlogCategories?.data?.slice(0, 5).map((item) => {
          console.log("item-slug", item?.slug);
          return (
            <React.Fragment key={item?.id}>
              <div className="flex items-center gap-2 py-2 rounded-2xl text-primary text-xs">
                <button
                  onClick={() => {
                    setSelectedCategorySlug(item?.slug);
                    setCategory(item?.slug);
                    // window.scrollTo(0, 0);
                  }}
                >
                  {item?.name}
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div> */}
    
  
    </div>
  );
};

export default BlogSidebar;