import "./WhatIDo.css";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_TEXT =
  "I create websites and digital experiences that value clarity above excess. Through minimal form and precise detail, I aim to build work that lasts and offers a quiet sense of order.";

const WhatIDo = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const textElements =
        containerRef.current.querySelectorAll(".animate-text");

      textElements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 2,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            el.style.setProperty("--clip-value", `${clipValue}%`);
          },
        });
      });

      const headers = containerRef.current.querySelectorAll(".services-header");

      ScrollTrigger.create({
        trigger: ".services",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        onUpdate: (self) => {
          gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
          gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
          gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
        },
      });

      ScrollTrigger.create({
        trigger: ".services",
        start: "top top",
        end: `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 2,
        pinSpacing: false,
        onUpdate: (self) => {
          if (self.progress <= 0.5) {
            const yProgress = self.progress / 0.5;
            gsap.set(headers[0], { y: `${yProgress * 100}%` });
            gsap.set(headers[2], { y: `${yProgress * -100}%` });
          } else {
            gsap.set(headers[0], { y: "100%" });
            gsap.set(headers[2], { y: "-100%" });

            const scaleProgress = (self.progress - 0.5) / 0.5;
            const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
            const scale = 1 - scaleProgress * (1 - minScale);

            headers.forEach((header) => gsap.set(header, { scale }));
          }
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      <section aria-label="Services" className="services">
        {[0, 1, 2].map((i) => (
          <div key={i} className="services-header">
            <img
              src="/WhatIDo.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </section>

      <section aria-label="My design philosophy" className="services-copy">
        <h2
          className="animate-text text-7xl font-black tracking-tight leading-snug text-center"
          data-text={SERVICES_TEXT}
        >
          {SERVICES_TEXT}
        </h2>
      </section>
    </div>
  );
};

export default WhatIDo;
