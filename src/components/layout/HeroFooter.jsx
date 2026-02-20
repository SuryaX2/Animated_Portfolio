import {
  RiArrowRightDownLine,
  RiLinkedinBoxFill,
  RiGithubFill,
  RiInstagramLine,
} from "@remixicon/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useRef, useImperativeHandle } from "react";

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

const INITIAL_STATES = {
  arrow: { x: -50, y: -25, autoAlpha: 0, filter: "blur(4px)" },
  tagline: { y: 50, autoAlpha: 0, filter: "blur(4px)" },
  cta: { y: 40, autoAlpha: 0, scale: 0.9, filter: "blur(4px)" },
  date: { y: 60, autoAlpha: 0, filter: "blur(10px)" },
  social: { y: 30, autoAlpha: 0, filter: "blur(4px)" },
};

const HeroFooter = forwardRef(function HeroFooter(_, ref) {
  const containerRef = useRef(null);

  const arrowRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const dateRef = useRef(null);
  const socialRefs = useRef([]);

  const tlRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(arrowRef.current, INITIAL_STATES.arrow);
      gsap.set(taglineRef.current, INITIAL_STATES.tagline);
      gsap.set(ctaRef.current, INITIAL_STATES.cta);
      gsap.set(dateRef.current, INITIAL_STATES.date);
      gsap.set(socialRefs.current, INITIAL_STATES.social);

      tlRef.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.out", duration: 0.9 },
        })
        .to(arrowRef.current, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "circ.out",
        })
        .to(
          taglineRef.current,
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
          },
          "-=0.75",
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "back.out(1.2)",
          },
          "-=0.7",
        )
        .to(
          dateRef.current,
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "circ.out",
          },
          "-=0.8",
        )
        .to(
          socialRefs.current,
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.7",
        );
    },
    { scope: containerRef },
  );

  useImperativeHandle(ref, () => ({
    play: () => tlRef.current?.play(),
  }));

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 z-10 px-16 py-10"
    >
      <div className="grid grid-cols-2 items-end gap-8">
        <div className="flex flex-col items-start gap-4">
          <RiArrowRightDownLine
            ref={arrowRef}
            className="w-16 h-16 text-white shrink-0"
            aria-hidden="true"
          />

          <p
            ref={taglineRef}
            className="text-4xl font-semibold tracking-widest uppercase text-white leading-tight max-w-sm"
          >
            Building digital&nbsp;experiences that breathe
          </p>

          <a
            ref={ctaRef}
            href="#contact"
            className="group relative inline-flex items-center gap-2 border-2 border-white rounded-full px-6 py-2.5 text-lg font-semibold uppercase tracking-widest text-white overflow-hidden transition-colors duration-500 whitespace-nowrap"
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
            ref={dateRef}
            className="text-8xl font-extrabold tracking-tighter text-white uppercase"
            dateTime={new Date().toISOString().slice(0, 7)}
          >
            {formatMonthYear(new Date())}
          </time>

          <nav className="flex flex-col gap-10" aria-label="Social links">
            {SOCIAL_LINKS.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  ref={(el) => (socialRefs.current[i] = el)}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex items-center gap-2 text-white transition-colors duration-300"
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
