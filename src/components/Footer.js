"use client";

import Reveal from "@/components/system/Reveal";

const EMAIL = "matlaharshavardhanaraju@gmail.com";

const socials = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/matla-harshavardhanaraju-331037371/",
  },
  { label: "GITHUB", href: "https://github.com/harsha1001987" },
];

const linkClass =
  "mono-meta text-hard transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-toxic";

export default function Footer() {
  return (
    <footer className="border-t-2 border-hard bg-void px-6 pb-10 pt-24 sm:px-10 sm:pt-32 lg:px-12">
      <Reveal>
        <h2 className="headline text-6xl text-pure sm:text-8xl lg:text-9xl">
          Let&apos;s Create
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-block break-all text-2xl text-toxic underline decoration-1 underline-offset-8 sm:text-3xl lg:text-4xl"
        >
          {EMAIL}
        </a>
      </Reveal>

      <div className="mt-20 grid gap-12 sm:mt-28 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="headline text-2xl text-pure">M Harshavardhana Raju</p>
          <p className="mt-4 max-w-xs text-base text-hard">
            Full-stack web applications and business automation systems.
          </p>
        </div>

        <div>
          <p className="mono-meta text-toxic">SOCIALS</p>
          <ul className="mt-5 flex flex-col gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-meta text-toxic">CONTACT</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                {EMAIL}
              </a>
            </li>
            <li className="mono-meta text-hard">CHENNAI, INDIA</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hard pt-6">
        <p className="mono-meta text-hard">© 2026 M HARSHAVARDHANA RAJU</p>
        <p className="mono-meta text-hard">BUILT WITH NEXT.JS</p>
      </div>
    </footer>
  );
}
