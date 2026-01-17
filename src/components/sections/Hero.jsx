import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const svgRef = useRef(null);
  const gridRef = useRef(null);
  const floatingRef = useRef(null);
  const scrollSvgRef = useRef(null);
  const morphPathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll(".char");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        chars,
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
        }
      )
        .fromTo(
          subtitleRef.current.querySelectorAll(".word"),
          { opacity: 0, y: 50, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            marginRight: "0.75rem",
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.05,
          },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current.children,
          { opacity: 0, scale: 0.95, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .fromTo(
          svgRef.current,
          { opacity: 0, scale: 0.5, rotate: -180 },
          { opacity: 0.5, scale: 1, rotate: 0, duration: 1.5 },
          "-=1.2"
        );

      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 0.03, duration: 2, delay: 0.5 }
      );

      gsap.to(svgRef.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to(heroRef.current, {
        opacity: 0.4,
        y: 150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Scroll-synced animated SVG
      gsap.to(scrollSvgRef.current, {
        rotation: 180,
        scale: 1.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Morph path animation
      const paths = [
        "M300,100 Q400,200 300,300 Q200,400 300,500 Q400,400 300,300 Q200,200 300,100 Z",
        "M300,150 Q450,250 350,400 Q250,450 150,350 Q100,200 300,150 Z",
        "M250,150 Q400,150 400,300 Q400,450 250,450 Q100,450 100,300 Q100,150 250,150 Z",
      ];

      gsap.to(morphPathRef.current, {
        attr: { d: paths[1] },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "30% top",
          scrub: 1,
        },
      });

      gsap.to(morphPathRef.current, {
        attr: { d: paths[2] },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const title = "Creativity all that matters";
  const subtitle = "Hi, I'm Surya Sekhar Sharma";

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-black via-gray-900 to-black px-6 text-center md:px-12 lg:px-24"
    >
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div
        ref={svgRef}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-0"
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="300"
            cy="300"
            r="250"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          <circle
            cx="300"
            cy="300"
            r="200"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          <circle
            cx="300"
            cy="300"
            r="150"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          <path
            d="M300 50 L300 550 M50 300 L550 300"
            stroke="url(#gradient)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div
        ref={floatingRef}
        className="pointer-events-none absolute inset-0"
      ></div>

      {/* Scroll-synced animated SVG */}
      <div
        ref={scrollSvgRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20"
        >
          {/* Morphing blob */}
          <path
            ref={morphPathRef}
            d="M300,100 Q400,200 300,300 Q200,400 300,500 Q400,400 300,300 Q200,200 300,100 Z"
            fill="url(#blobGradient)"
            stroke="url(#blobStroke)"
            strokeWidth="2"
          />

          {/* Animated particles */}
          <circle cx="300" cy="150" r="4" fill="#ffffff" opacity="0.6">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M0,0 Q100,100 0,200 Q-100,100 0,0 Z"
            />
          </circle>
          <circle cx="350" cy="200" r="3" fill="#ffffff" opacity="0.5">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M0,0 Q-150,50 -50,150 Q50,50 0,0 Z"
            />
          </circle>
          <circle cx="250" cy="250" r="5" fill="#ffffff" opacity="0.4">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M0,0 Q80,-120 160,0 Q80,120 0,0 Z"
            />
          </circle>

          <defs>
            <linearGradient
              id="blobGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="blobStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl text-center">
        <h1
          ref={titleRef}
          className="mb-6 text-6xl font-black leading-tight tracking-tight text-white md:text-8xl lg:text-9xl"
          style={{ perspective: "1000px" }}
        >
          {title.split("").map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mb-8 text-2xl font-semibold text-gray-300 md:text-4xl lg:text-5xl"
        >
          {subtitle.split(" ").map((word, index) => (
            <span key={index} className="word inline-block">
              {word}
            </span>
          ))}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-xl bg-white px-10 py-5 text-base font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] md:text-lg"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 z-0 bg-linear-to-r from-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 px-10 py-5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 md:text-lg"
          >
            <span className="relative z-10">Get In Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
