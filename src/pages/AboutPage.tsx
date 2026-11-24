import { Link } from "react-router-dom";
import profileImage from "../img/mypic1.jpg";
import { aboutMeData } from "../data/about";
import { educationData } from "../data/education";
import { experienceData } from "../data/experience";
import { siteConfig } from "../data/site";
import Seo from "../components/Seo";
import Container from "../components/ui/Container";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import Reveal from "../components/Reveal";
import HeroBackdrop from "../components/HeroBackdrop";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="About Prasanna Joshi — software engineer in Lalitpur working with React, Next.js, and TypeScript."
        path="/about"
        type="profile"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border">
        <HeroBackdrop variant="about" />
        <Container size="prose" className="relative py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              About
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="mt-2 text-lg text-muted">
              {siteConfig.role} · {siteConfig.location}
            </p>
            <p className="mt-2 font-mono text-xs text-muted">
              {siteConfig.phone} · {siteConfig.email}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container size="prose" className="py-12 sm:py-16">
        <Reveal>
          <img
            src={profileImage}
            alt={siteConfig.photoAlt}
            width={720}
            height={480}
            loading="eager"
            decoding="async"
            className="aspect-[3/2] w-full rounded-2xl object-cover"
          />
        </Reveal>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-muted">
          {aboutMeData.map((item: { id: number; bio: string }) => (
            <Reveal key={item.id}>
              <p>{item.bio}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Experience</h2>
          <ul className="mt-5 space-y-6">
            {experienceData.map((job) => (
              <li key={job.id} className="border-l border-border pl-4">
                <p className="font-medium text-ink">
                  {job.role}{" "}
                  <span className="font-normal text-muted">— {job.company}</span>
                </p>
                <p className="mt-1 font-mono text-xs text-muted">{job.period}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Education</h2>
          <ul className="mt-5 space-y-4">
            {educationData.map((ed) => (
              <li
                key={ed.id}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">{ed.degree}</p>
                  <p className="text-sm text-muted">{ed.school}</p>
                </div>
                <p className="font-mono text-xs text-muted">{ed.period}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Currently learning</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {siteConfig.currentlyLearning.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            <span className="font-medium text-ink">Building: </span>
            {siteConfig.currentlyBuilding}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-3">
          <Button to="/#contact">Get in touch</Button>
          <Button
            href={siteConfig.links.resume}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download resume
          </Button>
          <Link to="/projects" className="link-underline self-center text-sm">
            View projects
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
