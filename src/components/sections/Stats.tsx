import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";
import { blogPosts } from "../../content/blog";
import { siteConfig } from "../../data/site";
import Container from "../ui/Container";
import Reveal from "../Reveal";

const stats = [
  { label: "Years experience", value: siteConfig.stats.yearsExperience, suffix: "+" },
  { label: "Client projects", value: siteConfig.stats.projectsShipped, suffix: "+" },
  { label: "Technologies", value: siteConfig.stats.technologies, suffix: "+" },
  { label: "Blog posts", value: blogPosts.length, suffix: "" },
];

export default function Stats() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [started, setStarted] = useState(false);
  const once = useRef(false);

  useEffect(() => {
    if (inView && !once.current) {
      once.current = true;
      setStarted(true);
    }
  }, [inView]);

  return (
    <section aria-label="Key stats" className="py-8 sm:py-10">
      <Container>
        <Reveal>
          <ul
            ref={ref}
            className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface-elevated p-6 sm:grid-cols-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <li key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {reduced || !started ? (
                    <>
                      {stat.value}
                      {stat.suffix}
                    </>
                  ) : (
                    <CountUp
                      end={stat.value}
                      duration={1.4}
                      decimals={Number.isInteger(stat.value) ? 0 : 1}
                      suffix={stat.suffix}
                    />
                  )}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
