import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PinnedProjects = ({
  leftContent = [],
  rightContent = [],
  leftWidth = "w-[50%]",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const wrappers = containerRef.current?.querySelectorAll(
      ".pinned-right .pinned-img-wrapper",
    );
    wrappers?.forEach((el) => {
      const order = el.getAttribute("data-index");
      if (order !== null) el.style.zIndex = order;
    });
  }, []);

  useEffect(() => {
    const handleMobileLayout = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const leftItems = gsap.utils.toArray(".pinned-left .pinned-item");
      const rightItems = gsap.utils.toArray(
        ".pinned-right .pinned-img-wrapper",
      );

      if (isMobile) {
        leftItems.forEach((item, i) => (item.style.order = i * 2));
        rightItems.forEach((item, i) => (item.style.order = i * 2 + 1));
      } else {
        leftItems.forEach((item) => (item.style.order = ""));
        rightItems.forEach((item) => (item.style.order = ""));
      }
    };

    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(handleMobileLayout, 100);
    };
    window.addEventListener("resize", onResize);
    handleMobileLayout();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  useGSAP(
    () => {
      const imgs = gsap.utils.toArray(
        ".pinned-arch .pinned-img-wrapper img.pinned-project-img",
      );

      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => {
          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".pinned-arch",
              start: "top top",
              end: "bottom bottom",
              pin: ".pinned-right",
              scrub: true,
            },
          });

          gsap.set(imgs, { clipPath: "inset(0)", objectPosition: "0px 0%" });

          imgs.forEach((_, i) => {
            const current = imgs[i];
            const next = imgs[i + 1] ?? null;
            const tl = gsap.timeline();

            if (next) {
              tl.to(
                current,
                {
                  clipPath: "inset(0px 0px 100%)",
                  objectPosition: "0px 60%",
                  duration: 1.5,
                  ease: "none",
                },
                0,
              ).to(
                next,
                { objectPosition: "0px 40%", duration: 1.5, ease: "none" },
                0,
              );
            }

            mainTl.add(tl);
          });
        },

        "(max-width: 768px)": () => {
          gsap.set(imgs, { objectPosition: "0px 60%" });

          imgs.forEach((image) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: image,
                  start: "top-=70% top+=50%",
                  end: "bottom+=200% bottom",
                  scrub: true,
                },
              })
              .to(image, {
                objectPosition: "0px 30%",
                duration: 5,
                ease: "none",
              });
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div className="pinned-arch flex items-start max-md:flex-col max-md:gap-5 m-8">
        <div
          className={`pinned-left flex flex-col shrink-0 max-md:w-full ${leftWidth}`}
        >
          {leftContent.map((node, i) => (
            <div
              key={i}
              className="pinned-item h-screen flex items-center max-md:h-auto max-md:py-12"
            >
              {node}
            </div>
          ))}
        </div>

        <div
          className="pinned-right flex-1 h-screen w-full relative max-md:h-auto hidden md:block"
          aria-hidden="true"
        >
          {rightContent.map((node, i) => (
            <div
              key={i}
              className="pinned-img-wrapper absolute top-1/2 left-0 -translate-y-1/2 w-full max-md:static max-md:translate-y-0 max-md:mb-5"
              data-index={rightContent.length - i + 1}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinnedProjects;
