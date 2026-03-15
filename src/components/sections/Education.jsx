import EducationalSection from "./Educational-Section/EducationalSection";

const Education = () => {
  return (
    <div id="education" className="min-h-screen bg-white">
      <section className="intro relative w-screen overflow-hidden">
        <h1
          className="
            uppercase text-center font-semibold leading-none text-black
            text-4xl w-full px-6
            sm:text-5xl sm:w-full sm:px-8
            md:text-7xl md:w-4/5 md:px-0
            lg:text-9xl lg:w-2/3 lg:px-0
          "
        >
          My Educational Journey
        </h1>
      </section>

      <EducationalSection />

      <section className="outro relative w-screen overflow-hidden">
        <h1
          className="
            uppercase text-center font-semibold leading-none text-black
            text-4xl w-full px-6
            sm:text-5xl sm:w-full sm:px-8
            md:text-7xl md:w-4/5 md:px-0
            lg:text-9xl lg:w-2/3 lg:px-0
          "
        >
          This Is Just the Beginning — There&apos;s More to Come
        </h1>
      </section>
    </div>
  );
};

export default Education;
