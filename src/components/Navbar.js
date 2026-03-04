"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-1.5 group"
        >
          <span className="text-xl font-bold font-[family-name:var(--font-outfit)] text-text tracking-tight">
            Portfolio
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold group-hover:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-sm text-muted-text hover:text-accent-gold transition-colors duration-300 py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="ml-2 px-5 py-2 text-sm font-medium border border-accent-gold/60 text-accent-gold rounded-full hover:bg-accent-gold hover:text-background transition-all duration-300"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-px bg-text transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
          />
          <span
            className={`block w-6 h-px bg-text transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-border"
        >
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-muted-text hover:text-accent-gold transition-colors text-lg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="inline-block mt-2 px-5 py-2 text-sm font-medium border border-accent-gold/60 text-accent-gold rounded-full hover:bg-accent-gold hover:text-background transition-all duration-300"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
