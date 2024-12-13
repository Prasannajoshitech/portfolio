import { useEffect, useState } from "react";
import Blog from "../components/blog/Blog";
import Headings from "../components/blog/Heading";
import { blogsData } from "../data/blogData";
import BlogSidebar from "../components/blog/BlogSidebar";
const BlogPage = () => {
    const [filteredData , setFilteredData] = useState();
    const [searchTerm, setSearchTerm] = useState();

    useEffect(()=>{
        setFilteredData(blogsData)
    },[])


 const handleSearch =()=>{
    const searchData = blogsData.filter((item)=> (item.title).toLowerCase().includes(searchTerm.toLowerCase()))
 setFilteredData(searchData)
}
  return <>
  <div className="mx-3 lg:mx-16">
      <Headings breadcumb={"blog"} heading={"Blog"} />
        <div className="flex gap-10 px-0 p-16">
          <div className="w-full md:w-8/12">
          <Blog blogsData={filteredData} />

          </div>
          <div className="w-4/12">
         <BlogSidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCategory={setSearchTerm} 
         handleSearch={handleSearch}
         />
          </div>
        </div>
      </div>
    </>;
};
export default BlogPage;
