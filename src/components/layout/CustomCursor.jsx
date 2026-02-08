import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CustomCursor = () => {
  useGSAP(() => {
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return;

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.x,
        y: e.y,
        ease: "power3.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
  return (
    <div className="custom-cursor fixed w-8 h-8 rounded-full bg-white z-50 pointer-events-none flex items-center justify-center">
      <div className="w-1/2 h-1/2 rounded-full bg-black">
        <div className="w-2/3 h-2/3 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default CustomCursor;
