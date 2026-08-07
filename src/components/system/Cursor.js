"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const POINTER_FINE = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  const queries = [window.matchMedia(POINTER_FINE), window.matchMedia(REDUCED_MOTION)];
  queries.forEach((q) => q.addEventListener("change", callback));
  return () => queries.forEach((q) => q.removeEventListener("change", callback));
}

const getSnapshot = () =>
  window.matchMedia(POINTER_FINE).matches &&
  !window.matchMedia(REDUCED_MOTION).matches;

// Never render on the server — the native cursor is the SSR default.
const getServerSnapshot = () => false;

/**
 * Custom cursor — 32px circle, 1px solid black, white fill,
 * mix-blend-mode: difference. rAF lerp (0.15) for lag,
 * 2.5x scale over any interactive element.
 *
 * Feature-detected off on touch devices and under prefers-reduced-motion,
 * rather than merely hidden with CSS.
 */
export default function Cursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.customCursor = "on";

    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    target.current = { ...pos.current };

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      setHovering(Boolean(e.target.closest?.("a, button, [role='radio']")));
    };

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      delete document.body.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-hard bg-toxic mix-blend-difference"
      style={{
        transition: "scale 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        scale: hovering ? "2.5" : "1",
      }}
    />
  );
}
