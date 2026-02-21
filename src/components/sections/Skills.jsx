import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StickyCards from "./StickyCards/StickyCards"

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  
  return (
    <div id="skills" className="min-h-screen bg-black">
      <section className="intro w-screen h-screen relative flex items-center justify-center text-center">
        <h1 className="text-[90vh] font-extrabold leading-5 tracking-tight text-white uppercase text-nowrap">The Skills</h1>
      </section>

      <StickyCards />

      <section className="outro w-screen h-screen relative flex items-center justify-center text-center">
        <h1 className="text-9xl font-extrabold leading-5 tracking-tight text-white uppercase">Thanks</h1>
      </section>
    </div>
  );
};

export default Skills;
