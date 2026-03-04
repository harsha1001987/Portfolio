"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    label: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React JS","Next JS"],
  },
  {
    label: "Backend",
    skills: ["Node JS", "Express JS"],
  },
  {
    label: "Databases",
    skills: ["SQL", "MongoDB"],
  },
  {
    label: "Programming Languages",
    skills: ["Python", "C++", "C#", "Java", ],
  },
  {
    label: "Design Tools",
    skills: ["Figma"],
  },
];

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent-gold mb-3">
            Tech Stack
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Skills & Tools
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 gap-8"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={itemVariant}
              className="bg-surface rounded-2xl border border-border p-6 hover:border-accent-gold/20 transition-colors duration-500"
            >
              <h3 className="text-sm tracking-[0.15em] uppercase text-accent-gold font-medium mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 text-sm text-muted-text bg-brand-burgundy/30 border border-border rounded-full hover:border-accent-gold/40 hover:text-accent-gold transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
