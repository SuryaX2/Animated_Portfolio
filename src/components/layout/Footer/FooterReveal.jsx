import "./Footer.css";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiLinkedinBoxFill,
  RiGithubFill,
  RiArrowUpLine,
  RiArrowRightUpLine,
  RiDownloadFill,
} from "@remixicon/react";
import { useLenisContext } from "../../../context/LenisContext";

gsap.registerPlugin(SplitText, ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const SOCIAL_LINKS = [
  {
    icon: RiLinkedinBoxFill,
    href: "https://www.linkedin.com/in/suryax2",
    label: "LinkedIn",
    handle: "suryax2",
  },
  {
    icon: RiGithubFill,
    href: "https://github.com/suryax2",
    label: "GitHub",
    handle: "SuryaX2",
  },
];

const FooterReveal = () => {
  const lenisRef = useLenisContext();
  const rootRef = useRef(null);
  const splitInstancesRef = useRef([]);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      const root = rootRef.current;

      const ctaEl = root.querySelector(".fr-cta-heading");
      const nameEl = root.querySelector(".fr-name");
      const midLine = root.querySelector(".fr-mid-line");
      const bottomLine = root.querySelector(".fr-bottom-line");
      const badge = root.querySelector(".fr-badge");
      const emailBtn = root.querySelector(".fr-email-btn");
      const colLabels = root.querySelectorAll(".fr-col-label");
      const navLinks = root.querySelectorAll(".fr-nav-item");
      const socialLinks = root.querySelectorAll(".fr-social-row");
      const aboutLines = root.querySelectorAll(".fr-about-line");
      const metaBar = root.querySelector(".fr-meta-bar");
      const backBtn = root.querySelector(".fr-back-btn");

      const ctaSplit = SplitText.create(ctaEl, {
        type: "words",
        mask: "words",
      });
      const nameSplit = SplitText.create(nameEl, {
        type: "chars",
        mask: "chars",
      });

      splitInstancesRef.current = [ctaSplit, nameSplit];

      gsap.set(ctaSplit.words, { y: "105%" });
      gsap.set(nameSplit.chars, { y: "104%" });
      gsap.set([midLine, bottomLine], {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(badge, { autoAlpha: 0, y: "-100%" });
      gsap.set(emailBtn, { autoAlpha: 0, y: 100 });
      gsap.set(colLabels, { autoAlpha: 0, y: "100%" });
      gsap.set(navLinks, { autoAlpha: 0, y: "100%" });
      gsap.set(socialLinks, { autoAlpha: 0, y: "100%" });
      gsap.set(aboutLines, { autoAlpha: 0, y: "100%" });
      gsap.set(metaBar, { autoAlpha: 0, y: "100%" });
      gsap.set(backBtn, { autoAlpha: 0, scale: 0.88 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
        defaults: { ease: "power4.out" },
      });

      tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(2)" })
        .to(
          ctaSplit.words,
          { y: "0%", duration: 0.85, stagger: 0.08, ease: "expo.out" },
          "<",
        )

        .to(midLine, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, "<0.2")
        .to(
          emailBtn,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" },
          "<0.2",
        )

        .to(
          colLabels,
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.12 },
          "-=0.3",
        )
        .to(
          navLinks,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          socialLinks,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "<",
        )
        .to(aboutLines, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, "<")
        .to(
          nameSplit.chars,
          {
            y: "0%",
            duration: 1.5,
            stagger: {
              amount: 0.2,
              from: "center",
              axis: "x",
              ease: "power4.inOut",
            },
            ease: "expo.out",
          },
          "<0.3",
        )
        .to(
          bottomLine,
          { scaleX: 1, duration: 0.7, ease: "expo.inOut" },
          "<0.5",
        )
        .to(metaBar, { autoAlpha: 1, y: 0, duration: 0.45 }, "<0.5")
        .to(
          backBtn,
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)" },
          "<0.5",
        );

      navLinks.forEach((link) => {
        link.addEventListener("mouseenter", () =>
          gsap.to(link, { x: 6, duration: 0.25, ease: "power2.out" }),
        );
        link.addEventListener("mouseleave", () =>
          gsap.to(link, { x: 0, duration: 0.2, ease: "power2.in" }),
        );
      });

      return () => {
        splitInstancesRef.current.forEach((s) => s?.revert());
        splitInstancesRef.current = [];
      };
    },
    { scope: rootRef },
  );

  const scrollTop = (e) => {
    e.preventDefault();
    lenisRef?.current?.scrollTo("#hero", { duration: 1.6 });
  };

  const navClick = (e, href) => {
    e.preventDefault();
    lenisRef?.current?.scrollTo(href, { duration: 1.4 });
  };

  return (
    <footer
      id="contact"
      ref={rootRef}
      className="fr-root"
      aria-label="Site footer — contact and navigation"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="fr-inner">
        <div className="fr-hero-zone">
          <div className="fr-hero-left">
            <div className="fr-badge" aria-label="Open to work opportunities">
              <span className="fr-badge-dot" aria-hidden="true" />
              <span>Open to opportunities</span>
            </div>
            <h2 className="fr-cta-heading">
              Got a project?
              <br />
              Let's talk.
            </h2>
          </div>

          <div className="fr-hero-right">
            <p className="fr-hero-sub">
              Based in Kolkata, India — available for freelance, full-time &amp;
              collaborative work.
            </p>
            <a
              href="mailto:sekharsurya111@gmail.com"
              className="fr-email-btn"
              aria-label="Email Surya at sekharsurya111@gmail.com"
              itemProp="email"
            >
              <span>sekharsurya111@gmail.com</span>
              <RiArrowRightUpLine
                className="fr-email-icon"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="fr-mid-line" aria-hidden="true" />

        <div className="fr-columns">
          <div className="fr-col fr-col--nav">
            <p className="fr-col-label">Navigation</p>
            <nav aria-label="Footer site navigation">
              <ul role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="fr-nav-item"
                      onClick={(e) => navClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="fr-col fr-col--social">
            <p className="fr-col-label">Follow</p>
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — ${s.handle}`}
                  className="fr-social-row"
                >
                  <span className="fr-social-left">
                    <Icon className="fr-social-icon" aria-hidden="true" />
                    <span className="fr-social-label">{s.label}</span>
                  </span>
                  <span className="fr-social-handle">@{s.handle}</span>
                  <RiArrowRightUpLine
                    className="fr-social-arrow"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
            <a
              href="/Resume/Surya_CV.pdf"
              download
              aria-label="Download Resume"
              className="fr-social-row"
            >
              <span className="fr-social-left">
                <RiDownloadFill className="fr-social-icon" aria-hidden="true" />
                <span className="fr-social-label">Resume</span>
              </span>
              <span className="fr-social-handle">Download CV</span>
              <RiArrowRightUpLine
                className="fr-social-arrow"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="fr-col fr-col--about">
            <p className="fr-col-label">About</p>
            <p className="fr-about-line fr-about-name" itemProp="name">
              Surya Sekhar Sharma
            </p>
            <p className="fr-about-line fr-about-role">
              Creative Developer &amp; Engineer
            </p>
            <p className="fr-about-line fr-about-institute">
              Narula Institute of Technology
            </p>
            <p className="fr-about-line fr-about-degree">
              B.Tech — Information Technology
            </p>
            <div className="fr-about-line fr-about-stack">
              {["MERN", "GSAP", "Java", "SQL", "REST API"].map((t) => (
                <span key={t} className="fr-tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="fr-about-line fr-contact-details">
              <a
                href="https://www.linkedin.com/in/suryax2"
                target="_blank"
                rel="noopener noreferrer"
                className="fr-contact-link"
                itemProp="sameAs"
              >
                Connect on LinkedIn
              </a>
              <address
                className="fr-contact-link"
                itemScope
                itemType="https://schema.org/PostalAddress"
                style={{ fontStyle: "normal" }}
              >
                <span itemProp="addressLocality">Kolkata</span>,{" "}
                <span itemProp="addressCountry">India</span>
              </address>
            </div>
          </div>
        </div>

        <div className="fr-name-wrap" aria-hidden="true">
          <span className="fr-name">SURYA</span>
        </div>

        <div className="fr-bottom-line" aria-hidden="true" />

        <div className="fr-meta-bar">
          <span className="fr-copy">
            &copy; {year} Surya Sekhar Sharma. All rights reserved.
          </span>
          <span className="fr-craft">Crafted with GSAP &amp; React</span>
          <button
            className="fr-back-btn"
            onClick={scrollTop}
            aria-label="Scroll back to the top of the page"
          >
            <RiArrowUpLine className="fr-back-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterReveal;
