"use client";

import Reveal from "@/components/system/Reveal";
import ProjectMedia from "@/components/system/ProjectMedia";
import { featured } from "@/data/projects";

/**
 * Featured spotlight — inverted Raw Bone section, two columns.
 * Left: image with a toxic square offset -48px behind it.
 * Right: mono label, large heading, body, arrow link shifting +8px.
 *
 * Note: accent-toxic as *text* is illegible on bone, so on light sections it
 * only ever appears as a fill block behind dark type.
 */
export default function Featured() {
  return (
    <section className="border-b-2 border-hard bg-bone px-6 py-24 text-void sm:px-10 sm:py-32 lg:px-12">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -bottom-12 -right-12 hidden h-64 w-64 bg-toxic opacity-20 sm:block"
          />
          <a
            href={featured.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/5] overflow-hidden border border-hard"
            aria-label={`${featured.name} — view live site`}
          >
            <ProjectMedia
              project={featured}
              scale="group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mono-meta">
            <span className="bg-void px-2 py-1 text-toxic">01 — FEATURED</span>
          </p>

          <h2 className="headline mt-6 text-5xl sm:text-6xl lg:text-7xl">
            {featured.name}
          </h2>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-void/70">
            {featured.description}
          </p>

          <p className="mono-meta mt-8 text-void/60">
            {featured.stack.join(" / ")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={featured.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-meta group inline-flex items-center gap-3 border border-hard px-5 py-3 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-void hover:bg-toxic"
            >
              VIEW PROJECT
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                →
              </span>
            </a>
            <a
              href={featured.code}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-meta group inline-flex items-center gap-3 px-1 py-3 text-void/60 hover:text-void"
            >
              SOURCE
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
