"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:matlaharshavardhanaraju@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matla-harshavardhanaraju-331037371/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/harsha1001987",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-surface rounded-3xl border border-border p-10 sm:p-14 text-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent-gold/[0.03] rounded-full blur-[100px]" />
          </div>

          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-accent-gold/40 to-transparent" />
          <div className="absolute top-0 left-0 h-20 w-px bg-gradient-to-b from-accent-gold/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-accent-gold/40 to-transparent" />
          <div className="absolute bottom-0 right-0 h-20 w-px bg-gradient-to-t from-accent-gold/40 to-transparent" />

          <div className="relative z-10">
            <p className="text-xs tracking-[0.3em] uppercase text-accent-gold mb-4">
              Get in Touch
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4 leading-snug">
              Let&apos;s build something clean,
              <br className="hidden sm:block" /> fast, and{" "}
              <span className="text-accent-gold italic">memorable</span>.
            </h2>
            <p className="text-muted-text text-sm sm:text-base mb-10 max-w-md mx-auto">
              Open to freelance projects, collaborations, and full-time
              opportunities. Let&apos;s talk.
            </p>

            {/* Contact Links */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border text-muted-text rounded-full hover:border-accent-gold/50 hover:text-accent-gold hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
