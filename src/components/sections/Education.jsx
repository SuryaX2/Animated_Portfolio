import EducationalSection from "./Educational-Section/EducationalSection";

const Education = () => {
  return (
    <div id="education" className="min-h-screen bg-white">
      <section className="intro relative w-screen overflow-hidden">
        <h1 className="uppercase text-center text-9xl w-2/3 font-semibold leading-none text-black">
          My Educational Journey
        </h1>
      </section>

      <EducationalSection />

      <section className="outro relative w-screen overflow-hidden">
        <h1 className="uppercase text-center text-9xl w-2/3 font-semibold leading-none text-black">
          This Is Just the Beginning — There&apos;s More to Come
        </h1>
      </section>
    </div>
  );
};

export default Education;
