import { RiExternalLinkLine, RiGithubFill } from "@remixicon/react";
import PinnedProjects from "./PinnedProjects";

const PROJECTS = [
  {
    id: "inventorypro",
    title: "InventoryPro",
    tag: "Full-Stack · MERN",
    description:
      "JWT-secured REST API with full CRUD operations across categories, products, suppliers, customers, purchases, and orders. Features dashboard metrics, stock alerts, and top-product rankings. Built with the MERN stack and deployed on Vercel.",
    image: "/me.jpg",
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
    image: "/me.jpg",
    alt: "LMS — Library Management System",
    deployUrl: "https://lms-7phy.vercel.app/",
    githubUrl: "https://github.com/SuryaX2/LMS",
    techIcons: "mongodb,express,react,nodejs,tailwind,vercel",
  },
];

const ProjectCard = ({ project, index }) => {
  const { title, tag, description, deployUrl, githubUrl, techIcons } = project;

  return (
    <div className="flex flex-col gap-5 w-full m-8">
      <div className="flex items-end gap-3">
        <span className="font-black text-[clamp(72px,10vw,130px)] leading-none text-white select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mb-4 text-[9px] tracking-[0.28em] uppercase text-[#c9ff00] border border-[#c9ff00]/25 px-3 py-1 rounded-full font-medium">
          {tag}
        </span>
      </div>

      <h3 className="text-[clamp(32px,4.5vw,62px)] font-black leading-none tracking-tight text-white">
        {title}
      </h3>

      <div className="w-18 h-px bg-white" />

      <p className="text-[13.5px] leading-[1.8] text-white/50 font-light max-w-2/3 max-md:max-w-full">
        {description}
      </p>

      <div>
        <p className="text-md tracking-[0.3em] uppercase text-white mb-2.5 font-medium">
          Tech Stack
        </p>
        <img
          src={`https://skillicons.dev/icons?i=${techIcons}&perline=9&theme=dark`}
          alt={`Tech used in ${title}`}
          className="h-10"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex items-center gap-2.5 flex-wrap pt-1">
        {deployUrl && (
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-8 py-3 rounded-full text-md font-semibold tracking-wide bg-[#c9ff00] text-black transition-[opacity,transform] duration-200 opacity-80 hover:opacity-100"
          >
            <RiExternalLinkLine size={25} />
            Live Demo
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-8 py-3 rounded-full text-md font-semibold tracking-wide border border-white text-white transition-[border-color,transform, background-color] duration-200 hover:border-[#555] hover:text-black hover:bg-white"
          >
            <RiGithubFill size={25} />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectImage = ({ project }) => (
  <div className="relative w-full h-150 rounded-2xl overflow-hidden">
    <img
      src={project.image}
      alt={project.alt}
      loading="lazy"
      decoding="async"
      width={900}
      height={640}
      className="pinned-project-img w-full h-full object-cover object-center block"
    />
  </div>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen bg-[#0f0f0f]"
      aria-label="Projects"
    >
      <div>
        <section className="relative w-screen h-screen p-8 text-center content-center">
          <h1 className="text-9xl font-medium uppercase leading-none md:w-2/3 w-full my-0 mx-auto">
            My Projects
          </h1>
        </section>

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
};

export default Projects;
