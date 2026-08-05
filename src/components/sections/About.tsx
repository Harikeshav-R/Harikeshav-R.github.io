import type { ReactNode } from "react";
import { SectionHeader, Prompt } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { profile, education } from "@/data/profile";

/** Three faux window dots for the "preview window" chrome. */
function WindowDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
    </div>
  );
}

/** A YAML-ish key: value row for the education config card. */
function ConfigRow({
  k,
  children,
}: {
  k: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <span className="w-28 shrink-0 text-teal">{k}:</span>
      <span className="text-subtext1">{children}</span>
    </div>
  );
}

export default function About({ onGoto }: { onGoto: (id: string) => void }) {
  return (
    <section id="about" className="scroll-mt-6">
      <SectionHeader file="about.md" title="About" hint="whoami" />

      {/* Hero: ASCII headshot + intro, side-by-side on desktop */}
      <Reveal>
        <div className="grid items-start gap-8 lg:grid-cols-[auto_1fr]">
          {/* Preview window with the headshot */}
          <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-lg border border-surface0 bg-mantle/60 lg:mx-0 lg:w-72">
            <div className="flex items-center gap-3 border-b border-surface0 bg-crust/70 px-3 py-2">
              <WindowDots />
              <span className="text-xs text-subtext0">Headshot.jpg</span>
            </div>
            <div className="p-3">
              <img
                src="/Headshot.jpg"
                alt="Harikeshav Rameshkumar"
                loading="lazy"
                className="aspect-square w-full rounded-md object-cover"
              />
            </div>
          </figure>

          {/* Intro text */}
          <div className="min-w-0">
            <div className="mb-3 text-sm">
              <span className="text-green">$</span>{" "}
              <span className="text-subtext0">whoami</span>
              <span className="cursor-block" />
            </div>

            <p className="text-3xl font-bold leading-tight text-text sm:text-4xl">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-overlay1">@{profile.handle}</p>

            <p className="mt-4 text-lg text-mauve">{profile.title}</p>
            <p className="mt-2 max-w-xl text-subtext1">{profile.tagline}</p>

            <dl className="mt-6 space-y-1.5 text-sm">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-overlay0">location</dt>
                <dd className="text-subtext1">{profile.location}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-overlay0">email</dt>
                <dd>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sky transition-colors hover:text-blue"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-overlay0">web</dt>
                <dd>
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky transition-colors hover:text-blue"
                  >
                    {profile.website}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>

      {/* About prose */}
      <Reveal delay={0.1} className="mt-12">
        <Prompt className="mb-4">a bit more about me</Prompt>
        <div className="max-w-3xl space-y-4">
          {profile.about.map((para, i) => (
            <p key={i} className="leading-relaxed text-subtext1">
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Education config card */}
      <Reveal delay={0.15} className="mt-12">
        <div className="max-w-3xl overflow-hidden rounded-lg border border-surface0 bg-mantle/40">
          <div className="flex items-center gap-3 border-b border-surface0 bg-crust/70 px-3 py-2">
            <WindowDots />
            <span className="text-xs text-subtext0">education.yaml</span>
          </div>

          <div className="space-y-4 p-4 text-sm sm:p-5">
            <div className="space-y-2">
              <ConfigRow k="school">
                <span className="font-semibold text-text">
                  {education.school}
                </span>
              </ConfigRow>
              <ConfigRow k="degree">{education.degree}</ConfigRow>
              <ConfigRow k="gpa">
                <span className="font-semibold text-green">
                  {education.gpa}
                </span>
              </ConfigRow>
              <ConfigRow k="graduation">{education.graduation}</ConfigRow>
              <ConfigRow k="location">{education.location}</ConfigRow>
            </div>

            <div>
              <span className="text-teal">honors:</span>
              <ul className="mt-1.5 space-y-1">
                {education.honors.map((h) => (
                  <li key={h} className="flex gap-2 text-subtext1">
                    <span className="text-mauve" aria-hidden>
                      -
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-teal">coursework:</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-md border border-surface1/70 bg-surface0/40 px-2 py-0.5 text-xs text-subtext1 transition-colors hover:border-mauve/60 hover:text-text"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* CTAs */}
      <Reveal delay={0.2} className="mt-10">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onGoto("projects")}
            className="group rounded-md border border-surface1 bg-surface0/30 px-4 py-2 text-sm text-subtext1 transition-colors hover:border-mauve hover:bg-mauve/10 hover:text-text"
          >
            <span className="mr-2 text-mauve">{"❯"}</span>
            view projects
          </button>
          <button
            type="button"
            onClick={() => onGoto("contact")}
            className="group rounded-md border border-surface1 bg-surface0/30 px-4 py-2 text-sm text-subtext1 transition-colors hover:border-teal hover:bg-teal/10 hover:text-text"
          >
            <span className="mr-2 text-teal">{"❯"}</span>
            get in touch
          </button>
        </div>
      </Reveal>
    </section>
  );
}
