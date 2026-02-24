import EducationalSection from "./Educational-Section/EducationalSection";

const Education = () => {
  return (
    <div id="education" className="min-h-screen bg-white">
      <section className="intro relative w-screen overflow-hidden">
        <h1 className="uppercase text-center text-8xl font-medium leading-none text-black">
          My Educational Journey
        </h1>
      </section>

      <EducationalSection />

      <section className="outro relative w-screen overflow-hidden">
        <h1 className="uppercase text-center text-8xl font-medium leading-none text-black">
          These are the places where I have learned everything
        </h1>
      </section>
    </div>
  );
};

export default Education;
