"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent-gold mb-3">
            Background
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            About Me
          </h2>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex items-start gap-4 mb-8 bg-surface rounded-2xl border border-border p-6"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-burgundy/40 border border-border flex items-center justify-center shrink-0">
            <GraduationCap
              size={20}
              className="text-accent-gold"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] text-base sm:text-lg font-semibold mb-1">
              B.Tech in Computer Science{" "}
              <span className="text-accent-gold">(KALVIUM)</span>
            </h3>
            <p className="text-muted-text text-sm">
              Kalasalingam University
            </p>
          </div>
        </motion.div>

        {/* Gold Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent mb-8 origin-left"
        />

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="text-muted-text text-base sm:text-lg leading-relaxed">
            I&apos;m a full stack developer who cares deeply about the intersection
            of clean engineering and thoughtful design. I build applications that
            are performant under the hood and polished on the surface — from
            scalable REST APIs to pixel-perfect responsive interfaces. My
            toolkit spans React, Node.js, and modern databases, and I approach
            every project with a focus on real-world usability, maintainable
            code, and visual attention to detail.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
