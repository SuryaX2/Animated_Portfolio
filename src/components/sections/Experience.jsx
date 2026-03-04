import ExpCarousel from "./ExpCarousel/ExpCarousel";

const Experience = () => {
  return (
    <div id="experience" className="min-h-screen">
      <section className="bg-white flex items-center justify-center text-center relative w-screen h-screen p-8 overflow-hidden">
        <h1 className="text-black uppercase text-9xl font-semibold leading-none tracking-widest">Experience</h1>
      </section>

      <ExpCarousel />
    </div>
  );
};

export default Experience;
