/**
 * Typographic ticker — a rhythm break between the hero and the work.
 *
 * Deliberately NOT project cards: the projects already appear in the featured
 * spotlight and the Selected Works grid, and showing the same three a third
 * time was pure repetition.
 *
 * 30s linear infinite, pauses on container hover, frozen under
 * prefers-reduced-motion (globals.css).
 */
const phrases = [
  "WEB APPLICATIONS",
  "BUSINESS AUTOMATION",
  "UI DEVELOPMENT",
  "UI DESIGN",
  "FULL STACK BUILDS",
];

export default function Marquee() {
  // Doubled so the -50% translate loops seamlessly.
  const track = [...phrases, ...phrases];

  return (
    <section
      aria-label="Disciplines"
      className="marquee-shell overflow-hidden border-y-2 border-hard bg-void py-8 sm:py-10"
    >
      <div className="marquee-track flex w-max items-center">
        {track.map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="flex items-center">
            <span
              className={`headline whitespace-nowrap text-4xl sm:text-6xl lg:text-7xl ${
                i % 2 === 0 ? "text-pure" : "text-toxic"
              }`}
            >
              {phrase}
            </span>
            <span
              aria-hidden="true"
              className="mx-8 inline-block h-2.5 w-2.5 shrink-0 bg-alert sm:mx-12"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
