"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * VOID/ACID — scroll reveal. translateY(10px) → 0, opacity 0 → 1,
 * 1000ms, cubic-bezier(0.16, 1, 0.3, 1).
 */
const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered word reveal — each word slides up from translateY(100%)
 * behind an overflow-hidden mask. Used for the hero headline.
 */
export function RevealWords({ text, className = "", wordClassName = "", delay = 0 }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block overflow-hidden align-bottom ${
            i < words.length - 1 ? "mr-[0.22em]" : ""
          }`}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: delay + i * 0.08, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
