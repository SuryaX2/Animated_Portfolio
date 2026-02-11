import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import CustomCursor from "../components/layout/CustomCursor";
import Navbar from "../components/layout/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <Hero />
      <About />
    </>
  );
};

export default Home;
