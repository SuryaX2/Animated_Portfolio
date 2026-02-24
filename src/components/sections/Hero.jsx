import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, useEffect, useState, useCallback } from "react";
import IntroSlide from "./IntroSlide";
import HeroFooter from "../layout/HeroFooter";
import { useLenisContext } from "../../context/LenisContext";

gsap.registerPlugin(SplitText, ScrollTrigger);

const FRAME_COUNT = 300;
const SCROLL_DISTANCE = "300%";
const FRAME_PATH = (n) => `/Frames/frame_${String(n).padStart(4, "0")}.jpeg`;

const preloadFrames = async () => {
  const images = new Array(FRAME_COUNT);

  const promises = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const img = new Image();
    img.src = FRAME_PATH(i + 1);
    images[i] = img;
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  await Promise.all(promises);
  return images;
};

const drawImageCover = (ctx, img, canvasW, canvasH) => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let srcX, srcY, srcW, srcH;

  if (imgRatio > canvasRatio) {
    srcH = img.naturalHeight;
    srcW = srcH * canvasRatio;
    srcX = (img.naturalWidth - srcW) / 2;
    srcY = 0;
  } else {
    srcW = img.naturalWidth;
    srcH = srcW / canvasRatio;
    srcX = 0;
    srcY = (img.naturalHeight - srcH) / 2;
  }

  ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, canvasW, canvasH);
};

const Hero = () => {
  const lenisRef = useLenisContext();

  const componentRef = useRef(null);
  const introRef = useRef(null);
  const titlesRef = useRef([]);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const progressBarRef = useRef(null);
  const heroFooterRef = useRef(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [framesLoaded, setFramesLoaded] = useState(false);

  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const splitInstancesRef = useRef([]);
  const scrollTriggerRef = useRef(null);
  const pendingRAFRef = useRef(null);

  useEffect(() => {
    preloadFrames().then((images) => {
      framesRef.current = images;
      setFramesLoaded(true);
    });
  }, []);

  useEffect(() => {
    const lenis = lenisRef?.current;
    lenis?.stop();

    return () => {
      lenis?.start();
    };
  }, [lenisRef]);

  const unlockScrollRef = useRef(null);

  useEffect(() => {
    unlockScrollRef.current = () => {
      lenisRef?.current?.start();
      ScrollTrigger.refresh();
    };
  }, [lenisRef]);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img?.complete) return;

    const ctx = canvas.getContext("2d");
    drawImageCover(ctx, img, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      drawFrame(currentFrameRef.current);
    };

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    syncSize();

    return () => ro.disconnect();
  }, [drawFrame]);

  const updateProgress = useCallback((progress) => {
    setLoadingProgress(Math.round(progress * 100));
  }, []);

  useGSAP(
    () => {
      if (!framesLoaded) return;

      gsap.set(".split, .split-reverse", { autoAlpha: 0 });

      const splitNormal = new SplitText(".split", { type: "chars" });
      const splitReverse = new SplitText(".split-reverse", { type: "chars" });
      splitInstancesRef.current = [splitNormal, splitReverse];

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
      gsap.set(".split, .split-reverse", { autoAlpha: 1 });

      drawFrame(0);

      const setupScrollSequence = () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }

        if (pendingRAFRef.current !== null) {
          cancelAnimationFrame(pendingRAFRef.current);
          pendingRAFRef.current = null;
        }

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: `+=${SCROLL_DISTANCE}`,
          pin: true,
          pinSpacing: true,
          scrub: 2,
          anticipatePin: 1,
          refreshPriority: 1,
          onUpdate: (self) => {
            const target = Math.round(self.progress * (FRAME_COUNT - 1));
            if (target === currentFrameRef.current) return;
            currentFrameRef.current = target;
            drawFrame(target);
          },
        });

        pendingRAFRef.current = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          pendingRAFRef.current = null;
        });
      };

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => {
            unlockScrollRef.current?.();
            setupScrollSequence();
          },
        })
        .from(titlesRef.current, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
        })
        .from(progressBarRef.current, { opacity: 0, duration: 0.5 }, "<0.3")
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
          { yPercent: -100, duration: 1.2, ease: "circ.out" },
          "-=0.4",
        )
        .from(
          canvasRef.current,
          { yPercent: 100, duration: 1.2, ease: "circ.out" },
          "<",
        )
        .to(
          splitNormal.chars,
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.05,
          },
          "-=0.6",
        )
        .to(
          splitReverse.chars,
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: { each: 0.05, from: "end" },
          },
          "<",
        )
        .call(() => heroFooterRef.current?.play(), [], "<");

      return () => {
        splitInstancesRef.current.forEach((i) => i?.revert());
        splitInstancesRef.current = [];
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
        if (pendingRAFRef.current !== null) {
          cancelAnimationFrame(pendingRAFRef.current);
          pendingRAFRef.current = null;
        }
        lenisRef?.current?.start();
        ScrollTrigger.refresh();
      };
    },
    {
      dependencies: [framesLoaded, updateProgress, drawFrame],
      scope: componentRef,
    },
  );

  return (
    <div id="hero" className="relative overflow-x-hidden" ref={componentRef}>
      <IntroSlide
        introRef={introRef}
        titlesRef={titlesRef}
        loadingProgress={loadingProgress}
        progressBarRef={progressBarRef}
      />

      <div ref={heroRef} className="min-h-screen relative">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        />

        <div className="p-16 relative z-10 flex flex-col gap-4">
          <h1
            className="text-9xl font-extrabold uppercase tracking-wider split hero-text"
            style={{ willChange: "transform, opacity" }}
          >
            Creative
          </h1>
          <h1
            className="text-9xl font-extrabold uppercase text-right tracking-wider split-reverse hero-text"
            style={{ willChange: "transform, opacity" }}
          >
            Developer
          </h1>
        </div>

        <HeroFooter ref={heroFooterRef} />
      </div>
    </div>
  );
};

export default Hero;
