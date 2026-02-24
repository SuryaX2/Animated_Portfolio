import { useGSAP } from "@gsap/react";
import {
  RiBnbLine,
  RiCloseLargeLine,
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiMenuLine,
} from "@remixicon/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import { useLenisContext } from "../../context/LenisContext";

const NAVIGATION_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const TAGS = [
  "Web Animation",
  "Web Developer",
  "Tech Enthusiast",
  "Software Developer",
  "Full Stack Developer",
];

const SOCIAL_LINKS = [
  {
    icon: RiLinkedinBoxFill,
    href: "https://www.linkedin.com/in/suryax2",
    label: "LinkedIn",
  },
  {
    icon: RiGithubFill,
    href: "https://github.com/suryax2",
    label: "GitHub",
  },
  {
    icon: RiInstagramLine,
    href: "https://www.instagram.com/surya.sekhar.sharma/",
    label: "Instagram",
  },
];

const CONTACT_INFO = {
  location: "Kolkata, India",
  phone: "+91 9830846280",
  email: "sekharsurya111@gmail.com",
};

const ANIMATION_CONFIG = {
  overlayDuration: 1,
  contentFadeDuration: 0.8,
  imageDuration: 1,
  linkStagger: 0.1,
  tagStagger: 0.06,
  footerStagger: 0.06,
  easeType: "menuEase",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useLenisContext();

  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuImageRef = useRef(null);
  const menuLinksRef = useRef(null);
  const menuTagsRef = useRef(null);
  const menuFooterRef = useRef(null);
  const timelineRef = useRef(null);
  const splitInstancesRef = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(CustomEase, SplitText);

    CustomEase.create("menuEase", "0.87, 0, 0.13, 1");
    CustomEase.create("smooth", "0.65, 0, 0.35, 1");

    const initializeSplitText = () => {
      const menuLinks = menuLinksRef.current?.querySelectorAll("a");
      const menuTags = menuTagsRef.current?.querySelectorAll(".menu-tag");
      const footerText = menuFooterRef.current?.querySelectorAll("p, a");

      splitInstancesRef.current = [];

      menuLinks?.forEach((link) => {
        const outerSplit = new SplitText(link, {
          type: "lines",
          linesClass: "line-wrapper",
        });

        const innerSplit = new SplitText(link, {
          type: "lines",
          linesClass: "line-inner",
        });

        splitInstancesRef.current.push(outerSplit, innerSplit);
        gsap.set(innerSplit.lines, { yPercent: 120, opacity: 0 });
      });

      [...menuTags, ...footerText].forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line-inner",
        });
        splitInstancesRef.current.push(split);
        gsap.set(split.lines, { yPercent: 120, opacity: 0 });
      });
    };

    const setupAnimations = async () => {
      try {
        await document.fonts.ready;
        initializeSplitText();
      } catch {
        setTimeout(initializeSplitText, 150);
      }

      gsap.set(menuOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });

      gsap.set(menuContentRef.current, { opacity: 0 });
      gsap.set(menuImageRef.current, {
        scale: 1.3,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      });

      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(menuOverlayRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: ANIMATION_CONFIG.overlayDuration,
          ease: ANIMATION_CONFIG.easeType,
        })
        .to(
          menuContentRef.current,
          {
            opacity: 1,
            duration: ANIMATION_CONFIG.contentFadeDuration,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .to(
          menuImageRef.current,
          {
            scale: 1,
            clipPath: "inset(0 0 0% 0)",
            opacity: 0.85,
            duration: ANIMATION_CONFIG.imageDuration,
            ease: ANIMATION_CONFIG.easeType,
          },
          "<0.1",
        )
        .to(
          menuLinksRef.current?.querySelectorAll(".line-inner"),
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: ANIMATION_CONFIG.linkStagger,
            ease: ANIMATION_CONFIG.easeType,
          },
          "-=0.9",
        )
        .to(
          menuTagsRef.current?.querySelectorAll(".line-inner"),
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: ANIMATION_CONFIG.tagStagger,
            ease: ANIMATION_CONFIG.easeType,
          },
          "-=1.2",
        )
        .to(
          menuFooterRef.current?.querySelectorAll(".line-inner"),
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: ANIMATION_CONFIG.footerStagger,
            ease: ANIMATION_CONFIG.easeType,
          },
          "-=1.1",
        );
    };

    setupAnimations();

    return () => {
      splitInstancesRef.current.forEach((instance) => instance?.revert());
      timelineRef.current?.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;

    if (!isMenuOpen) {
      timelineRef.current.play();
      setIsMenuOpen(true);
      lenisRef?.current?.stop();
    } else {
      timelineRef.current.reverse();
      setIsMenuOpen(false);
      lenisRef?.current?.start();
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");

    if (timelineRef.current) {
      timelineRef.current.reverse();
      setIsMenuOpen(false);
      lenisRef?.current?.start();
    }

    setTimeout(() => {
      if (href) {
        lenisRef?.current?.scrollTo(href, { duration: 1.4, offset: 0 });
      }
    }, 300);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-8 py-1 flex items-center justify-between pointer-events-auto text-white z-[100] mix-blend-difference">
        <a
          href="#hero"
          className="w-8 h-8 transition-transform duration-300 hover:scale-110"
          aria-label="Home"
          onClick={(e) => {
            e.preventDefault();
            lenisRef?.current?.scrollTo("#hero", { duration: 1.4 });
          }}
        >
          <RiBnbLine className="w-full h-full" />
        </a>

        <button
          onClick={toggleMenu}
          className="group flex items-center gap-3 cursor-pointer bg-transparent border-none outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="text-sm font-semibold uppercase tracking-wider transition-opacity duration-300">
            {isMenuOpen ? "Close" : "Menu"}
          </span>

          <div className="relative w-12 h-12 flex items-center justify-center border-2 border-white rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:scale-110 group-hover:border-neutral-300">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isMenuOpen
                  ? "opacity-0 rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <RiMenuLine className="w-6 h-6" />
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isMenuOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            >
              <RiCloseLargeLine className="w-6 h-6" />
            </div>
          </div>
        </button>
      </nav>

      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 w-screen h-screen bg-neutral-950 z-[90] overflow-hidden"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
        aria-hidden={!isMenuOpen}
      >
        <div ref={menuContentRef} className="relative w-full h-full flex">
          <div className="w-2/5 h-full relative overflow-hidden bg-neutral-900">
            <div
              ref={menuImageRef}
              className="w-full h-full"
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src="/me.jpg"
                alt="Portfolio preview"
                className="w-full h-full object-cover object-right"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1 relative flex flex-col justify-center p-10 overflow-y-hidden">
            <div className="flex gap-34 items-end">
              <nav
                ref={menuLinksRef}
                className="flex flex-col gap-3"
                aria-label="Main navigation"
              >
                {NAVIGATION_ITEMS.map((item, index) => (
                  <div key={item.label} className="overflow-hidden">
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block text-7xl font-extralight uppercase leading-[1.1] text-white hover:text-neutral-400 transition-colors duration-300 will-change-transform"
                      style={{ transitionDelay: `${index * 30}ms` }}
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </nav>

              <aside
                ref={menuTagsRef}
                className="flex flex-col gap-4 pt-3"
                aria-label="Profile tags"
              >
                {TAGS.map((tag) => (
                  <div key={tag} className="overflow-hidden">
                    <div className="menu-tag">
                      <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest will-change-transform">
                        {tag}
                      </p>
                    </div>
                  </div>
                ))}
              </aside>
            </div>

            <footer
              ref={menuFooterRef}
              className="flex gap-16 pt-6 mt-auto border-t border-neutral-800"
            >
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    Location
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-base text-neutral-400">
                    {CONTACT_INFO.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    Contact
                  </p>
                </div>
                <div className="overflow-hidden">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-base text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="overflow-hidden">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-base text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-auto">
                <div className="flex gap-4 items-center">
                  {SOCIAL_LINKS.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-neutral-400 ${social.label === "LinkedIn" ? "hover:text-blue-400" : social.label === "Instagram" ? "hover:text-pink-400" : "hover:text-white"} transition-all duration-300 hover:scale-110`}
                        aria-label={social.label}
                      >
                        <IconComponent className="w-8 h-8" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-wrapper {
          overflow: hidden;
          display: block;
        }

        .line-inner {
          display: block;
          will-change: transform, opacity;
        }

        html {
          scroll-behavior: auto;
        }
      `}</style>
    </>
  );
};

export default Navbar;
