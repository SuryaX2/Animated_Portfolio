import ExpCarousel from "./ExpCarousel/ExpCarousel";

const Experience = () => {
  return (
    <div id="experience" className="min-h-screen">
      <section className="bg-white flex items-center justify-center text-center relative w-screen h-screen p-8 overflow-hidden">
        <h1
          className="
            text-black uppercase font-semibold leading-none
            text-5xl tracking-tight
            sm:text-6xl sm:tracking-wide
            md:text-7xl md:tracking-wider
            lg:text-9xl lg:tracking-widest
          "
        >
          Experience
        </h1>
      </section>

      <ExpCarousel />
    </div>
  );
};

export default Experience;
