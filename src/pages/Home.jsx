import Hero from "../components/sections/Hero";
import Navbar from "../components/layout/Navbar";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Approach from "../components/sections/Approach";
import Education from "../components/sections/Education";
import Experience from "../components/sections/Experience";
import WhatIDo from "../components/sections/WhatIDo/WhatIDo";
import CustomCursor from "../components/layout/CustomCursor";
import FooterReveal from "../components/layout/Footer/FooterReveal";

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
      <FooterReveal />
    </>
  );
};

export default Home;
