import ProjectTitle from "./ProjectSection/ProjectTitle";
import PinnedProjects from "./ProjectSection/PinnedProjects";
import { RiExternalLinkLine, RiGithubFill } from "@remixicon/react";

const PROJECTS = [
  {
    id: "inventorypro",
    title: "InventoryPro",
    tag: "Full-Stack · MERN",
    description:
      "JWT-secured REST API with full CRUD operations across categories, products, suppliers, customers, purchases, and orders. Features dashboard metrics, stock alerts, and top-product rankings. Built with the MERN stack and deployed on Vercel.",
    image: "/InventoryPro.png",
    alt: "InventoryPro — Inventory Management System",
    deployUrl: "https://inventorypro-ims.vercel.app/",
    githubUrl: "https://github.com/SuryaX2/IMS",
    techIcons: "mongodb,express,react,nodejs,tailwind,postman,vercel",
  },
  {
    id: "lms",
    title: "Library Management System",
    tag: "Full-Stack · MERN",
    description:
      "A full-stack MERN application with secure authentication and separate admin/user dashboards. Admins can add, edit, and delete books and manage user borrow/return requests. Deployed on Vercel with Cloudinary for book image storage.",
    image: "/LMS.png",
    alt: "LMS — Library Management System",
    deployUrl: "https://lms-7phy.vercel.app/",
    githubUrl: "https://github.com/SuryaX2/LMS",
    techIcons: "mongodb,express,react,nodejs,tailwind,vercel",
  },
];

const ProjectCard = ({ project, index }) => {
  const { title, tag, description, deployUrl, githubUrl, techIcons } = project;

  return (
    /*
     * Desktop: m-8 outer margin (original). Mobile: tighter horizontal margin
     * so the card never overflows the viewport.
     */
    <div className="flex flex-col gap-4 sm:gap-5 w-full mx-4 sm:mx-6 md:m-8 my-0">
      {/* ── Index + tag row ── */}
      <div className="flex items-end gap-3">
        <span
          className="font-black leading-none text-white select-none"
          style={{
            /*
             * Desktop: clamp(72px, 10vw, 130px) — unchanged.
             * Mobile floor dropped from 72 → 40px so it fits without overflow.
             */
            fontSize: "clamp(40px, 10vw, 130px)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mb-3 sm:mb-4 text-[9px] tracking-[0.28em] uppercase text-[#c9ff00] border border-[#c9ff00]/25 px-3 py-1 rounded-full font-medium whitespace-nowrap">
          {tag}
        </span>
      </div>

      {/* ── Project title ── */}
      <h3
        className="font-black leading-none tracking-tight text-white"
        style={{
          /*
           * Desktop: clamp(32px, 4.5vw, 62px) — unchanged.
           * Mobile floor stays at 32px; already fine on narrow screens.
           */
          fontSize: "clamp(26px, 4.5vw, 62px)",
        }}
      >
        {title}
      </h3>

      {/* ── Divider ── */}
      {/* was w-18 (Tailwind JIT arbitrary); using explicit 72px is more reliable */}
      <div className="w-[72px] h-px bg-white" />

      {/* ── Description ── */}
      <p
        className="
          text-[13.5px] leading-[1.8] text-white/50 font-light
          max-w-full          /* mobile: full width */
          sm:max-w-[80%]      /* tablet: 80% */
          md:max-w-[66%]      /* desktop: original ~2/3 */
        "
      >
        {description}
      </p>

      {/* ── Tech stack ── */}
      <div>
        <p className="text-sm tracking-[0.3em] uppercase text-white mb-2.5 font-medium">
          Tech Stack
        </p>
        <img
          src={`https://skillicons.dev/icons?i=${techIcons}&perline=9&theme=dark`}
          alt={`Tech used in ${title}`}
          className="h-8 sm:h-10" /* slightly smaller on mobile */
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ── CTA buttons ── */}
      <div className="flex items-center gap-2.5 flex-wrap pt-1">
        {deployUrl && (
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            /*
             * Desktop: px-8 py-3 (original). Mobile: px-5 py-2.5 so buttons
             * don't overflow or crowd on narrow screens. text-sm on mobile.
             */
            className="
              inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide
              bg-[#c9ff00] text-black transition-[opacity,transform] duration-200
              opacity-80 hover:opacity-100
              px-5 py-2.5 text-sm
              sm:px-8 sm:py-3 sm:text-md
            "
          >
            <RiExternalLinkLine size={20} className="sm:hidden" />
            <RiExternalLinkLine size={25} className="hidden sm:block" />
            Live Demo
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide
              border border-white text-white
              transition-[border-color,transform,background-color] duration-200
              hover:border-[#555] hover:text-black hover:bg-white
              px-5 py-2.5 text-sm
              sm:px-8 sm:py-3 sm:text-md
            "
          >
            <RiGithubFill size={20} className="sm:hidden" />
            <RiGithubFill size={25} className="hidden sm:block" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectImage = ({ project }) => (
  <div className="relative w-full overflow-hidden rounded-2xl min-h-55 sm:min-h-80 md:min-h-125">
    <img
      src={project.image}
      alt={project.alt}
      loading="lazy"
      decoding="async"
      className="pinned-project-img absolute inset-0 w-full h-full object-cover block"
    />
  </div>
);

const Projects = () => (
  <section
    id="projects"
    className="min-h-screen bg-[#0f0f0f]"
    aria-label="Projects"
  >
    <div>
      <ProjectTitle />

      <PinnedProjects
        leftWidth="w-[50%]"
        leftContent={PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={PROJECTS.length}
          />
        ))}
        rightContent={PROJECTS.map((p, i) => (
          <ProjectImage
            key={p.id}
            project={p}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      />

      <div className="h-[10vh]" />
    </div>
  </section>
);

export default Projects;
