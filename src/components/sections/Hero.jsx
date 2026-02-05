import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Hero = () => {
  const componentRef = useRef(null);
  const introRef = useRef(null);
  const titlesRef = useRef([]);
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

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
        .to(titlesRef.current, {
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
    return () => ctx.revert();
  });

  return (
    <div className="relative" ref={componentRef}>
      <div
        ref={introRef}
        className="min-h-screen flex items-start justify-center bg-gray-100 text-black text-8xl flex-col gap-8 font-medium tracking-tighter absolute top-0 left-0 w-full z-10 uppercase"
      >
        <h1 ref={(el) => (titlesRef.current[0] = el)}>
          Hi, I&apos;m Surya Sekhar Sharma
        </h1>
        <h1 ref={(el) => (titlesRef.current[1] = el)}>A Software Developer</h1>
        <h1 ref={(el) => (titlesRef.current[2] = el)}>A Web Designer</h1>
        <h1 ref={(el) => (titlesRef.current[3] = el)}>And a Tech Enthusiast</h1>
      </div>

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
