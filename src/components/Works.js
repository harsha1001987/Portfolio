"use client";

import Reveal from "@/components/system/Reveal";
import ProjectMedia from "@/components/system/ProjectMedia";
import { projects, featured } from "@/data/projects";

/**
 * Selected Works — 2-column asymmetric masonry, even-numbered items offset
 * 4rem to break row alignment.
 *
 * The featured project is excluded here on purpose: it already has the
 * spotlight section above, and listing it twice was the repetition. To show
 * all three instead, drop the .filter() below.
 */
const grid = projects.filter((p) => p.slug !== featured.slug);

export default function Works() {
  return (
    <section id="works" className="bg-void px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="headline text-6xl text-pure sm:text-8xl lg:text-9xl">
          Selected Works
        </h2>
        <p className="mono-meta text-toxic">
          {String(projects.length).padStart(2, "0")} PROJECTS
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-8 gap-y-16 sm:mt-24 md:grid-cols-2">
        {grid.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.08}
            className={i % 2 === 1 ? "md:mt-16" : ""}
          >
            <article>
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden border border-hard"
                aria-label={`${p.name} — view live site`}
              >
                <ProjectMedia project={p} scale="group-hover:scale-110" />

                {/* Hover: 60% void veil + toxic circular VIEW tag */}
                <span className="absolute inset-0 bg-void/60 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-24 w-24 scale-90 items-center justify-center rounded-full bg-toxic opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100">
                    <span className="mono-meta text-void">VIEW</span>
                  </span>
                </span>
              </a>

              {/* Metadata row */}
              <div className="mt-6 border-t border-hard pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="headline text-3xl text-pure sm:text-4xl">
                    {p.name}
                  </h3>
                  <span className="mono-meta text-hard">{p.year}</span>
                </div>

                <p className="mono-meta mt-3 text-toxic">{p.stack.join(" / ")}</p>

                <p className="mt-4 max-w-md text-base text-hard">
                  {p.description}
                </p>

                <a
                  href={p.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-meta group mt-6 inline-flex items-center gap-3 text-pure hover:text-toxic"
                >
                  SOURCE
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    →
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
