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
      title: "Languages & Core",
      image: "Language_Core.jpg",
      techLabel: "Core Stack",
      icons: ["c", "java", "mysql"],
      description:
        "Proficient in C, Java, and SQL with a strong grasp of object-oriented programming and algorithmic thinking. Java is my primary language for building structured backend logic, while SQL drives my approach to relational data modeling and query optimization across MySQL-based systems.",
    },
    {
      index: "02",
      title: "Web Development",
      image: "WebDev.jpg",
      techLabel: "Tech Stack",
      icons: ["html", "css", "js", "express"],
      description:
        "Skilled in crafting semantic, responsive interfaces using HTML5, CSS3, and JavaScript. I leverage Express.js to design lightweight server-side architectures — handling routing, middleware, and RESTful endpoint design with clarity and consistency.",
    },
    {
      index: "03",
      title: "Frameworks & Stack",
      image: "/Framework.jpg",
      techLabel: "Tech Stack",
      icons: ["mongo", "express", "react", "nodejs", "tailwind", "jwt"],
      description:
        "Experienced in end-to-end product development using the MERN stack. Shipped production-grade apps featuring JWT authentication, role-based dashboards, full CRUD operations, and cloud deployments on Vercel with Cloudinary for media management.",
    },
    {
      index: "04",
      title: "Tools & Workflow",
      image: "/Tools.jpg",
      techLabel: "Tech Stack",
      icons: ["git", "github", "vscode", "postman", "figma"],
      description:
        "Versed in a professional workflow using Git, GitHub, VS Code, Tailwind CSS, and Ant Design. Also experienced with ServiceNow — building Service Catalog items and automating approval workflows via Flow Designer during my internship at Accenture.",
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
        <div className="sticky-card rounded-t-4xl" key={index}>
          <div className="sticky-card-index">
            <h1 className="text-9xl font-medium">({card.index})</h1>
          </div>
          <div className="sticky-card-content">
            <div className="sticky-card-content-wrapper">
              <h1 className="sticky-card-header text-4xl font-bold tracking-wider uppercase">
                {card.title}
              </h1>

              <div className="sticky-card-img">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div className="sticky-card-copy">
                <div className="sticky-card-copy-title">
                  <p className="text-2xl">({card.techLabel})</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      marginTop: "0.75rem",
                    }}
                  >
                    {Array.from(
                      { length: Math.ceil(card.icons.length / 3) },
                      (_, rowIndex) => (
                        <div
                          key={rowIndex}
                          style={{ display: "flex", gap: "1.5rem" }}
                        >
                          {card.icons
                            .slice(rowIndex * 3, rowIndex * 3 + 3)
                            .map((icon) => (
                              <img
                                key={icon}
                                src={`https://skillicons.dev/icons?i=${icon}`}
                                alt={icon}
                                width={40}
                                height={40}
                                title={icon}
                              />
                            ))}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="sticky-card-copy-description font-semibold">
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
