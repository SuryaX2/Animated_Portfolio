import { useGSAP } from "@gsap/react";
import {
  RiBnbLine,
  RiCloseLargeLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMenuLine,
  RiTwitterXFill,
} from "@remixicon/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for animation targets
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuImageRef = useRef(null);
  const menuLinksRef = useRef(null);
  const menuTagsRef = useRef(null);
  const menuFooterRef = useRef(null);

  // Timeline ref
  const timelineRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(CustomEase, SplitText);

    // Custom easing curves
    CustomEase.create("menuEase", "0.87, 0, 0.13, 1");
    CustomEase.create("smooth", "0.65, 0, 0.35, 1");

    let splitInstances = [];

    const initializeSplitText = () => {
      const menuLinks = menuLinksRef.current?.querySelectorAll("a");
      const menuTags = menuTagsRef.current?.querySelectorAll(".menu-tag");
      const footerText = menuFooterRef.current?.querySelectorAll("p");

      // Split menu links
      menuLinks?.forEach((link) => {
        const split = new SplitText(link, {
          type: "lines",
          linesClass: "line-wrapper",
        });

        const innerSplit = new SplitText(link, {
          type: "lines",
          linesClass: "line-inner",
        });

        splitInstances.push(split, innerSplit);
        gsap.set(innerSplit.lines, { yPercent: 110 });
      });

      // Split tags and footer
      [...menuTags, ...footerText].forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line-inner",
        });
        splitInstances.push(split);
        gsap.set(split.lines, { yPercent: 110 });
      });
    };

    // Wait for fonts to load before initializing SplitText
    const setupAnimations = async () => {
      try {
        await document.fonts.ready;
        initializeSplitText();
      } catch (error) {
        // Fallback: wait a bit then initialize
        setTimeout(initializeSplitText, 100);
      }

      // Set initial states
      gsap.set(menuOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });

      gsap.set(menuContentRef.current, { opacity: 0 });
      gsap.set(menuImageRef.current, { scale: 1.2, opacity: 0 });

      // Create timeline
      timelineRef.current = gsap.timeline({ paused: true });

      timelineRef.current
        // Overlay expansion from top to bottom
        .to(menuOverlayRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "menuEase",
        })
        // Content fade in
        .to(
          menuContentRef.current,
          {
            opacity: 1,
            duration: 0.6,
            ease: "circ.out",
          },
          "-=0.7",
        )
        // Image reveal
        .to(
          menuImageRef.current,
          {
            scale: 1,
            opacity: 0.8,
            duration: 1,
            ease: "menuEase",
          },
          "<",
        )
        // Animate menu links
        .to(
          menuLinksRef.current?.querySelectorAll(".line-inner"),
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "menuEase",
          },
          "<",
        )
        // Animate tags
        .to(
          menuTagsRef.current?.querySelectorAll(".line-inner"),
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "menuEase",
          },
          "-=1",
        )
        // Animate footer
        .to(
          menuFooterRef.current?.querySelectorAll(".line-inner"),
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "menuEase",
          },
          "<",
        );
    };

    setupAnimations();

    return () => {
      splitInstances.forEach((instance) => instance.revert());
    };
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;

    if (!isMenuOpen) {
      timelineRef.current.play();
      setIsMenuOpen(true);
    } else {
      timelineRef.current.reverse();
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 w-full px-8 py-6 flex items-center justify-between pointer-events-auto text-white z-100 mix-blend-difference">
        <div className="w-10 h-10">
          <a href="#" className="block">
            <RiBnbLine />
          </a>
        </div>

        <button
          onClick={toggleMenu}
          className="group flex items-center gap-3 cursor-pointer bg-transparent border-none outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="text-sm font-semibold uppercase tracking-wider transition-opacity duration-300">
            {isMenuOpen ? "Close" : "Menu"}
          </span>

          <div className="relative w-12 h-12 flex items-center justify-center border border-white rounded-full overflow-hidden transition-all duration-500 ease-menuEase group-hover:scale-110">
            {/* Menu Icon */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
            >
              <RiMenuLine />
            </div>

            {/* Close Icon */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
            >
              <RiCloseLargeLine />
            </div>
          </div>
        </button>
      </nav>

      {/* Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 w-full h-screen bg-neutral-950 z-90 overflow-hidden"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div ref={menuContentRef} className="relative w-full h-full flex">
          {/* Left Side - Image */}
          <div className="w-2/5 h-full relative overflow-hidden">
            <div ref={menuImageRef} className="w-full h-full">
              <img
                src="/me.jpg"
                alt="Menu Visual"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>

          {/* Right Side - Menu Content */}
          <div className="flex-1 relative flex flex-col justify-between p-16">
            {/* Main Navigation */}
            <div className="flex gap-24">
              {/* Primary Links */}
              <div ref={menuLinksRef} className="flex flex-col gap-1">
                {[
                  "Home",
                  "About",
                  "Skills",
                  "Education",
                  "Projects",
                  "Contact",
                ].map((item, index) => (
                  <div key={item} className="overflow-hidden">
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="block text-7xl font-light leading-tight text-white hover:text-neutral-400 transition-colors duration-300"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {item}
                    </a>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div ref={menuTagsRef} className="flex flex-col gap-3 pt-2">
                {["Web Animation", "Tech Enthusiast", "Software Developer"].map(
                  (tag) => (
                    <div key={tag} className="overflow-hidden">
                      <div className="menu-tag">
                        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                          {tag}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Footer Info */}
            <div
              ref={menuFooterRef}
              className="flex gap-16 p-4 border-t border-neutral-800"
            >
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-neutral-500">
                    Location
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-base text-neutral-400">Kolkata, India</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-neutral-500">
                    Contact
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-base text-neutral-400">+91 9830846280</p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-base text-neutral-400">
                    sekharsurya111@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-auto">
                <div className="flex gap-4 my-auto">
                  {[
                    <RiLinkedinBoxFill />,
                    <RiGithubFill />,
                    <RiTwitterXFill />,
                  ].map((icon) => (
                    <a
                      key={icon}
                      href="#"
                      className="text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                      <span className="">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for line masking */}
      <style jsx>{`
        .line-wrapper {
          overflow: hidden;
          display: block;
        }

        .line-inner {
          display: block;
          will-change: transform;
        }
      `}</style>
    </>
  );
};

export default Navbar;
