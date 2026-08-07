"use client";

import Reveal from "@/components/system/Reveal";
import SystemDiagram from "@/components/hero/SystemDiagram";

const CTA =
  "mono-meta group inline-flex items-center gap-3 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function Hero() {
  return (
    <section
      id="top"
      className="bg-void px-6 pb-16 pt-32 sm:px-10 sm:pb-20 lg:min-h-screen lg:px-12 lg:pb-16"
    >
      {/* 40 / 60 split. Text and CTAs left, the system diagram right. */}
      <div className="grid items-center gap-16 lg:min-h-[calc(100vh-14rem)] lg:grid-cols-[2fr_3fr] lg:gap-20">
        {/* LEFT — text only, generous whitespace */}
        <div className="max-w-md">
          <Reveal>
            <p className="mono-meta text-hard">
              FULL STACK DEVELOPER —{" "}
              <span className="text-toxic">AVAILABLE</span>
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-10 text-4xl font-medium uppercase leading-[1.02] tracking-[-0.035em] text-pure sm:text-5xl xl:text-[3.5rem]">
              M Harshavardhana Raju
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-xl font-normal uppercase tracking-[-0.02em] text-toxic sm:text-2xl">
              Web Apps &amp; Automation
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-hard">
              I take disconnected business processes, engineer custom web
              applications, and automate the workflows between them into one
              reliable system. Based in Chennai, India.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              <a href="#works" className={`${CTA} text-pure hover:text-toxic`}>
                VIEW WORK
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  →
                </span>
              </a>
              <a href="#inquiry" className={`${CTA} text-hard hover:text-pure`}>
                GET IN TOUCH
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — the system diagram. Hidden below lg, where it would be
            illegible at module-label scale and the text column stands alone. */}
        <div className="hidden lg:block">
          <SystemDiagram />
        </div>
      </div>
    </section>
  );
}
