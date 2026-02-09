import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import IntroSlide from "./IntroSlide";
import { SplitText } from "gsap/SplitText";

const Hero = () => {
  const componentRef = useRef(null);
  const introRef = useRef(null);
  const titlesRef = useRef([]);
  const heroRef = useRef(null);
  const bgImgRef = useRef(null);
  const progressBarRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useGSAP(
    () => {
      const split = new SplitText(".split", { type: "chars" });
      const splitReverse = new SplitText(".split-reverse", { type: "chars" });

      const loader = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      });

      tl.from(titlesRef.current, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.25,
        duration: 0.9,
      })

        .from(
          progressBarRef.current,
          {
            opacity: 0,
            duration: 0.4,
          },
          "<",
        )

        .to(loader, {
          value: 100,
          duration: 1.4,
          ease: "none",
          onUpdate: () => setLoadingProgress(Math.round(loader.value)),
        })

        .to([titlesRef.current, progressBarRef.current], {
          yPercent: -100,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
        })

        .to(
          introRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "circ.out",
          },
          "-=0.6",
        )

        .from(
          bgImgRef.current,
          {
            yPercent: 100,
            filter: "blur(20px)",
            duration: 0.8,
            ease: "circ.out",
          },
          "<",
        )

        .from(split.chars, {
          y: -220,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.8,
        })

        .from(
          splitReverse.chars,
          {
            y: 220,
            autoAlpha: 0,
            stagger: -0.04,
            duration: 0.8,
          },
          "<",
        );

      return () => {
        split.revert();
        splitReverse.revert();
        document.body.style.overflow = "auto";
      };
    },
    { scope: componentRef },
  );

  return (
    <div className="relative overflow-x-hidden" ref={componentRef}>
      <IntroSlide
        introRef={introRef}
        titlesRef={titlesRef}
        loadingProgress={loadingProgress}
        progressBarRef={progressBarRef}
      />

      <div className="min-h-screen relative">
        <img
          src="/bgimg.jpg"
          alt="background image"
          loading="lazy"
          ref={bgImgRef}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />

        <div ref={heroRef} className="p-16 relative z-10 flex flex-col gap-4">
          <h1 className="text-9xl font-extrabold uppercase tracking-wider split">
            Creative
          </h1>
          <h1 className="text-9xl font-extrabold uppercase text-right tracking-wider split-reverse">
            Developer
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
