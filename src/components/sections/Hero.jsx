import gsap from "gsap";
import "./Preloader/Preloader.css";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import HeroFooter from "../layout/HeroFooter";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useCallback } from "react";
import { useLenisContext } from "../../context/LenisContext";

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

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
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const heroFooterRef = useRef(null);
  const counterRef = useRef(null);
  const counterContainerRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBgImgRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const splitInstancesRef = useRef([]);
  const scrollTriggerRef = useRef(null);
  const pendingRAFRef = useRef(null);
  const unlockScrollRef = useRef(null);

  useEffect(() => {
    lenisRef?.current?.stop();
    preloadFrames().then((images) => {
      framesRef.current = images;
    });
    return () => lenisRef?.current?.start();
  }, [lenisRef]);

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

  useGSAP(
    () => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const splitHeading = SplitText.create(headingRef.current, {
        type: "chars",
        charClass: "char",
        mask: "chars",
      });

      const splitHeadingReverse = SplitText.create(subheadingRef.current, {
        type: "chars",
        charClass: "char",
        mask: "chars",
      });

      splitInstancesRef.current = [splitHeading, splitHeadingReverse];

      gsap.set(splitHeading.chars, { y: "100%" });
      gsap.set(splitHeadingReverse.chars, { y: "100%" });

      const counter = { value: 0 };
      const counterEl = counterRef.current;
      const counterContainer = counterContainerRef.current;

      const setupScrollSequence = () => {
        if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
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

      const tl = gsap.timeline();

      tl.to(counter, {
        value: 100,
        duration: 3,
        ease: "power4.out",
        onUpdate: () => {
          counterEl.textContent = Math.floor(counter.value);
        },
        onComplete: () => {
          const counterSplit = SplitText.create(counterEl, {
            type: "chars",
            charClass: "digit",
            mask: "chars",
          });
          gsap.to(counterSplit.chars, {
            x: "-100%",
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
            delay: 1,
            onComplete: () => {
              counterContainer.style.display = "none";
            },
          });
        },
      });

      tl.to(
        counterContainer,
        { scale: 1, duration: 3, ease: "power4.out" },
        "<",
      );

      tl.to(
        heroBgRef.current,
        {
          clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
          duration: 1.5,
          ease: "hop",
        },
        4,
      );

      tl.to(
        heroBgImgRef.current,
        { scale: 1.5, duration: 1.5, ease: "hop" },
        "<",
      );

      tl.to(
        heroBgRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "hop",
        },
        5.5,
      );

      tl.to(heroBgImgRef.current, { scale: 1, duration: 2, ease: "hop" }, 5.5);

      tl.to(
        splitHeading.chars,
        { y: "0%", duration: 1, ease: "power4.out", stagger: 0.075 },
        6.5,
      );

      tl.to(
        splitHeadingReverse.chars,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.075,
        },
        6.5,
      );

      tl.call(
        () => {
          heroFooterRef.current?.play();
        },
        [],
        6.8,
      );

      tl.call(
        () => {
          unlockScrollRef.current?.();
          drawFrame(0);
          gsap.to(canvasRef.current, { opacity: 1, duration: 0.3 });
          setupScrollSequence();
        },
        [],
        7.5,
      );

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
    { scope: componentRef },
  );

  return (
    <div
      id="hero"
      className="relative w-full overflow-hidden bg-white flex flex-col items-center justify-center"
      ref={componentRef}
    >
      <div
        ref={counterContainerRef}
        className="preloader-counter"
        aria-hidden="true"
      >
        <h1 ref={counterRef} className="leading-none">
          0
        </h1>
      </div>

      <div
        ref={heroRef}
        className="min-h-screen w-full relative overflow-hidden"
      >
        <div
          ref={heroBgRef}
          className="hero-bg"
          role="img"
          aria-label="Hero background — Creative Developer"
        >
          <img
            ref={heroBgImgRef}
            src="/Frames/frame_0001.jpeg"
            alt="Creative Developer — Surya Sekhar Sharma"
            fetchpriority="high"
          />
        </div>

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform", opacity: 0 }}
        />

        <div className="p-14 sm:p-8 md:p-10 lg:p-16 relative z-10 flex flex-col gap-2 sm:gap-3 md:gap-4 pointer-events-none select-none">
          <h1
            ref={headingRef}
            className="hero-heading text-4xl lg:text-9xl font-extrabold uppercase tracking-wider text-white text-center lg:text-left"
            style={{
              willChange: "transform",
            }}
          >
            Creative
          </h1>
          <h1
            ref={subheadingRef}
            className="hero-heading text-4xl lg:text-9xl font-extrabold uppercase tracking-wider text-white text-center lg:text-right"
            style={{
              willChange: "transform",
            }}
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
