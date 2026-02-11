import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useEffect, useState, useCallback } from "react";
import IntroSlide from "./IntroSlide";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const componentRef = useRef(null);
  const introRef = useRef(null);
  const titlesRef = useRef([]);
  const heroRef = useRef(null);
  const bgImgRef = useRef(null);
  const progressBarRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const splitInstancesRef = useRef([]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "/bgimg.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  const updateProgress = useCallback((progress) => {
    setLoadingProgress(Math.round(progress * 100));
  }, []);

  useGSAP(
    () => {
      if (!imageLoaded) return;

      const ctx = gsap.context(() => {
        gsap.set(".split, .split-reverse", {
          autoAlpha: 0,
        });

        const splitNormal = new SplitText(".split", {
          type: "chars",
        });

        const splitReverse = new SplitText(".split-reverse", {
          type: "chars",
        });

        splitInstancesRef.current = [splitNormal, splitReverse];

        gsap.set(".split, .split-reverse", {
          autoAlpha: 1,
        });

        gsap.set(splitNormal.chars, {
          y: -300,
          autoAlpha: 0,
          filter: "blur(10px)",
        });

        gsap.set(splitReverse.chars, {
          y: 300,
          autoAlpha: 0,
          filter: "blur(10px)",
        });

        setIsReady(true);

        const tl = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
          onComplete: () => {
            document.body.style.overflow = "auto";
          },
        });

        tl.from(titlesRef.current, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
        })
          .from(
            progressBarRef.current,
            {
              opacity: 0,
              duration: 0.5,
            },
            "<0.3",
          )
          .to(
            {},
            {
              duration: 2.5,
              ease: "none",
              onUpdate: function () {
                updateProgress(this.progress());
              },
            },
          )
          .to([titlesRef.current, progressBarRef.current], {
            yPercent: -100,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          })
          .to(
            introRef.current,
            {
              yPercent: -100,
              duration: 1.2,
              ease: "circ.out",
            },
            "-=0.4",
          )
          .from(
            bgImgRef.current,
            {
              yPercent: 100,
              duration: 1.2,
              ease: "circ.out",
            },
            "<",
          )
          .to(
            splitNormal.chars,
            {
              duration: 1,
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              stagger: 0.05,
              ease: "power4.out",
            },
            "-=0.6",
          )
          .to(
            splitReverse.chars,
            {
              duration: 1,
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              stagger: {
                each: 0.05,
                from: "end",
              },
              ease: "power4.out",
            },
            "<",
          );
      }, componentRef);

      return () => {
        ctx.revert();

        splitInstancesRef.current.forEach((instance) => {
          if (instance && instance.revert) {
            instance.revert();
          }
        });
        splitInstancesRef.current = [];

        document.body.style.overflow = "auto";
        setIsReady(false);
      };
    },
    { dependencies: [imageLoaded, updateProgress], scope: componentRef },
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
          ref={bgImgRef}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          style={{ willChange: "transform" }}
        />

        <div ref={heroRef} className="p-16 relative z-10 flex flex-col gap-4">
          <h1
            className="text-9xl font-extrabold uppercase tracking-wider split hero-text"
            style={{
              willChange: "transform, opacity",
              visibility: isReady ? "visible" : "hidden",
            }}
          >
            Creative
          </h1>
          <h1
            className="text-9xl font-extrabold uppercase text-right tracking-wider split-reverse hero-text"
            style={{
              willChange: "transform, opacity",
              visibility: isReady ? "visible" : "hidden",
            }}
          >
            Developer
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
