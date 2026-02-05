import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

const Hero = () => {
  const componentRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from("#intro", {
        xPercent: -100,
        duration: 1,
        delay: 0.3,
        borderRadius: "10vh",
        ease: "circ.in",
      })
        .from(["#title1", "#title2", "#title3", "#title4"], {
          xPercent: -100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        })
        .to(["#title1", "#title2", "#title3", "#title4"], {
          xPercent: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        })
        .to(
          "#intro",
          {
            xPercent: 100,
            duration: 1,
            delay: 0.3,
            borderRadius: "10vh",
            ease: "circ.out",
          },
          "-=1",
        )
        .from("#hero", {
          xPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
    }, componentRef);
    return () => ctx.revert();
  });

  return (
    <div className="relative" ref={componentRef}>
      <div
        className="min-h-screen flex items-start justify-center bg-gray-100 text-black text-8xl flex-col gap-8 pt-40 font-medium tracking-tight absolute top-0 left-0 w-full z-10"
        id="intro"
      >
        <h1 id="title1">Hello, I&apos;m Surya Sekhar Sharma</h1>
        <h1 id="title2">A Software Developer</h1>
        <h1 id="title3">A Web Designer</h1>
        <h1 id="title4">And a Tech Enthusiast</h1>
      </div>

      <div className="min-h-screen flex items-center justify-center" id="hero">
        <h1 className="text-4xl font-extrabold">Hero Section</h1>
      </div>
    </div>
  );
};

export default Hero;
