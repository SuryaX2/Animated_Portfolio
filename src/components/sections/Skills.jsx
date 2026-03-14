import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StickyCards from "./StickyCards/StickyCards";

gsap.registerPlugin(ScrollTrigger);

const skillKeywords = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "Tailwind",
  "Java",
  "SQL",
  "Git",
  "REST API",
  "MERN",
  "JWT",
  "HTML5",
  "CSS3",
  "MySQL",
  "Vercel",
];

const Skills = () => {
  const introRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { x: "100vw" },
        {
          x: "-100%",
          ease: "none",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
          },
        },
      );
    },
    { scope: introRef },
  );

  return (
    <div id="skills" className="min-h-screen bg-black">
      <section
        ref={introRef}
        className="w-screen h-screen overflow-hidden relative flex items-center"
      >
        {/* Grid background — unchanged */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Floating skill keywords — hidden on mobile to prevent overflow/clutter */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden hidden md:block">
          {skillKeywords.map((word, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <span
                key={word}
                className="absolute text-xs font-mono tracking-widest uppercase"
                style={{
                  top: `${12 + row * 22}%`,
                  left: `${5 + col * 24 + (row % 2) * 10}%`,
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Section label — unchanged */}
        <div className="absolute top-10 left-8 pointer-events-none select-none flex items-center gap-3">
          <div className="w-8 h-px bg-white/50" />
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-mono">
            Skills
          </span>
        </div>

        {/* Scroll hint — unchanged */}
        <div className="absolute bottom-8 right-10 pointer-events-none select-none flex items-center gap-3">
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-mono">
            Scroll
          </span>
          <div className="flex flex-col gap-0.75">
            <div className="w-4 h-px bg-white/50" />
            <div className="w-4 h-px bg-white/50" />
            <div className="w-2 h-px bg-white/50" />
          </div>
        </div>

        {/* Decorative lines — unchanged */}
        <div
          className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/*
          Scrolling heading:
          - Desktop: text-[90vh] — unchanged, drives the marquee animation
          - Mobile/tablet: scaled down via clamp so the heading height doesn't
            push the section taller than h-screen and cause layout issues.
          - The GSAP x animation still works at any font-size because it moves
            on the x-axis only; the section is overflow-hidden.
        */}
        <h1
          ref={textRef}
          className="
            font-extrabold leading-none tracking-tight text-white uppercase text-nowrap
            will-change-transform
            text-[clamp(20vw,_40vh,_90vh)]
            md:text-[clamp(25vw,_60vh,_90vh)]
            lg:text-[90vh]
          "
        >
          My <span className="text-[#fddaaf]">Skills</span>
        </h1>
      </section>

      <StickyCards />
    </div>
  );
};

export default Skills;
