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

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      });

      let split = SplitText.create(".split", {
        type: "chars",
      });

      let splitReverse = SplitText.create(".split-reverse", {
        type: "chars",
      });

      tl.from(titlesRef.current, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.5,
        duration: 1.5,
        ease: "power4.out",
      })
        .from(
          progressBarRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power4.out",
          },
          "<",
        )
        .to(
          {},
          {
            duration: 2.5,
            onUpdate: function () {
              const progress = Math.round(this.progress() * 100);
              setLoadingProgress(progress);
            },
          },
        )
        .to([titlesRef.current, progressBarRef.current], {
          yPercent: -100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        })
        .to(
          introRef.current,
          {
            yPercent: -100,
            duration: 1,
            delay: 0.3,
            borderRadius: "100%",
            ease: "circ.out",
          },
          "-=1",
        )
        .from(bgImgRef.current, {
          opacity: 0,
          duration: 1,
          scale: 1.2,
          filter: "blur(10px)",
          ease: "power4.out",
        })
        .from(split.chars, {
          duration: 1,
          y: -300,
          autoAlpha: 0,
          filter: "blur(10px)",
          stagger: 0.05,
          ease: "power4.out",
        })
        .from(
          splitReverse.chars,
          {
            duration: 1,
            y: 300,
            autoAlpha: 0,
            filter: "blur(10px)",
            stagger: -0.05,
            ease: "power4.out",
          },
          "<",
        );
    }, componentRef);
    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  });

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
          <h1 className="text-9xl font-extrabold uppercase text-right tracking-wider split-reverse ">
            Developer
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
