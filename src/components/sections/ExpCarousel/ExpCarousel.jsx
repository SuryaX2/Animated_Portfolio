import gsap from "gsap";
import "./ExpCarousel.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: "Accenture",
    subtitle: "Associate Software Engineering Intern",
    period: "May 2025 - July 2025",
    img: "/Experience/Exp1.jpg",
  },
  {
    id: 2,
    img: "/Experience/Exp2.jpg",
  },
  {
    id: 3,
    img: "/Experience/Exp3.jpg",
  },
];

const ExpCarousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const slidesRef = useRef(null);
  const slideRefs = useRef([]);

  useGSAP(
    () => {
      const carousel = carouselRef.current;
      const slider = sliderRef.current;
      const slidesContainer = slidesRef.current;
      const slides = slideRefs.current;

      if (!carousel || !slider || !slidesContainer || !slides.length) return;

      const stickyHeight = window.innerHeight * (experiences.length + 2);
      const totalMove = slidesContainer.offsetWidth - slider.offsetWidth;
      const slideWidth = slider.offsetWidth;

      slides.forEach((slide) => {
        const title = slide.querySelector(".ec-title h2");
        if (title) gsap.set(title, { y: -200 });
      });

      let currentVisibleIndex = null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const currentIndex = slides.indexOf(entry.target);
            const titles = slides.map((slide) =>
              slide.querySelector(".ec-title h2"),
            );

            if (entry.intersectionRatio >= 0.25) {
              currentVisibleIndex = currentIndex;
              titles.forEach((title, index) => {
                if (!title) return;
                gsap.to(title, {
                  y: index === currentIndex ? 0 : -200,
                  duration: 0.5,
                  ease: "power2.out",
                  overwrite: true,
                });
              });
            } else if (
              entry.intersectionRatio < 0.25 &&
              currentVisibleIndex === currentIndex
            ) {
              const prevIndex = currentIndex - 1;
              currentVisibleIndex = prevIndex >= 0 ? prevIndex : null;

              titles.forEach((title, index) => {
                if (!title) return;
                gsap.to(title, {
                  y: index === prevIndex ? 0 : -200,
                  duration: 0.5,
                  ease: "power2.out",
                  overwrite: true,
                });
              });
            }
          });
        },
        {
          root: slider,
          threshold: [0, 0.25],
        },
      );

      slides.forEach((slide) => observer.observe(slide));

      ScrollTrigger.create({
        trigger: carousel,
        start: "top top",
        end: `+=${stickyHeight}px`,
        scrub: 2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const mainMove = progress * totalMove;

          gsap.set(slidesContainer, { x: -mainMove });

          const currentSlide = Math.floor(mainMove / slideWidth);
          const sliderProgress = (mainMove % slideWidth) / slideWidth;

          slides.forEach((slide, index) => {
            const image = slide.querySelector(".ec-img img");
            if (!image) return;

            if (index === currentSlide || index === currentSlide + 1) {
              const relativeProgress =
                index === currentSlide ? sliderProgress : sliderProgress - 1;
              const parallaxAmount = relativeProgress * slideWidth * 0.25;

              gsap.set(image, { x: parallaxAmount, scale: 1.35 });
            } else {
              gsap.set(image, { x: 0, scale: 1.35 });
            }
          });
        },
      });

      return () => observer.disconnect();
    },
    { scope: carouselRef },
  );

  return (
    <section
      ref={carouselRef}
      className="ec-carousel"
      aria-label="Experience carousel"
    >
      <div ref={sliderRef} className="ec-slider">
        <div
          ref={slidesRef}
          className="ec-slides"
          style={{ width: `${experiences.length * 100}%` }}
        >
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className="ec-slide"
              ref={(el) => (slideRefs.current[index] = el)}
              aria-label={`${exp.title} — ${exp.subtitle}`}
            >
              <div className="ec-img">
                <img src={exp.img} alt={`${exp.title} office environment`} />
              </div>
              {exp.title && (
                <div className="ec-meta">
                  <div className="ec-title">
                    <h2>{exp.title}</h2>
                  </div>
                  <div className="ec-info">
                    <span>{exp.subtitle}</span>
                    <p>{exp.period}</p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpCarousel;
