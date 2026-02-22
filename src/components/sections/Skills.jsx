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
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
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

        <div className="absolute top-10 left-8 pointer-events-none select-none flex items-center gap-3">
          <div className="w-8 h-px bg-white/50" />
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-mono">
            Skills
          </span>
        </div>

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

        <h1
          ref={textRef}
          className="text-[90vh] font-extrabold leading-5 tracking-tight text-white uppercase text-nowrap will-change-transform"
        >
          My <span className="text-[#fddaaf]">Skills</span>
        </h1>
      </section>

      <StickyCards />
    </div>
  );
};

export default Skills;
