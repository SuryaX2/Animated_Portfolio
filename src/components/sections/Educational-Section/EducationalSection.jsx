import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import "./EducationalSection.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EDUCATION_DATA = [
  {
    id: "secondary",
    name: ["Bagmari Manicktala Govt. Sponsd", "High School"],
    degree: "Secondary Education",
    qualifier: "Class X — WBBSE",
    period: { from: "2009", to: "2020" },
    level: "01",
    image: "/me.jpg",
    alt: "Bagmari Manicktala Government Sponsored High School campus",
    location: "Kolkata, West Bengal",
  },
  {
    id: "higher-secondary",
    name: ["Bagmari Manicktala Govt. Sponsd", "High School"],
    degree: "Higher Secondary Education",
    qualifier: "Class XII — WBCHSE",
    period: { from: "2020", to: "2022" },
    level: "02",
    image: "/me.jpg",
    alt: "Bagmari Manicktala Government Sponsored High School campus",
    location: "Kolkata, West Bengal",
  },
  {
    id: "undergraduate",
    name: "Narula Institute of Technology",
    degree: "Bachelor of Technology",
    qualifier: "B.Tech — Information Technology",
    period: { from: "2022", to: "Present" },
    level: "03",
    image: "/me.jpg",
    alt: "Narula Institute of Technology campus",
    location: "Agarpara, West Bengal",
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
        const meta = item.querySelector(".work-item-meta");
        const period = item.querySelector(".edu-period");

        if (!heading || !img) return;

        const split = SplitText.create(heading, {
          type: "chars",
          mask: "chars",
        });

        split.chars.forEach((char, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: `top+=${index * 15 - 250} top`,
            end: `top+=${index * 15 - 100} top`,
            scrub: 2,
            animation: gsap.fromTo(
              char,
              { y: "125%" },
              { y: "0%", ease: "none" },
            ),
          });
        });

        if (meta) {
          ScrollTrigger.create({
            trigger: item,
            start: "top bottom",
            end: "top top",
            scrub: 2,
            animation: gsap.fromTo(
              meta,
              { opacity: 0, y: "150%" },
              { opacity: 1, y: 0, ease: "none" },
            ),
          });
        }

        if (period) {
          ScrollTrigger.create({
            trigger: item,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 2,
            animation: gsap.fromTo(
              period,
              { opacity: 0, y: "150%" },
              { opacity: 1, y: 0, ease: "none" },
            ),
          });
        }

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
      {EDUCATION_DATA.map(
        ({
          id,
          name,
          degree,
          qualifier,
          period,
          level,
          image,
          alt,
          location,
        }) => (
          <section
            key={id}
            className="work-item relative w-screen overflow-hidden"
            aria-label={`${Array.isArray(name) ? name.join(" ") : name} — ${degree} (${period.from}–${period.to})`}
            itemScope
            itemType="https://schema.org/EducationalOrganization"
          >
            <div className="work-item-img" role="img" aria-label={alt}>
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="img-overlay" aria-hidden="true" />
            </div>

            <div className="edu-level-badge" aria-hidden="true">
              {level}
            </div>

            <div className="work-item-name">
              <div className="work-item-meta">
                <p className="work-item-degree" itemProp="description">
                  {degree}
                  {qualifier && (
                    <span className="work-item-qualifier"> · {qualifier}</span>
                  )}
                </p>
                <p className="work-item-location" itemProp="address">
                  {location}
                </p>
              </div>

              <h2
                className="split-target uppercase text-center font-medium leading-none"
                itemProp="name"
              >
                {Array.isArray(name)
                  ? name.map((line, i) => (
                      <span key={i} style={{ display: "block" }}>
                        {line}
                      </span>
                    ))
                  : name}
              </h2>

              <div
                className="edu-period"
                aria-label={`Duration: ${period.from} to ${period.to}`}
              >
                <span className="period-from">{period.from}</span>
                <span className="period-arrow" aria-hidden="true">
                  →
                </span>
                <span className="period-to">{period.to}</span>
              </div>
            </div>
          </section>
        ),
      )}
    </div>
  );
};

export default EducationalSection;
