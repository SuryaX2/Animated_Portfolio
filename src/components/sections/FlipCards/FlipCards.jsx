import gsap from "gsap";
import "./FlipCards.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "card-1",
    number: "(01)",
    label: "Develop",
    imgSrc: "/card-left.jpg",
  },
  {
    id: "card-2",
    number: "(02)",
    label: "Design",
    imgSrc: "/card-middle.jpg",
  },
  {
    id: "card-3",
    number: "(03)",
    label: "Deploy",
    imgSrc: "/card-right.jpg",
  },
];

const FlipCards = () => {
  const sectionRef = useRef(null);
  const cardContainerRef = useRef(null);
  const stickyHeaderRef = useRef(null);
  const isGapAnimationComplete = useRef(false);
  const isFlipAnimationComplete = useRef(false);

  useGSAP(
    () => {
      const cardContainer = cardContainerRef.current;
      const stickyHeader = stickyHeaderRef.current;

      const mm = gsap.matchMedia();

      mm.add("(max-width: 999px)", () => {
        gsap.set([".card", cardContainer, stickyHeader], { clearProps: "all" });
      });

      mm.add("(min-width: 1000px)", () => {
        isGapAnimationComplete.current = false;
        isFlipAnimationComplete.current = false;

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 2,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress < 0.1) {
              gsap.set(stickyHeader, { y: 40, opacity: 0 });
            } else if (progress >= 0.1 && progress <= 0.25) {
              const headerProgress = gsap.utils.mapRange(
                0.1,
                0.25,
                0,
                1,
                progress,
              );
              gsap.set(stickyHeader, {
                y: gsap.utils.mapRange(0, 1, 40, 0, headerProgress),
                opacity: gsap.utils.mapRange(0, 1, 0, 1, headerProgress),
              });
            } else {
              gsap.set(stickyHeader, { y: 0, opacity: 1 });
            }

            gsap.set(cardContainer, {
              width:
                progress <= 0.25
                  ? `${gsap.utils.mapRange(0, 0.25, 75, 60, progress)}%`
                  : "60%",
            });

            if (progress >= 0.35 && !isGapAnimationComplete.current) {
              gsap.to(cardContainer, {
                gap: "20px",
                duration: 0.5,
                ease: "power4.out",
              });
              gsap.to(["#card-1", "#card-2", "#card-3"], {
                borderRadius: "20px",
                duration: 0.5,
                ease: "power4.out",
              });
              isGapAnimationComplete.current = true;
            } else if (progress < 0.35 && isGapAnimationComplete.current) {
              gsap.to(cardContainer, {
                gap: "0px",
                duration: 0.5,
                ease: "power4.out",
              });
              gsap.to("#card-1", {
                borderRadius: "20px 0 0 20px",
                duration: 0.5,
                ease: "power4.out",
              });
              gsap.to("#card-2", {
                borderRadius: "0px",
                duration: 0.5,
                ease: "power4.out",
              });
              gsap.to("#card-3", {
                borderRadius: "0px 20px 20px 0",
                duration: 0.5,
                ease: "power4.out",
              });
              isGapAnimationComplete.current = false;
            }

            if (progress >= 0.7 && !isFlipAnimationComplete.current) {
              gsap.to(".card", {
                rotateY: 180,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: 0.1,
              });
              gsap.to(["#card-1", "#card-3"], {
                y: 30,
                rotateZ: (i) => [-15, 15][i],
                duration: 0.75,
                ease: "power3.inOut",
              });
              isFlipAnimationComplete.current = true;
            } else if (progress < 0.7 && isFlipAnimationComplete.current) {
              gsap.to(".card", {
                rotateY: 0,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: -0.1,
              });
              gsap.to(["#card-1", "#card-3"], {
                y: 0,
                rotateZ: 0,
                duration: 0.75,
                ease: "power3.inOut",
              });
              isFlipAnimationComplete.current = false;
            }
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="FlipCards relative w-screen h-screen p-8 bg-[#0f0f0f] text-white"
      aria-label="Three Pillars With One Purpose"
    >
      <div className="sticky-header">
        <h1 ref={stickyHeaderRef} className="text-7xl font-medium leading-none">
          Three Pillars With One Purpose
        </h1>
      </div>

      <div ref={cardContainerRef} className="card-container">
        {CARDS.map(({ id, number, label }, index) => (
          <article
            key={id}
            className="card"
            id={id}
            aria-label={`Card ${index + 1}: ${label}`}
          >
            <div className="card-front">
              <img
                src={CARDS[index].imgSrc}
                alt={label}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
            <div className="card-back" aria-hidden="true">
              <span className="card-back-number">{number}</span>
              <hr className="card-back-rule" />
              <p className="card-back-label">{label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FlipCards;
