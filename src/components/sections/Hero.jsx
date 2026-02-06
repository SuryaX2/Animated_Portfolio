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
            duration: 2.5,
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

      <div ref={heroRef} className="min-h-screen relative">
        <img
          src="/bgimg.jpg"
          alt="background image"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />

        <div className="p-16 relative z-10 flex flex-col gap-4 sm:gap-6 md:gap-8">
          <h1 className="text-9xl font-medium uppercase tracking-wider">
            Creative
          </h1>
          <h1 className="text-9xl font-medium uppercase text-right tracking-wider">
            Developer
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
