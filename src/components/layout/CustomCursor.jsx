import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (!cursorRef.current || !isReady) return;

      const cursorEl = cursorRef.current;

      const handleMouseMove = (e) => {
        gsap.to(cursorEl, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { dependencies: [isReady], scope: cursorRef },
  );

  if (!isReady) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed w-8 h-8 rounded-full bg-white z-50 pointer-events-none flex items-center justify-center mix-blend-difference"
      style={{
        willChange: "transform",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default CustomCursor;
