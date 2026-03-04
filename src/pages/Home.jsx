import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import CustomCursor from "../components/layout/CustomCursor";
import Navbar from "../components/layout/Navbar";
import Skills from "../components/sections/Skills";
import Education from "../components/sections/Education";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Approach from "../components/sections/Approach";
import WhatIDo from "../components/sections/WhatIDo/WhatIDo";

const Home = () => {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <Hero />
      <About />
      <WhatIDo />
      <Skills />
      <Approach />
      <Education />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
