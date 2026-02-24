import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import "./EducationalSection.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EDUCATION_DATA = [
  {
    id: "primary",
    name: "Deshbandhu Vidyapeeth",
    degree: "Primary Education",
    image: "/me.jpg",
    alt: "Deshbandhu Vidyapeeth school building",
  },
  {
    id: "secondary",
    name: "Bagmari Manicktala Govt. Sponsd High School",
    degree: "Secondary Education (Class X)",
    image: "/me.jpg",
    alt: "Bagmari Manicktala Government Sponsored High School campus",
  },
  {
    id: "higher-secondary",
    name: "Bagmari Manicktala Govt. Sponsd High School",
    degree: "Higher Secondary Education (Class XII)",
    image: "/me.jpg",
    alt: "Bagmari Manicktala Government Sponsored High School campus",
  },
  {
    id: "undergraduate",
    name: "Narula Institute of Technology",
    degree: "Bachelor of Technology",
    image: "/me.jpg",
    alt: "Narula Institute of Technology campus",
  },
];

const EducationalSection = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".work-item", containerRef.current);

      items.forEach((item) => {
        const img = item.querySelector(".work-item-img");
        const heading = item.querySelector(".split-target");

        if (!heading || !img) return;

        const split = SplitText.create(heading, {
          type: "chars",
          mask: "chars",
        });

        split.chars.forEach((char, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: `top+=${index * 25 - 250} top`,
            end: `top+=${index * 25 - 100} top`,
            scrub: 2,
            animation: gsap.fromTo(
              char,
              { y: "125%" },
              { y: "0%", ease: "none" },
            ),
          });
        });

        ScrollTrigger.create({
          trigger: item,
          start: "top bottom",
          end: "top top",
          scrub: 2,
          animation: gsap.fromTo(
            img,
            { clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
            },
          ),
        });

        ScrollTrigger.create({
          trigger: item,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 2,
          animation: gsap.fromTo(
            img,
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
              ease: "none",
            },
          ),
        });
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div ref={containerRef}>
      {EDUCATION_DATA.map(({ id, name, degree, image, alt }) => (
        <section
          key={id}
          className="work-item relative w-screen overflow-hidden"
          aria-label={`${name} — ${degree}`}
        >
          <div className="work-item-img" role="img" aria-label={alt}>
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="work-item-name">
            <p className="work-item-degree">{degree}</p>
            <h2 className="split-target uppercase text-center text-5xl lg:text-8xl font-medium leading-none">
              {name}
            </h2>
          </div>
        </section>
      ))}
    </div>
  );
};

export default EducationalSection;
