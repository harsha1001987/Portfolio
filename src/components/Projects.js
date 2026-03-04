"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "LockIn",
    description: "Structured financial education platform focused on markets, discipline, and crash decision training.",
    tech: ["Next.js , Supabase , Tailwind CSS , Custom Charts"],
    highlights: [
       "Interactive crash simulator with long-term outcome visualization",
       "Framework-based learning (no tips, no hype)",
    ],
    gradient: "from-[#2A0A1E] via-[#1A0612] to-[#0D0509]",
    accent: "bg-rose-500/10",
    // Added individual links here:
    liveLink: "https://lock-in-one-mocha.vercel.app/",
    githubLink: "https://github.com/harsha1001987/LockIn",
  },
  {
    title: "PaleoPath",
    description: "an interactive human evolution explorer with a timeline, species pages, quizzes, and survival mode.",
    tech: ["React 18 + Vite", "React Router v6", "Framer Motion"],
    highlights: [
      "Progressive species UI: unique look + quiz + survival mode per species.",
      "Session-based progress: onboarding badge + localStorage scores (auto-reset)",
    ],
    gradient: "from-[#0E1A2A] via-[#0A1118] to-[#060B0F]",
    accent: "bg-blue-500/10",
    // Added individual links here:
    liveLink: "https://paleo-path.vercel.app/",
    githubLink: "https://github.com/harsha1001987/PaleoPath",
  },
  {
    title: "ShopZen",
    description: "Modern e-commerce interface with cart and checkout flow.",
    tech: ["React", "Node.js", "Stripe"],
    highlights: [
      "Dynamic cart with real-time total updates",
      "Mock payment integration with Stripe UI",
    ],
    gradient: "from-[#1A2A0E] via-[#111A08] to-[#0B0F05]",
    accent: "bg-emerald-500/10",
    // Added individual links here:
    liveLink: "https://your-shopzen-live-link.com",
    githubLink: "https://github.com/yourusername/shopzen",
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent-gold mb-3">
            Selected Work
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              variants={cardFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="group relative grid md:grid-cols-[1fr_1.3fr] gap-6 md:gap-0 bg-surface rounded-2xl border border-border overflow-hidden hover:border-accent-gold/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-gold/[0.04] transition-all duration-500"
            >
              {/* Thumbnail */}
              <div
                className={`relative h-52 md:h-full bg-gradient-to-br ${project.gradient} overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <span className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-semibold text-white/20 group-hover:text-white/30 transition-colors duration-500">
                    {project.title}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="font-[family-name:var(--font-outfit)] text-xl sm:text-2xl font-semibold mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-text text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] tracking-wide uppercase bg-brand-burgundy/40 text-muted-text rounded-md border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-6">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-muted-text flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-gold/60 mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.liveLink} // Updated to use dynamic link
                    target="_blank" // Added so it opens in a new tab
                    rel="noopener noreferrer" // Added for security when opening new tabs
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full hover:bg-accent-gold hover:text-background transition-all duration-300"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                  <a
                    href={project.githubLink} // Updated to use dynamic link
                    target="_blank" // Added so it opens in a new tab
                    rel="noopener noreferrer" // Added for security when opening new tabs
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border border-border text-muted-text rounded-full hover:border-accent-gold/40 hover:text-accent-gold transition-all duration-300"
                    aria-label={`View source code of ${project.title}`}
                  >
                    <Github size={14} />
                    Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}