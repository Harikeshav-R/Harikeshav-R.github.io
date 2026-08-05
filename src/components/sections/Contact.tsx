import { useState } from "react";
import type { ComponentType } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Globe,
  Copy,
  Check,
  MapPin,
} from "lucide-react";
import { SectionHeader, Prompt } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { socials, profile } from "@/data/profile";
import type { SocialLink } from "@/data/types";

/** Maps a SocialLink icon key to its lucide component. */
const ICONS: Record<SocialLink["icon"], ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  file: FileText,
  globe: Globe,
};

/** External links open in a new tab; mailto + local files navigate normally. */
function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** Three faux window dots for the terminal chrome bar. */
function WindowDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
    </div>
  );
}

/** Small icon button that copies the email to the clipboard. */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard?.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context / denied) — fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="shrink-0 rounded-md border border-surface1/70 bg-surface0/40 p-1.5 text-overlay1 transition-colors hover:border-teal/60 hover:text-teal"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

/** A single contact link rendered as a terminal output row. */
function ContactRow({ social }: { social: SocialLink }) {
  const Icon = ICONS[social.icon];
  const external = isExternal(social.href);
  const isEmail = social.icon === "mail";

  return (
    <div
      data-vim-stop
      data-vim-label={social.label}
      className="group relative flex items-center gap-2 rounded-md border border-surface0 bg-surface0/20 px-3 py-2.5 transition-colors hover:border-mauve/50 hover:bg-surface0/50"
    >
      <a
        href={social.href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="flex min-w-0 flex-1 items-center gap-3 focus:outline-none"
      >
        <Icon className="h-4 w-4 shrink-0 text-overlay1 transition-colors group-hover:text-mauve" />
        <span className="flex min-w-0 flex-1 items-baseline gap-2">
          <span className="shrink-0 text-blue transition-colors group-hover:text-lavender">
            {social.label}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-subtext1">
            {social.value}
          </span>
        </span>
      </a>
      {isEmail && <CopyEmailButton />}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-6">
      <SectionHeader file="contact.md" title="Contact" hint="./connect.sh" />

      <Reveal>
        <Prompt className="mb-6">
          got a role, a project, or just want to say hi? my inbox is open.
        </Prompt>

        {/* Fake terminal window running connect.sh */}
        <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-surface0 bg-mantle/60">
          {/* Chrome bar */}
          <div className="flex items-center gap-3 border-b border-surface0 bg-crust/70 px-3 py-2">
            <WindowDots />
            <span className="text-xs text-subtext0">bash — connect.sh</span>
          </div>

          {/* Terminal body */}
          <div className="space-y-4 p-4 text-sm sm:p-5">
            {/* whoami */}
            <div>
              <p>
                <span className="mr-2 text-green">$</span>
                <span className="text-subtext0">whoami</span>
              </p>
              <p className="mt-1 pl-4 text-text">
                {profile.name}{" "}
                <span className="text-overlay1">— {profile.title}</span>
              </p>
            </div>

            {/* cat contact.md → links */}
            <div>
              <p className="mb-3">
                <span className="mr-2 text-green">$</span>
                <span className="text-subtext0">cat contact.md</span>
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {socials.map((social) => (
                  <ContactRow key={social.label} social={social} />
                ))}
              </div>

              {/* location + website */}
              <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-6">
                <span className="flex items-center gap-2 text-subtext1">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-peach" aria-hidden />
                  {profile.location}
                </span>
                <span className="flex items-center gap-2 text-subtext1">
                  <Globe className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky transition-colors hover:text-blue"
                  >
                    {profile.website}
                  </a>
                </span>
              </div>
            </div>

            {/* Closing comment + live prompt */}
            <p className="text-overlay0">
              {"// open to SWE / AI internship + new-grad conversations"}
            </p>
            <p aria-hidden>
              <span className="mr-2 text-green">$</span>
              <span className="cursor-block" />
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
