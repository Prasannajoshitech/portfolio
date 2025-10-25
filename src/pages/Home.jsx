import { Link } from "react-router-dom";
import AppBanner from "../components/shared/AppBanner";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import { ProjectsProvider } from "../context/ProjectsContext";
import Button from "../components/reusable/Button";
import RecentBlogs from "../components/blog/RecentBlog";
import Contact from "./Contact";
import ContactForm from "../components/contact/ContactForm";
import ContactDetails from "../components/contact/ContactDetails";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <AppBanner></AppBanner>

      <ProjectsProvider>
        <ProjectsGrid />
      </ProjectsProvider>

      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          to="/projects"
          className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
          aria-label="More Projects"
        >
          <Button title="More Projects" />
        </Link>
      </div>
      <RecentBlogs />
      <div className="mt-8 sm:mt-10 text-center overflow-hidden flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl font-medium mb-6">
          Contact Details
        </h2>
        <div className="w-full flex flex-col-reverse sm:flex-row gap-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
