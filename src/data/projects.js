/**
 * Single source of truth for project data — consumed by the marquee,
 * the masonry grid, and the featured spotlight. Only these three projects
 * exist; every section recycles them rather than inventing filler.
 *
 * `image`: drop a file at public/projects/<slug>.jpg and set the path here to
 * switch that project from the typographic tile to real photography. The
 * grayscale → color hover only applies to real images.
 */
export const projects = [
  {
    slug: "extriveinnovations",
    name: "ExtriveInnovations",
    stack: ["NEXT.JS", "REACT THREE FIBER", "NODEMAILER"],
    year: "2025",
    description:
      "A high-performance website presenting industrial exosuit solutions through interactive 3D visuals, modern UI, and responsive design.",
    live: "https://ExtriveInnovations.com",
    code: "https://github.com/harsha1001987/extriveinnovations",
    image: "/extrive.png",
  },
  {
    slug: "lockin",
    name: "LockIn",
    stack: ["NEXT.JS", "SUPABASE", "TAILWIND"],
    year: "2025",
    description:
      "Structured financial education platform with a historical-crash decision simulator that models long-term portfolio outcomes.",
    live: "https://lock-in-one-mocha.vercel.app/",
    code: "https://github.com/harsha1001987/LockIn",
    // Filename case matters on Linux deploys — matches public/Lockin.png exactly.
    image: "/Lockin.png",
  },
  {
    slug: "paleopath",
    name: "PaleoPath",
    stack: ["REACT", "VITE", "FRAMER MOTION"],
    year: "2025",
    description:
      "Interactive human evolution explorer — timeline, species pages, quizzes, and survival mode with session-based progress.",
    live: "https://paleo-path.vercel.app/",
    code: "https://github.com/harsha1001987/PaleoPath",
    image: "/paleopath.png",
  },
];

export const featured = projects[0];
