import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "../../data/site";
import Button from "../ui/Button";
import Reveal from "../Reveal";
import Section from "../Section";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    try {
      await emailjs.sendForm(
        siteConfig.emailjs.serviceId,
        siteConfig.emailjs.templateId,
        formRef.current,
        { publicKey: siteConfig.emailjs.publicKey },
      );
      toast.success("Got it — I’ll reply soon.");
      formRef.current.reset();
    } catch {
      toast.error("That didn’t send. Email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Want to talk?
          </h3>
          <p className="mt-4 text-muted">
            {siteConfig.availability}. Send a note—I’ll reply when I can.
          </p>
          <div className="mt-6">
            <Button href={`mailto:${siteConfig.email}`}>
              <FiMail aria-hidden /> {siteConfig.email}
            </Button>
          </div>
          <ul className="mt-6 flex gap-3">
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
            ].map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal>
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="from_name" className="text-sm text-ink">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </div>
              <div>
                <label htmlFor="reply_to" className="text-sm text-ink">
                  Email
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </div>
              <div>
                <label htmlFor="subject" className="text-sm text-ink">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="mt-6 w-full sm:w-auto"
            >
              {sending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
