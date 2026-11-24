import Seo from "../components/Seo";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you’re looking for doesn’t exist."
        path="/404"
        noIndex
      />
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-muted">
          That URL doesn’t match anything on this site. Head home or browse
          projects and posts.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Go home</Button>
          <Button to="/projects" variant="secondary">
            View projects
          </Button>
          <Button to="/blog" variant="ghost">
            Read the blog
          </Button>
        </div>
      </Container>
    </>
  );
}
