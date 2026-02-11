import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);

  useGSAP(
    () => {
      if (!cursorRef.current) return;

      const xSetter = gsap.quickSetter(cursorRef.current, "x", "px");
      const ySetter = gsap.quickSetter(cursorRef.current, "y", "px");

      const updateCursor = () => {
        xSetter(positionRef.current.x);
        ySetter(positionRef.current.y);
        rafIdRef.current = requestAnimationFrame(updateCursor);
      };

      const handleMouseMove = (e) => {
        positionRef.current.x = e.clientX;
        positionRef.current.y = e.clientY;
      };

      rafIdRef.current = requestAnimationFrame(updateCursor);
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    },
    { scope: cursorRef },
  );

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed w-8 h-8 rounded-full bg-white z-50 pointer-events-none flex items-center justify-center"
      style={{
        willChange: "transform",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-1/2 h-1/2 rounded-full bg-black flex items-center justify-center">
        <div className="w-2/3 h-2/3 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default CustomCursor;
