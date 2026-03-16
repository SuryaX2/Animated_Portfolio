import { useGSAP } from "@gsap/react";
import {
  RiBnbLine,
  RiCloseLargeLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMenuLine,
  RiDownloadFill,
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
    hoverColor: "hover:text-blue-400",
  },
  {
    icon: RiGithubFill,
    href: "https://github.com/suryax2",
    label: "GitHub",
    hoverColor: "hover:text-white",
  },
];

const CONTACT_INFO = {
  location: "Kolkata, India",
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

      [...(menuTags || []), ...(footerText || [])].forEach((element) => {
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
          "<",
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
          "<",
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
          "-=1",
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
          "<",
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
      if (href) lenisRef?.current?.scrollTo(href, { duration: 1.4, offset: 0 });
    }, 300);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-8 py-1 flex items-center justify-between pointer-events-auto text-white z-100 mix-blend-difference">
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
          className="group flex items-center gap-3 cursor-pointer bg-white text-black border-2 px-2 py-1 outline-none rounded-full"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="text-sm font-semibold tracking-tighter transition-opacity duration-300 p-1">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <div className="relative w-10 h-10 flex items-center justify-center border-2 border-black bg-black rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
            >
              <RiMenuLine className="w-6 h-6 text-white" />
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
            >
              <RiCloseLargeLine className="w-6 h-6 text-white" />
            </div>
          </div>
        </button>
      </nav>

      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 w-screen h-screen bg-neutral-950 z-90 overflow-hidden"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
        aria-hidden={!isMenuOpen}
      >
        <div ref={menuContentRef} className="relative w-full h-full flex">
          <div className="hidden md:block md:w-2/5 h-full relative overflow-hidden bg-neutral-900 shrink-0">
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

          <div className="flex-1 relative flex flex-col h-full overflow-y-auto p-6 sm:p-8 md:p-10">
            <div className="md:hidden flex items-center gap-3 pt-16 pb-4 mb-2">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-neutral-700 shrink-0">
                <img
                  src="/me.jpg"
                  alt="Surya Sekhar Sharma"
                  className="w-full h-full object-cover object-right"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-white text-sm font-semibold tracking-wide leading-tight">
                  Surya Sekhar Sharma
                </p>
                <p className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                  Creative Developer
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[9px] text-neutral-400 tracking-[0.15em] uppercase whitespace-nowrap">
                  Open to work
                </span>
              </div>
            </div>

            <div className="md:hidden w-full h-px bg-neutral-800 mb-2" />

            <div className="hidden md:block md:flex-1" />

            <div className="flex flex-col md:flex-row md:gap-34 md:items-end flex-1 md:flex-none justify-center md:justify-start gap-0">
              <nav
                ref={menuLinksRef}
                className="flex flex-col md:gap-3"
                aria-label="Main navigation"
              >
                {NAVIGATION_ITEMS.map((item, index) => (
                  <div key={item.label} className="overflow-hidden">
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      className="
                        group flex items-center justify-center lg:justify-between
                        font-light uppercase leading-[1.2] md:leading-[1.1]
                        text-neutral-400 hover:text-white
                        transition-colors duration-300 will-change-transform
                        py-2.5 md:py-0
                        border-b border-neutral-800/50 md:border-none
                        text-[clamp(2rem,10vw,3rem)] md:text-7xl
                      "
                      style={{ transitionDelay: `${index * 30}ms` }}
                    >
                      <span>{item.label}</span>
                    </a>
                  </div>
                ))}
              </nav>

              <aside
                ref={menuTagsRef}
                className="hidden md:flex flex-col gap-4 pt-3"
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

            <div className="hidden md:block md:flex-1" />

            <footer
              ref={menuFooterRef}
              className="mt-4 md:mt-0 pt-4 md:pt-6 border-t border-neutral-800"
            >
              <div className="hidden md:flex gap-16">
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
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-neutral-400 ${social.hoverColor} transition-all duration-300 hover:scale-110`}
                          aria-label={social.label}
                        >
                          <Icon className="w-8 h-8" />
                        </a>
                      );
                    })}
                    <a
                      href="/Resume/Surya_CV.pdf"
                      download
                      aria-label="Download Resume"
                      className="text-neutral-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <RiDownloadFill className="w-8 h-8" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:hidden flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] truncate">
                      {CONTACT_INFO.location}
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-xs text-neutral-400 hover:text-white transition-colors duration-300 truncate block"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-neutral-500 ${social.hoverColor} transition-all duration-300 active:scale-95`}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                  <a
                    href="/Resume/Surya_CV.pdf"
                    download
                    aria-label="Download Resume"
                    className="text-neutral-500 hover:text-white transition-all duration-300 active:scale-95"
                  >
                    <RiDownloadFill className="w-6 h-6" />
                  </a>
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
      `}</style>
    </>
  );
};

export default Navbar;
