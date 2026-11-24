import { Link } from "react-router-dom";
import { blogPosts } from "../../content/blog";
import BlogCard from "../BlogCard";
import Section from "../Section";

export default function LatestPosts() {
  const latest = blogPosts.slice(0, 3);

  return (
    <Section
      id="blog"
      eyebrow="Writing"
      title="Latest blog posts"
      description="Recent posts on React, TypeScript, and making pages feel faster."
      action={
        <Link
          to="/blog"
          className="link-underline text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View all posts →
        </Link>
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
