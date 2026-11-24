import Seo from "../components/Seo";
import AboutSnippet from "../components/sections/AboutSnippet";
import CaseStudies from "../components/sections/CaseStudies";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Hero from "../components/sections/Hero";
import LatestPosts from "../components/sections/LatestPosts";
import Skills from "../components/sections/Skills";
import Stats from "../components/sections/Stats";
import ValueProps from "../components/sections/ValueProps";

export default function HomePage() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Stats />
      <FeaturedProjects />
      <CaseStudies />
      <Skills />
      <Experience />
      <LatestPosts />
      <ValueProps />
      <AboutSnippet />
      <Contact />
    </>
  );
}
