"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SYSTEM DIAGRAM — the hero's right column.
 *
 * A 14s seamless loop that explains the work rather than decorating it:
 * fragmented business tools → analysis → orthogonal architecture → a central
 * system → automated data flow → an operational, value-generating state.
 *
 * Implementation notes:
 * - One master clock. Every element animates with `duration: LOOP` and
 *   `repeat: Infinity`, so the whole diagram stays phase-locked without a
 *   per-frame React render — Framer hands the keyframes to the compositor.
 * - Packets are the exception: they use `delay` + `repeatDelay` summing to
 *   LOOP, which keeps them on the same period.
 * - All motion is axis-aligned with linear easing. No curves, no springs.
 * - Under prefers-reduced-motion the diagram renders as a static assembled
 *   blueprint — the final state, no movement.
 */

const LOOP = 14;
const t = (sec) => sec / LOOP;

const HARD = "#808080";
const PURE = "#FFFFFF";
const TOXIC = "#CCFF00";

/* --- Geometry ------------------------------------------------------------- */
const W = 880;
const H = 620;
const MW = 150; // module width
const MH = 44; // module height
const LEFT_X = 30;
const RIGHT_X = 700;
const BUS_L = 250; // vertical routing bus, left bank
const BUS_R = 630; // vertical routing bus, right bank
const CORE = { x: 345, y: 278, w: 190, h: 64 };
const AXIS = CORE.y + CORE.h / 2; // 310 — the horizontal spine

/**
 * Each module: which bank it sits on, its row, when it appears, the
 * off-grid offset it snaps back from, and when its packet activates it.
 */
const MODULES = [
  { id: "website", label: "WEBSITE", side: "L", y: 70, appear: 1.2, off: [-12, -9], activate: 8.2 },
  { id: "api", label: "API", side: "R", y: 70, appear: 1.5, off: [14, -7], activate: 9.88 },
  { id: "crm", label: "CRM", side: "L", y: 180, appear: 1.8, off: [-9, 11], activate: 10.14 },
  { id: "email", label: "EMAIL", side: "R", y: 180, appear: 2.1, off: [11, 8], activate: 9.86 },
  { id: "database", label: "DATABASE", side: "L", y: 380, appear: 2.4, off: [-13, -6], activate: 9.58 },
  { id: "dashboard", label: "DASHBOARD", side: "R", y: 380, appear: 2.7, off: [12, -10], activate: 10.42 },
  { id: "payments", label: "PAYMENTS", side: "L", y: 490, appear: 3.0, off: [-8, 12], activate: 9.6 },
  { id: "reports", label: "REPORTS", side: "R", y: 490, appear: 3.3, off: [13, 9], activate: 11.26 },
];

const moduleX = (m) => (m.side === "L" ? LEFT_X : RIGHT_X);
const moduleCY = (m) => m.y + MH / 2;

/** Orthogonal route from a module's inner edge to the core. 90° corners only. */
function routePoints(m) {
  const cy = moduleCY(m);
  return m.side === "L"
    ? [
        [LEFT_X + MW, cy],
        [BUS_L, cy],
        [BUS_L, AXIS],
        [CORE.x, AXIS],
      ]
    : [
        [RIGHT_X, cy],
        [BUS_R, cy],
        [BUS_R, AXIS],
        [CORE.x + CORE.w, AXIS],
      ];
}

const toPath = (pts) =>
  pts
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : x === pts[i - 1][0] ? `V ${y}` : `H ${x}`))
    .join(" ");

/* --- Scene timeline (seconds) --------------------------------------------- */
const SCENES = [
  { at: 0.0, label: "01 / EMPTY WORKSPACE" },
  { at: 1.2, label: "02 / INDEPENDENT SYSTEMS" },
  { at: 3.8, label: "03 / ANALYSIS" },
  { at: 6.0, label: "04 / ARCHITECTURE" },
  { at: 7.4, label: "05 / INTEGRATION" },
  { at: 8.2, label: "06 / AUTOMATION" },
  { at: 10.6, label: "07 / OPERATIONAL" },
  { at: 12.0, label: "08 / STABLE" },
  { at: 12.9, label: "09 / RESET" },
];

const DISSOLVE_START = 12.9;
const DISSOLVE_END = 13.9;

/* --- Data packets: the workflow, step by step ----------------------------- */
const FLOW = [
  { from: "website", dir: "in", start: 8.2 }, // customer submits form
  { from: "database", dir: "out", start: 8.48 }, // data stored
  { from: "email", dir: "out", start: 8.76 }, // email sent
  { from: "crm", dir: "out", start: 9.04 }, // CRM updated
  { from: "dashboard", dir: "out", start: 9.32 }, // dashboard refreshed
  { from: "payments", dir: "in", start: 9.6 }, // payment event ingested
  { from: "api", dir: "in", start: 9.88 }, // API event ingested
  { from: "reports", dir: "out", start: 10.16 }, // reports generated
];
const PACKET_DUR = 1.1;

/* --- Cursor inspection stops (drafting selector) -------------------------- */
const INSPECT = ["website", "api", "database", "dashboard"];

export default function SystemDiagram() {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState(0);

  // Scene caption only — polled at 4Hz and set only on change, so this never
  // drives the animation itself.
  useEffect(() => {
    if (reduced) return;
    const t0 = performance.now();
    const id = setInterval(() => {
      const elapsed = ((performance.now() - t0) / 1000) % LOOP;
      let next = 0;
      for (let i = 0; i < SCENES.length; i += 1) {
        if (elapsed >= SCENES[i].at) next = i;
      }
      setScene((prev) => (prev === next ? prev : next));
    }, 250);
    return () => clearInterval(id);
  }, [reduced]);

  const still = Boolean(reduced);
  // Static render sits on the operational scene — the assembled end state.
  const caption = still ? SCENES[6] : SCENES[scene];

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Diagram: disconnected business tools — a website, CRM, database, API, payments, email, dashboard and reports — being wired through a central custom system that automates the workflow between them."
      >
        {/* SCENE 01 — construction grid. Always present, extremely faint. */}
        <g stroke={HARD} strokeWidth="1" opacity="0.12">
          {Array.from({ length: Math.floor(W / 40) + 1 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2={H} />
          ))}
          {Array.from({ length: Math.floor(H / 40) + 1 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2={W} y2={i * 40} />
          ))}
        </g>
        {/* Datum lines — the spine the machine assembles against */}
        <g stroke={HARD} strokeWidth="1" opacity="0.25" strokeDasharray="2 6">
          <line x1="0" y1={AXIS} x2={W} y2={AXIS} />
          <line x1={BUS_L} y1="0" x2={BUS_L} y2={H} />
          <line x1={BUS_R} y1="0" x2={BUS_R} y2={H} />
        </g>

        {/* SCENE 04 — orthogonal connections drawn from each module to the core */}
        {MODULES.map((m, i) => {
          const d = toPath(routePoints(m));
          if (still) {
            return <path key={`c-${m.id}`} d={d} fill="none" stroke={HARD} strokeWidth="1" />;
          }
          return (
            <motion.path
              key={`c-${m.id}`}
              d={d}
              fill="none"
              stroke={HARD}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0, 1, 1, 1],
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                duration: LOOP,
                repeat: Infinity,
                ease: "linear",
                times: [
                  0,
                  t(6.0 + i * 0.12),
                  t(6.9 + i * 0.12),
                  t(DISSOLVE_START),
                  t(DISSOLVE_END),
                ],
              }}
            />
          );
        })}

        {/* SCENE 02 / 04 / 06 — the modules themselves */}
        {MODULES.map((m) => (
          <Module key={m.id} m={m} still={still} />
        ))}

        {/* SCENE 05 — the central system. Weight comes from placement, not scale. */}
        <Core still={still} />

        {/* SCENE 03 — drafting selector inspecting each module */}
        {!still && <Selector />}

        {/* SCENE 06 — data packets moving through the built pathways */}
        {!still &&
          FLOW.map((f) => {
            const m = MODULES.find((x) => x.id === f.from);
            const pts = routePoints(m);
            return (
              <Packet
                key={`p-${f.from}`}
                points={f.dir === "in" ? pts : [...pts].reverse()}
                start={f.start}
              />
            );
          })}

        {/* SCENE 07 — operational readout */}
        <Operational still={still} />
      </svg>

      {/* Scene caption — reinforces that this is an explanation, not decoration */}
      <p className="mono-meta mt-6 text-hard">
        <span className="text-toxic">▍</span> {caption.label}
      </p>
    </div>
  );
}

/* ========================================================================== */

function Module({ m, still }) {
  const x = moduleX(m);
  const labelX = m.side === "L" ? x + 14 : x + 14;
  const dotX = m.side === "L" ? x + MW - 20 : x + MW - 20;

  const body = (
    <>
      <rect
        x={x}
        y={m.y}
        width={MW}
        height={MH}
        fill="#050505"
        stroke={still ? PURE : HARD}
        strokeWidth="1"
      />
      <text
        x={labelX}
        y={m.y + MH / 2 + 4}
        fill={still ? PURE : HARD}
        fontSize="12"
        letterSpacing="1.6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {m.label}
      </text>
      <rect x={dotX} y={m.y + MH / 2 - 3} width="6" height="6" fill={still ? TOXIC : HARD} />
    </>
  );

  if (still) return <g>{body}</g>;

  const act = t(m.activate);

  return (
    // Outer group: scene visibility (appear in 02, dissolve in 09)
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{
        duration: LOOP,
        repeat: Infinity,
        ease: "linear",
        times: [0, t(m.appear), t(m.appear + 0.35), t(DISSOLVE_START), t(DISSOLVE_END)],
      }}
    >
      {/* Inner group: snaps from its off-grid position onto the datum in 04 */}
      <motion.g
        initial={{ x: m.off[0], y: m.off[1] }}
        animate={{ x: [m.off[0], m.off[0], 0, 0], y: [m.off[1], m.off[1], 0, 0] }}
        transition={{
          duration: LOOP,
          repeat: Infinity,
          ease: "linear",
          times: [0, t(6.0), t(6.8), 1],
        }}
      >
        <rect x={x} y={m.y} width={MW} height={MH} fill="#050505" stroke="transparent" />
        {/* Border activates as the workflow reaches it, then stays live */}
        <motion.rect
          x={x}
          y={m.y}
          width={MW}
          height={MH}
          fill="none"
          strokeWidth="1"
          initial={{ stroke: HARD }}
          animate={{ stroke: [HARD, HARD, TOXIC, PURE, PURE, HARD] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "linear",
            times: [0, act - 0.004, act + 0.006, act + 0.03, t(DISSOLVE_START), 1],
          }}
        />
        <motion.text
          x={labelX}
          y={m.y + MH / 2 + 4}
          fontSize="12"
          letterSpacing="1.6"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          initial={{ fill: HARD }}
          animate={{ fill: [HARD, HARD, PURE, PURE, HARD] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "linear",
            times: [0, act - 0.004, act + 0.02, t(DISSOLVE_START), 1],
          }}
        >
          {m.label}
        </motion.text>
        {/* Status indicator */}
        <motion.rect
          x={dotX}
          y={m.y + MH / 2 - 3}
          width="6"
          height="6"
          initial={{ fill: HARD }}
          animate={{ fill: [HARD, HARD, TOXIC, TOXIC, HARD] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "linear",
            times: [0, act - 0.004, act + 0.006, t(DISSOLVE_START), 1],
          }}
        />
      </motion.g>
    </motion.g>
  );
}

/* ========================================================================== */

function Core({ still }) {
  const label = "CUSTOM SYSTEM";
  const sub = "AUTOMATION ENGINE";

  const body = (
    <>
      <rect
        x={CORE.x}
        y={CORE.y}
        width={CORE.w}
        height={CORE.h}
        fill="#050505"
        stroke={PURE}
        strokeWidth="2"
      />
      {/* Corner ticks — assembly registration marks */}
      {[
        [CORE.x, CORE.y, 1, 1],
        [CORE.x + CORE.w, CORE.y, -1, 1],
        [CORE.x, CORE.y + CORE.h, 1, -1],
        [CORE.x + CORE.w, CORE.y + CORE.h, -1, -1],
      ].map(([cx, cy, sx, sy], i) => (
        <g key={i} stroke={TOXIC} strokeWidth="2">
          <line x1={cx} y1={cy} x2={cx + 10 * sx} y2={cy} />
          <line x1={cx} y1={cy} x2={cx} y2={cy + 10 * sy} />
        </g>
      ))}
      <text
        x={CORE.x + CORE.w / 2}
        y={CORE.y + 27}
        textAnchor="middle"
        fill={PURE}
        fontSize="14"
        letterSpacing="2"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {label}
      </text>
      <text
        x={CORE.x + CORE.w / 2}
        y={CORE.y + 46}
        textAnchor="middle"
        fill={TOXIC}
        fontSize="10"
        letterSpacing="2"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {sub}
      </text>
    </>
  );

  if (still) return <g>{body}</g>;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{
        duration: LOOP,
        repeat: Infinity,
        ease: "linear",
        times: [0, t(7.4), t(8.0), t(DISSOLVE_START), t(DISSOLVE_END)],
      }}
    >
      {body}
    </motion.g>
  );
}

/* ========================================================================== */

/**
 * Drafting selector — a registration bracket, not a mouse pointer.
 * Steps between modules and holds while it inspects each one.
 */
function Selector() {
  const stops = INSPECT.map((id) => {
    const m = MODULES.find((x) => x.id === id);
    return [moduleX(m) + MW / 2, moduleCY(m)];
  });

  // Move / hold / move / hold ... across 3.8s → 6.2s
  const keyTimes = [t(3.8), t(4.2), t(4.7), t(5.0), t(5.4), t(5.7), t(6.05)];
  const xs = [
    stops[0][0],
    stops[0][0],
    stops[1][0],
    stops[1][0],
    stops[2][0],
    stops[2][0],
    stops[3][0],
  ];
  const ys = [
    stops[0][1],
    stops[0][1],
    stops[1][1],
    stops[1][1],
    stops[2][1],
    stops[2][1],
    stops[3][1],
  ];

  const s = 26; // bracket half-size

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
      transition={{
        duration: LOOP,
        repeat: Infinity,
        ease: "linear",
        times: [0, t(3.7), t(3.95), t(6.05), t(6.35), 1],
      }}
    >
      <motion.g
        initial={{ x: xs[0], y: ys[0] }}
        animate={{ x: xs, y: ys }}
        transition={{
          duration: LOOP,
          repeat: Infinity,
          ease: "linear",
          times: keyTimes,
        }}
      >
        <g stroke={TOXIC} strokeWidth="1.5" fill="none">
          {/* Four corner brackets */}
          <path d={`M ${-s} ${-14} V ${-20} H ${-s + 10}`} />
          <path d={`M ${s} ${-14} V ${-20} H ${s - 10}`} />
          <path d={`M ${-s} ${14} V ${20} H ${-s + 10}`} />
          <path d={`M ${s} ${14} V ${20} H ${s - 10}`} />
        </g>
        {/* Crosshair */}
        <g stroke={TOXIC} strokeWidth="1" opacity="0.7">
          <line x1={-6} y1={0} x2={6} y2={0} />
          <line x1={0} y1={-6} x2={0} y2={6} />
        </g>
      </motion.g>
    </motion.g>
  );
}

/* ========================================================================== */

/**
 * A data packet travelling an orthogonal route at constant speed.
 * `delay` + `repeatDelay` sum to LOOP so it stays phase-locked to the
 * master clock without needing full-loop keyframes.
 */
function Packet({ points, start }) {
  // Distance-proportional keyframe times → constant velocity, no easing.
  const segs = points.slice(1).map((p, i) => {
    const [px, py] = points[i];
    return Math.abs(p[0] - px) + Math.abs(p[1] - py);
  });
  const total = segs.reduce((a, b) => a + b, 0);
  const times = [0];
  let acc = 0;
  segs.forEach((len) => {
    acc += len;
    times.push(acc / total);
  });

  const shared = {
    duration: PACKET_DUR,
    delay: start,
    repeat: Infinity,
    repeatDelay: LOOP - PACKET_DUR,
    ease: "linear",
  };

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ ...shared, times: [0, 0.06, 0.9, 1] }}
    >
      <motion.g
        initial={{ x: points[0][0], y: points[0][1] }}
        animate={{ x: points.map((p) => p[0]), y: points.map((p) => p[1]) }}
        transition={{ ...shared, times }}
      >
        <rect x={-3.5} y={-3.5} width="7" height="7" fill={TOXIC} />
      </motion.g>
    </motion.g>
  );
}

/* ========================================================================== */

/** Scene 07 — minimal operational readout beneath the core. */
function Operational({ still }) {
  const x = CORE.x;
  const y = 384;
  const w = CORE.w;
  const bars = [22, 34, 18, 42, 30, 38];

  const frame = (
    <>
      <rect x={x} y={y} width={w} height="96" fill="#050505" stroke={HARD} strokeWidth="1" />
      <text
        x={x + 12}
        y={y + 18}
        fill={HARD}
        fontSize="9"
        letterSpacing="1.6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        THROUGHPUT
      </text>
      <text
        x={x + w - 12}
        y={y + 18}
        textAnchor="end"
        fill={TOXIC}
        fontSize="9"
        letterSpacing="1.6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        08 / 08 LINKED
      </text>
    </>
  );

  const barBase = y + 74;
  const barW = 14;
  const gap = 10;
  const barsX = x + 12;

  const progressW = w - 24;

  if (still) {
    return (
      <g>
        {frame}
        {bars.map((h, i) => (
          <rect
            key={i}
            x={barsX + i * (barW + gap)}
            y={barBase - h}
            width={barW}
            height={h}
            fill={i % 2 === 0 ? HARD : TOXIC}
          />
        ))}
        <rect x={x + 12} y={y + 84} width={progressW} height="3" fill={HARD} opacity="0.4" />
        <rect x={x + 12} y={y + 84} width={progressW * 0.82} height="3" fill={TOXIC} />
      </g>
    );
  }

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{
        duration: LOOP,
        repeat: Infinity,
        ease: "linear",
        times: [0, t(10.6), t(11.2), t(DISSOLVE_START), t(DISSOLVE_END)],
      }}
    >
      {frame}

      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={barsX + i * (barW + gap)}
          width={barW}
          fill={i % 2 === 0 ? HARD : TOXIC}
          initial={{ y: barBase, height: 0 }}
          animate={{ y: [barBase, barBase - h, barBase - h], height: [0, h, h] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "linear",
            times: [t(10.7 + i * 0.06), t(11.1 + i * 0.06), 1],
          }}
        />
      ))}

      <rect x={x + 12} y={y + 84} width={progressW} height="3" fill={HARD} opacity="0.4" />
      <motion.rect
        x={x + 12}
        y={y + 84}
        height="3"
        fill={TOXIC}
        initial={{ width: 0 }}
        animate={{ width: [0, 0, progressW * 0.82, progressW * 0.82] }}
        transition={{
          duration: LOOP,
          repeat: Infinity,
          ease: "linear",
          times: [0, t(10.9), t(11.9), 1],
        }}
      />
    </motion.g>
  );
}
