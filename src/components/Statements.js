"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Statement carousel — inverted Raw Bone section. No client testimonials
 * exist yet, so this rotates positioning lines rather than attributing
 * quotes to invented people.
 */
const statements = [
  "BUILT TO SHIP. BUILT TO RUN ITSELF.",
  "SYSTEMS THAT DON'T NEED BABYSITTING.",
  "IF IT'S MANUAL AND WEEKLY, IT SHOULD BE A SCRIPT.",
];

const EASE = [0.16, 1, 0.3, 1];

export default function Statements() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % statements.length),
      5000
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="border-y-2 border-hard bg-bone px-6 py-28 text-void sm:px-10 sm:py-40 lg:px-12">
      <p className="mono-meta">
        <span className="bg-void px-2 py-1 text-toxic">POSITION</span>
      </p>

      <div className="mt-10 min-h-[8rem] sm:min-h-[11rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 1, ease: EASE }}
            className="headline max-w-5xl text-4xl sm:text-6xl lg:text-7xl"
          >
            {statements[index]}
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Discrete indicators — double as manual controls */}
      <div className="mt-12 flex gap-3">
        {statements.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show statement ${i + 1}`}
            aria-current={i === index}
            className={`h-1 w-12 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === index ? "bg-alert" : "bg-hard hover:bg-void"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
