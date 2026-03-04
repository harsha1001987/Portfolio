"use client";

import { motion } from "framer-motion";
import { Code, Layout, PenTool } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building dynamic, scalable websites and web applications using modern full-stack technologies. From REST APIs to real-time features.",
  },
  {
    icon: Layout,
    title: "UI Development",
    description:
      "Transforming design mockups into responsive, pixel-perfect web interfaces with clean component architecture and smooth interactions.",
  },
  {
    icon: PenTool,
    title: "UI Designing",
    description:
      "Crafting intuitive, visually compelling interfaces in Figma — wireframes, prototypes, and design systems that prioritize user experience.",
  },
];

const cardVariant = {
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

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-28 px-6">
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
            What I Do
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Services
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                className="group relative bg-surface rounded-2xl border border-border p-8 hover:border-accent-gold/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-accent-gold/50 to-transparent" />
                <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-accent-gold/50 to-transparent" />

                <div className="w-12 h-12 rounded-xl bg-brand-burgundy/40 border border-border flex items-center justify-center mb-5 group-hover:border-accent-gold/30 transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-accent-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold mb-3 group-hover:text-accent-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
