const ProjectTitle = () => {
  const row1Text = "My Projects ✦ ";
  const row2Text = "Selected Work ✦ ";

  return (
    <section className="relative w-screen min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left  22s linear infinite; }
        .marquee-right { animation: marquee-right 22s linear infinite; }
      `}</style>

      <div
        className="absolute top-[5%] left-0 whitespace-nowrap select-none pointer-events-none font-black uppercase"
        style={{
          fontSize: "clamp(40px, 11vw, 168px)",
          letterSpacing: "-0.03em",
          color: "rgba(255,255,255,0.04)",
        }}
        aria-hidden="true"
      >
        <span className="marquee-left inline-block">
          {row1Text.repeat(8)}
          {row1Text.repeat(8)}
        </span>
      </div>

      <div
        className="absolute bottom-[5%] left-0 whitespace-nowrap select-none pointer-events-none font-black uppercase"
        style={{
          fontSize: "clamp(40px, 11vw, 168px)",
          letterSpacing: "-0.03em",
          color: "rgba(255,255,255,0.04)",
        }}
        aria-hidden="true"
      >
        <span className="marquee-right inline-block">
          {row2Text.repeat(8)}
          {row2Text.repeat(8)}
        </span>
      </div>

      <div className="relative z-10 text-center px-6 sm:px-8">
        <p className="text-[10px] tracking-[0.55em] uppercase text-[#c9ff00] mb-4 sm:mb-6 font-medium">
          Featured work
        </p>
        <h1
          className="font-black uppercase text-white leading-none"
          style={{
            fontSize: "clamp(52px, 13vw, 190px)",
            letterSpacing: "-0.05em",
          }}
        >
          Projects
        </h1>
        <div className="mt-5 sm:mt-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 sm:w-16 bg-white/20" />
          <span className="text-[11px] tracking-[0.35em] uppercase text-white/30">
            Scroll to explore
          </span>
          <span className="h-px w-10 sm:w-16 bg-white/20" />
        </div>
      </div>
    </section>
  );
};

export default ProjectTitle;
