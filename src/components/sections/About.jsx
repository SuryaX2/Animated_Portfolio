import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BIO_TEXT =
  "Surya Sekhar Sharma, a B.Tech candidate in Information Technology from Narula Institute of Technology, skilled in Java, SQL, and Web Development through hands-on projects. Seeking opportunities to apply my technical foundation, learn quickly on the job, and contribute to impactful software solutions as part of a team.";

const About = () => {
  const sectionRef = useRef(null);
  const fillSpanRef = useRef(null);
  const svgRef = useRef(null);
  const strokePathRef = useRef(null);
  const fillPathRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (
              st.vars.trigger === sectionRef.current ||
              st.vars.trigger === fillSpanRef.current
            ) {
              st.kill();
            }
          });
        };
      }

      const pendingTimeouts = [];
      const pendingRAF = [];

      const initAboutTriggers = () => {
        const checkHeroReady = () => {
          const heroTriggers = ScrollTrigger.getAll().filter(
            (st) => st.vars.pin === true,
          );

          if (heroTriggers.length === 0) {
            const timeoutId = setTimeout(checkHeroReady, 50);
            pendingTimeouts.push(timeoutId);
            return;
          }

          ScrollTrigger.refresh();

          const rafId = requestAnimationFrame(() => {
            const nestedTimeoutId = setTimeout(() => {
              ScrollTrigger.refresh();

              const strokePath = strokePathRef.current;
              const fillPath = fillPathRef.current;
              const svg = svgRef.current;

              if (!strokePath || !fillPath || !svg) return;

              const maskRect = svg.querySelector("#maskRect");
              const fillMaskRect = svg.querySelector("#fillMaskRect");

              if (!maskRect || !fillMaskRect) return;

              const svgWidth = 1200;

              gsap.set(maskRect, {
                width: 0,
                x: 0,
              });

              gsap.set(fillMaskRect, {
                width: 0,
                x: 0,
              });

              gsap.set(strokePath, {
                strokeOpacity: 1,
              });

              gsap.set(fillPath, {
                opacity: 0,
              });
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  end: "top 40%",
                  scrub: 2,
                  invalidateOnRefresh: true,
                  refreshPriority: -1,
                },
              });

              tl.to(maskRect, {
                width: svgWidth,
                duration: 1,
                ease: "power2.out",
              })
                .to(
                  fillMaskRect,
                  {
                    width: svgWidth,
                    duration: 1,
                    ease: "power2.out",
                  },
                  "-=0.4",
                )
                .to(
                  fillPath,
                  {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                  },
                  "-=0.5",
                )
                .to(
                  strokePath,
                  {
                    strokeOpacity: 0,
                    duration: 1,
                    ease: "power2.in",
                  },
                  "-=0.4",
                );
              if (fillSpanRef.current) {
                gsap.to(fillSpanRef.current, {
                  backgroundSize: "200% 200%",
                  ease: "none",
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 35%",
                    end: "bottom 65%",
                    scrub: 2,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                  },
                });
              }

              const finalRafId = requestAnimationFrame(() => {
                ScrollTrigger.refresh();
              });
              pendingRAF.push(finalRafId);
            }, 100);
            pendingTimeouts.push(nestedTimeoutId);
          });
          pendingRAF.push(rafId);
        };

        checkHeroReady();
      };

      const initTimeout = setTimeout(initAboutTriggers, 300);
      pendingTimeouts.push(initTimeout);

      return () => {
        pendingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        pendingTimeouts.length = 0;

        pendingRAF.forEach((rafId) => cancelAnimationFrame(rafId));
        pendingRAF.length = 0;

        ScrollTrigger.getAll().forEach((st) => {
          if (
            st.vars.trigger === sectionRef.current ||
            st.vars.trigger === fillSpanRef.current
          ) {
            st.kill();
          }
        });

        ScrollTrigger.refresh();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-black flex flex-col items-start justify-between py-16 px-8 overflow-x-hidden"
      aria-label="About Surya Sekhar Sharma"
    >
      <div className="flex items-center justify-center mb-16 w-full h-full">
        <svg
          ref={svgRef}
          className="w-full h-auto"
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ maxHeight: "200px" }}
        >
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
            <mask id="strokeMask">
              <rect
                id="maskRect"
                x="0"
                y="0"
                width="0"
                height="200"
                fill="white"
              />
            </mask>
            <mask id="fillMask">
              <rect
                id="fillMaskRect"
                x="0"
                y="0"
                width="0"
                height="200"
                fill="white"
              />
            </mask>
          </defs>
          <text
            ref={strokePathRef}
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="180"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fill="none"
            stroke="url(#textGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            letterSpacing="0.1em"
            className="uppercase"
            mask="url(#strokeMask)"
          >
            ABOUT ME
          </text>
          <text
            ref={fillPathRef}
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="180"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fill="url(#textGradient)"
            letterSpacing="0.1em"
            className="uppercase"
            mask="url(#fillMask)"
            opacity="0"
          >
            ABOUT ME
          </text>
        </svg>
      </div>

      <p
        className="fill-text m-0 max-w-full p-16 text-justify"
        style={{
          fontSize: "clamp(22px, 3.5vw, 46px)",
          fontWeight: 600,
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
        }}
      >
        <span
          ref={fillSpanRef}
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            backgroundColor: "#2a2d33",
            backgroundImage:
              "linear-gradient(135deg, #f3f4f6 50%, #2a2d33 60%)",
            backgroundPosition: "0 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "0% 200%",
            color: "transparent",
            display: "inline",
            willChange: "background-size",
          }}
          className="uppercase tracking-wide text-5xl"
        >
          {BIO_TEXT}
        </span>
      </p>
    </section>
  );
};

export default About;
