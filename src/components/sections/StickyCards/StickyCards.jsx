import gsap from "gsap";
import "./StickyCards.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
  const cards = [
    {
      index: "01",
      title: "Card 1",
      image: "/me.jpg",
      description: "This is the first card.",
    },
    {
      index: "02",
      title: "Card 2",
      image: "/me.jpg",
      description: "This is the second card.",
    },
    {
      index: "03",
      title: "Card 3",
      image: "/me.jpg",
      description: "This is the third card.",
    },
    {
      index: "04",
      title: "Card 4",
      image: "/me.jpg",
      description: "This is the fourth card.",
    },
  ];

  const containerRef = useRef(null);

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll(".sticky-card");
      stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            pin: true,
            pinSpacing: false,
            scrub: 2,
          });
        }

        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="sticky-cards" ref={containerRef}>
      {cards.map((card, index) => (
        <div className="sticky-card" key={index}>
          <div className="sticky-card-index">
            <h1 className="text-6xl">{card.index}</h1>
          </div>
          <div className="sticky-card-content">
            <div className="sticky-card-content-wrapper">
              <h1 className="sticky-card-header text-4xl">{card.title}</h1>

              <div className="sticky-card-img">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sticky-card-copy">
                <div className="sticky-card-copy-title">
                  <p className="text-2xl">(About the state)</p>
                </div>
                <div className="sticky-card-copy-description">
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCards;
