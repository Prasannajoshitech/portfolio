import { motion, useReducedMotion } from "framer-motion";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "../../data/site";
import { coreStack } from "../../data/skills";
import { fadeUp, stagger } from "../../lib/motion";
import Button from "../ui/Button";
import Container from "../ui/Container";
import HeroBackdrop from "../HeroBackdrop";

export default function Hero() {
  const reduced = useReducedMotion();
  const item = fadeUp(!!reduced, 12);

  return (
    <section className="relative overflow-hidden border-b border-border pb-16 pt-20 sm:pb-24 sm:pt-28">
      <HeroBackdrop variant="home" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(!!reduced, 0.07)}
          className="max-w-2xl"
        >
          {siteConfig.openToWork ? (
            <motion.p
              variants={item}
              className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400 open-dot"
                aria-hidden
              />
              Open to work · {siteConfig.location}
            </motion.p>
          ) : null}

          <motion.h1
            variants={item}
            className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-lg text-muted sm:text-xl"
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 text-base leading-relaxed text-muted sm:text-[1.05rem] sm:leading-7"
          >
            About 2.5 years with JavaScript, React, and Next.js. Currently a
            Software Engineer at Dome Infosys—building apps that stay clear on a
            phone and easy to maintain later.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button to="/projects">View projects</Button>
            <Button
              href={siteConfig.links.resume}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDownload aria-hidden className="h-4 w-4" />
              Download resume
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <ul className="flex gap-2">
              {[
                {
                  href: siteConfig.links.github,
                  label: "GitHub",
                  icon: FiGithub,
                },
                {
                  href: siteConfig.links.linkedin,
                  label: "LinkedIn",
                  icon: FiLinkedin,
                },
                {
                  href: `mailto:${siteConfig.email}`,
                  label: "Email",
                  icon: FiMail,
                },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
            <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
            <p className="font-mono text-[11px] tracking-wide text-muted">
              {coreStack.map((s) => s.name).join(" · ")}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
