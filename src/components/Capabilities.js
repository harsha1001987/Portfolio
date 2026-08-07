"use client";

import Reveal from "@/components/system/Reveal";

const services = [
  "WEB APPLICATIONS",
  "BUSINESS AUTOMATION",
  "UI DEVELOPMENT",
  "UI DESIGN",
];

/**
 * Full stack matrix. Languages carry proficiency levels — ADVANCED reads
 * toxic, INTERMEDIATE pure, BASIC gray, so the level is legible at a glance
 * without any color outside the palette.
 */
const stack = [
  {
    label: "LANGUAGES",
    tools: [
      { name: "C++", level: "ADVANCED" },
      { name: "PYTHON", level: "INTERMEDIATE" },
      { name: "JAVA", level: "INTERMEDIATE" },
      { name: "JAVASCRIPT", level: "BASIC" },
    ],
  },
  {
    label: "FRONTEND",
    tools: [
      { name: "REACT.JS" },
      { name: "NEXT.JS" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "TAILWIND CSS" },
    ],
  },
  {
    label: "BACKEND",
    tools: [{ name: "NODE.JS" }, { name: "EXPRESS.JS" }],
  },
  {
    label: "DATABASES",
    tools: [{ name: "MONGODB" }, { name: "SQL" }, { name: "SUPABASE" }],
  },
  {
    label: "TOOLS & DEVOPS",
    tools: [
      { name: "GIT/GITHUB" },
      { name: "REST APIS" },
      { name: "JWT AUTH" },
      { name: "CI/CD PIPELINES" },
      { name: "NETLIFY" },
      { name: "RENDER" },
      { name: "VERCEL" },
      { name: "CLOUDFLARE" },
      { name: "HOSTINGER" },
    ],
  },
];

const LEVEL_COLOR = {
  ADVANCED: "text-toxic",
  INTERMEDIATE: "text-pure",
  BASIC: "text-hard",
};

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="border-t border-hard bg-void px-6 py-24 sm:px-10 sm:py-32 lg:px-12"
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        {/* Cols 1–4 — services, rules extend on hover */}
        <Reveal className="lg:col-span-4">
          <p className="mono-meta text-hard">CAPABILITIES</p>

          <ul className="mt-8 flex flex-col gap-5">
            {services.map((item) => (
              <li key={item}>
                <span className="group flex items-center gap-4">
                  <span className="block h-px w-10 shrink-0 bg-hard transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16 group-hover:bg-toxic" />
                  <span className="mono-meta text-pure transition-colors duration-500 group-hover:text-toxic">
                    {item}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Cols 5–12 — positioning statement, one alert highlight */}
        <Reveal delay={0.1} className="lg:col-span-8">
          <p className="text-3xl leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            I build web applications that{" "}
            <em className="italic text-toxic">perform</em> and automate the
            workflows that <em className="italic text-alert">waste your time</em>.
          </p>
        </Reveal>
      </div>

      {/* Stack matrix */}
      <div className="mt-24 border-t border-hard sm:mt-32">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="grid gap-3 border-b border-hard py-7 md:grid-cols-[16rem_1fr] md:items-baseline md:gap-8">
              <p className="mono-meta text-toxic">{group.label}</p>

              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                {group.tools.map((tool) => (
                  <li key={tool.name} className="flex items-baseline gap-2">
                    <span className="headline text-2xl text-pure transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-toxic sm:text-3xl">
                      {tool.name}
                    </span>
                    {tool.level && (
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                          LEVEL_COLOR[tool.level]
                        }`}
                      >
                        [{tool.level}]
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Education */}
      <Reveal className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="mono-meta text-hard">EDUCATION</p>
        <p className="mono-meta text-pure">
          B.TECH COMPUTER SCIENCE (KALVIUM) — KALASALINGAM UNIVERSITY
        </p>
      </Reveal>
    </section>
  );
}
