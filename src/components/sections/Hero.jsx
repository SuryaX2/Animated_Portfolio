// Hero.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import IntroSlide from "./IntroSlide";

const Hero = () => {
  const componentRef = useRef(null);
  const introRef = useRef(null);
  const titlesRef = useRef([]);
  const heroRef = useRef(null);
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

      tl.from(introRef.current, {
        xPercent: -100,
        duration: 1,
        delay: 0.3,
        borderRadius: "10vh",
        ease: "circ.in",
      })
        .from(titlesRef.current, {
          xPercent: -100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
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
            duration: 2,
            onUpdate: function () {
              const progress = Math.round(this.progress() * 100);
              setLoadingProgress(progress);
            },
          },
        )
        .to([titlesRef.current, progressBarRef.current], {
          xPercent: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        })
        .to(
          introRef.current,
          {
            xPercent: 100,
            duration: 1,
            delay: 0.3,
            borderRadius: "10vh",
            ease: "circ.out",
          },
          "-=1",
        )
        .from(heroRef.current, {
          xPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
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

      <div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl font-extrabold">Hero Section</h1>
      </div>
    </div>
  );
};

export default Hero;
