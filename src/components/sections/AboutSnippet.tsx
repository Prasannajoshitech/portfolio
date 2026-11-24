import { Link } from "react-router-dom";
import profileImage from "../../img/mypic1.jpg";
import { aboutMeData } from "../../data/about";
import { siteConfig } from "../../data/site";
import Reveal from "../Reveal";
import Section from "../Section";
import Tag from "../ui/Tag";

export default function AboutSnippet() {
  const bio =
    typeof aboutMeData?.[0]?.bio === "string"
      ? aboutMeData[0].bio.slice(0, 280) + "…"
      : siteConfig.tagline;

  return (
    <Section
      id="about"
      eyebrow="About"
      title="A bit about me"
      action={
        <Link
          to="/about"
          className="link-underline text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Full story →
        </Link>
      }
    >
      <Reveal className="grid items-center gap-8 rounded-2xl border border-border bg-surface-elevated p-6 sm:grid-cols-[200px_1fr] sm:p-8">
        <img
          src={profileImage}
          alt={siteConfig.photoAlt}
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
          className="mx-auto aspect-square w-40 rounded-2xl object-cover sm:w-full"
        />
        {/* TODO: replace mypic1.jpg with a preferred professional photo if needed */}
        <div>
          <p className="text-base leading-relaxed text-muted">{bio}</p>
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Currently learning
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {siteConfig.currentlyLearning.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            <span className="font-medium text-ink">Building: </span>
            {siteConfig.currentlyBuilding}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
