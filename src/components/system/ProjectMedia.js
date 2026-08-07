import Image from "next/image";

/**
 * Project media.
 *
 * With a real image: grayscale(100%) → grayscale(0%) over 700ms plus a scale
 * transform. "Color" means the photograph's own color — never a tint.
 *
 * Without one (no screenshots ship yet): a typographic tile carrying the same
 * hover discipline — System Gray type resolving to Toxic Acid — so the grid
 * reads correctly before photography exists.
 */
export default function ProjectMedia({
  project,
  scale = "group-hover:scale-105",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.name} — project preview`}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 ${scale}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between bg-void p-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scale}`}
    >
      <span className="mono-meta text-hard">{project.year}</span>
      <span className="headline text-3xl text-hard transition-colors duration-700 group-hover:text-toxic sm:text-5xl">
        {project.name}
      </span>
      <span className="mono-meta text-hard">{project.stack[0]}</span>
    </div>
  );
}
