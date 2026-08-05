import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  Medal,
  Award as AwardIcon,
  GraduationCap,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { awards } from "@/data/awards";
import type { Award } from "@/data/types";

type RankKey = "first" | "silver" | "bronze" | "runnerup" | "honor";

interface RankStyle {
  /** Icon that captures the flavor of the win. */
  Icon: LucideIcon;
  /** Accent text color for event + icon. */
  text: string;
  /** Full class string for the prominent place badge. */
  badge: string;
  /** Hover border accent for the card. */
  hover: string;
}

/** Rank -> visual treatment. Full class literals so Tailwind can see them. */
const RANK_STYLES: Record<RankKey, RankStyle> = {
  first: {
    Icon: Trophy,
    text: "text-yellow",
    badge: "border-yellow/40 bg-yellow/10 text-yellow",
    hover: "hover:border-yellow/60",
  },
  silver: {
    Icon: Medal,
    text: "text-subtext1",
    badge: "border-surface2/70 bg-surface1/40 text-subtext1",
    hover: "hover:border-subtext0/50",
  },
  bronze: {
    Icon: Medal,
    text: "text-peach",
    badge: "border-peach/40 bg-peach/10 text-peach",
    hover: "hover:border-peach/60",
  },
  runnerup: {
    Icon: AwardIcon,
    text: "text-blue",
    badge: "border-blue/40 bg-blue/10 text-blue",
    hover: "hover:border-blue/60",
  },
  honor: {
    Icon: GraduationCap,
    text: "text-mauve",
    badge: "border-mauve/40 bg-mauve/10 text-mauve",
    hover: "hover:border-mauve/60",
  },
};

/** Derive the rank treatment from the label in `place`. */
function rankKey(place: string): RankKey {
  if (place.includes("Honor")) return "honor";
  if (place.includes("Runner")) return "runnerup";
  if (place.includes("2nd")) return "silver";
  if (place.includes("3rd")) return "bronze";
  return "first"; // 1st / Various
}

/** A subtle "·" meta separator. */
function Dot() {
  return (
    <span className="text-surface2" aria-hidden>
      ·
    </span>
  );
}

function AwardCard({ award }: { award: Award }) {
  const style = RANK_STYLES[rankKey(award.place)];
  const { Icon } = style;

  return (
    <article
      data-vim-stop
      data-vim-label={award.title}
      className={`flex h-full flex-col rounded-lg border border-surface0 bg-mantle/40 p-5 transition-colors ${style.hover}`}
    >
      {/* Rank badge + flavor icon */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-bold ${style.badge}`}
        >
          {award.place}
        </span>
        <Icon className={`h-5 w-5 shrink-0 ${style.text}`} aria-hidden />
      </div>

      <h3 className="mt-3 font-bold leading-snug text-text">{award.title}</h3>

      {/* Meta: event · host · year · sponsor */}
      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-overlay1">
        <span className={style.text}>{award.event}</span>
        <Dot />
        <span>{award.host}</span>
        <Dot />
        <span>{award.year}</span>
        {award.sponsor && (
          <>
            <Dot />
            <span>
              sponsor: <span className="text-overlay2">{award.sponsor}</span>
            </span>
          </>
        )}
      </p>

      {award.project && (
        <p className="mt-2 text-xs text-teal">
          {"→ "}project: {award.project}
        </p>
      )}

      <p className="mt-3 flex items-center gap-1.5 text-xs text-overlay0">
        <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {award.scale}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-subtext1">{award.blurb}</p>
    </article>
  );
}

export default function Awards() {
  const podiums = awards.filter((a) => /1st|2nd|3rd/.test(a.place)).length;

  return (
    <section id="awards" className="scroll-mt-6">
      <SectionHeader file="awards.md" title="Awards" hint="git tag --list" />

      {/* Terminal-flavored summary line reinforcing the "git tag" motif */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-overlay1">
          <span className="text-green">$</span>
          <span className="text-subtext0">git tag --list</span>
          <Dot />
          <span>
            <span className="font-semibold text-text">{awards.length}</span>{" "}
            awards
          </span>
          <Dot />
          <span>
            <span className="font-semibold text-text">{podiums}</span> podium
            finishes
          </span>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {awards.map((award, i) => (
          <Reveal key={award.id} delay={i * 0.06} className="h-full">
            <AwardCard award={award} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
