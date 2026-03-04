"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-brand-burgundy/30 rounded-full blur-[100px]" />
      </div>

      {/* Added -mt-16 to adjust the optical center and pull the content up slightly */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center -mt-16">

        {/* Minimalist Status Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/30 text-muted-text text-sm mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          Available for New Projects
        </motion.div>

        {/* Kicker — Identity line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-muted-text mb-5"
        >
          <span className="h-px w-6 bg-accent-gold/40" />
          M Harshavardhana Raju
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
          Full Stack Developer
          <span className="h-px w-6 bg-accent-gold/40" />
        </motion.p>

        {/* H1 — Outfit heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter mb-6"
        >
          Crafting{" "}
          <span className="text-accent-gold">creative</span>
          , <span className="whitespace-nowrap">high‑performance</span>
          <br className="hidden sm:block" />{" "}
          <span className="text-accent-gold">web experiences</span>.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="text-muted-text text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building polished, performant applications from concept to deployment.
          Clean code, thoughtful design, real results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 bg-accent-gold text-background font-semibold text-sm rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 border border-accent-gold/50 text-accent-gold font-medium text-sm rounded-full hover:bg-accent-gold/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  );
}