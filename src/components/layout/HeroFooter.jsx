import {
  RiArrowRightDownLine,
  RiLinkedinBoxFill,
  RiGithubFill,
  RiInstagramLine,
} from "@remixicon/react";
import { forwardRef } from "react";

const SOCIAL_LINKS = [
  {
    icon: RiLinkedinBoxFill,
    href: "https://www.linkedin.com/in/suryax2",
    label: "LinkedIn",
  },
  { icon: RiGithubFill, href: "https://github.com/suryax2", label: "GitHub" },
  {
    icon: RiInstagramLine,
    href: "https://www.instagram.com/surya.sekhar.sharma/",
    label: "Instagram",
  },
];

const formatMonthYear = (date) => {
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = String(date.getFullYear()).slice(-2);
  return `${month} '${year}`;
};

const HeroFooter = forwardRef(function HeroFooter(_, ref) {
  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 z-10 px-16 py-10"
    >
      <div className="grid grid-cols-2 items-end gap-8">
        <div className="flex flex-col items-start gap-4">
          <RiArrowRightDownLine
            className="hero-footer-item w-16 h-16 text-white shrink-0"
            aria-hidden="true"
          />

          <p className="hero-footer-item text-4xl font-semibold tracking-widest uppercase text-white leading-tight max-w-sm text-wrap">
            Building digital&nbsp;
            experiences that breathe
          </p>

          <a
            href="#contact"
            className="hero-footer-item group relative inline-flex items-center gap-2 border-2 border-white rounded-full px-6 py-2.5 text-lg font-semibold uppercase tracking-widest text-white overflow-hidden transition-colors duration-500 hover:border-white whitespace-nowrap"
          >
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
              aria-hidden="true"
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Get in touch
            </span>
          </a>
        </div>

        <div className="flex items-end justify-end gap-10">
          <time
            className="hero-footer-item text-8xl font-extrabold tracking-tighter text-white uppercase"
            dateTime={new Date().toISOString().slice(0, 7)}
          >
            {formatMonthYear(new Date())}
          </time>

          <nav className="flex flex-col gap-10" aria-label="Social links">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hero-footer-item group flex items-center gap-2 text-white hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-10 h-10 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
});

export default HeroFooter;
