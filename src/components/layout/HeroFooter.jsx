import {
  RiArrowRightDownLine,
  RiLinkedinBoxFill,
  RiGithubFill,
  RiDownloadFill,
} from "@remixicon/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { forwardRef, useRef, useImperativeHandle } from "react";

gsap.registerPlugin(SplitText);

const SOCIAL_LINKS = [
  {
    icon: RiLinkedinBoxFill,
    href: "https://www.linkedin.com/in/suryax2",
    label: "LinkedIn",
  },
  {
    icon: RiGithubFill,
    href: "https://github.com/suryax2",
    label: "GitHub",
  },
];

const formatMonthYear = (date) => {
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = String(date.getFullYear()).slice(-2);
  return `${month} '${year}`;
};

const HeroFooter = forwardRef(function HeroFooter(_, ref) {
  const containerRef = useRef(null);
  const arrowRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const dateRef = useRef(null);
  const socialRefs = useRef([]);
  const tlRef = useRef(null);
  const splitInstancesRef = useRef([]);

  useGSAP(
    () => {
      gsap.set(arrowRef.current, {
        x: -50,
        y: -25,
        autoAlpha: 0,
      });
      gsap.set(ctaRef.current, {
        y: "100%",
        autoAlpha: 0,
        scale: 0.9,
      });
      gsap.set(socialRefs.current, {
        y: "100%",
        autoAlpha: 0,
      });

      const taglineSplit = SplitText.create(taglineRef.current, {
        type: "words",
        wordClass: "word",
        mask: "words",
      });

      const dateSplit = SplitText.create(dateRef.current, {
        type: "chars",
        charClass: "char",
        mask: "chars",
      });

      splitInstancesRef.current = [taglineSplit, dateSplit];

      gsap.set(taglineSplit.words, { y: "100%" });
      gsap.set(dateSplit.chars, { y: "100%" });

      tlRef.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.out", duration: 0.9 },
        })
        .to(arrowRef.current, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "circ.out",
        })
        .to(
          taglineSplit.words,
          {
            y: "0%",
            duration: 1,
            ease: "power4.out",
            stagger: 0.06,
          },
          "<",
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "back.out(1.2)",
          },
          "<",
        )
        .to(
          dateSplit.chars,
          {
            y: "0%",
            duration: 1,
            ease: "circ.out",
            stagger: 0.05,
          },
          "<",
        )
        .to(
          socialRefs.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.2,
            ease: "circ.out",
          },
          "<",
        );

      return () => {
        splitInstancesRef.current.forEach((i) => i?.revert());
        splitInstancesRef.current = [];
      };
    },
    { scope: containerRef },
  );

  useImperativeHandle(ref, () => ({
    play: () => tlRef.current?.play(),
  }));

  return (
    <footer
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 z-10 px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-16 lg:py-10"
      aria-label="Hero footer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-5 sm:gap-6 lg:gap-8">
        <div className="flex flex-col items-start gap-3 sm:gap-4">
          <RiArrowRightDownLine
            ref={arrowRef}
            className="w-9 h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white shrink-0"
            aria-hidden="true"
          />

          <p
            ref={taglineRef}
            className="hero-footer-text text-xl sm:text-2xl lg:text-4xl font-semibold tracking-widest uppercase text-white leading-tight max-w-xs sm:max-w-xs lg:max-w-sm"
          >
            Building digital&nbsp;experiences that breathe
          </p>

          <a
            ref={ctaRef}
            href="#contact"
            className="group relative inline-flex items-center gap-2 border-2 border-white rounded-full px-4 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-widest text-white overflow-hidden transition-colors duration-500 whitespace-nowrap"
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

        <div className="flex items-end justify-between lg:justify-end gap-5 sm:gap-6 lg:gap-8">
          <time
            ref={dateRef}
            className="font-extrabold text-white uppercase leading-none"
            dateTime={new Date().toISOString().slice(0, 7)}
            style={{
              fontSize: "clamp(2rem, 12vw, 6rem)",
              paddingBottom: "0.1em",
              paddingInline: "0.05em",
            }}
          >
            {formatMonthYear(new Date())}
          </time>

          <nav
            className="flex flex-col gap-4 sm:gap-6 lg:gap-10"
            aria-label="Social links"
          >
            {SOCIAL_LINKS.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  ref={(el) => (socialRefs.current[i] = el)}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label} profile`}
                  className="group flex items-center gap-2 text-white transition-colors duration-300"
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                </a>
              );
            })}
            <a
              ref={(el) => (socialRefs.current[SOCIAL_LINKS.length] = el)}
              href="/Resume/Surya_CV.pdf"
              download
              aria-label="Download resume"
              className="group flex items-center gap-2 text-white transition-colors duration-300"
            >
              <RiDownloadFill className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-0.5" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
});

export default HeroFooter;
