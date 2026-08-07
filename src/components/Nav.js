"use client";

const links = [
  { label: "WORKS", href: "#works" },
  { label: "CAPABILITIES", href: "#capabilities" },
  { label: "CONTACT", href: "#inquiry" },
];

/**
 * mix-blend-difference inverts the bar against whatever scrolls under it —
 * text stays white and is never swapped manually on scroll.
 */
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between gap-6 px-6 py-6 sm:px-10 sm:py-8 lg:px-12">
        <a
          href="#top"
          className="headline text-xl tracking-tight text-pure"
          aria-label="Back to top"
        >
          MHR
        </a>

        <div className="flex items-center gap-6 sm:gap-10">
          <ul className="hidden items-center gap-6 sm:flex sm:gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="mono-meta text-pure transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-60"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#inquiry"
            className="mono-meta border border-pure px-4 py-2.5 text-pure transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-pure hover:text-void sm:px-6"
          >
            GET IN TOUCH
          </a>
        </div>
      </nav>
    </header>
  );
}
