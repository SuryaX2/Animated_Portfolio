import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const SvgLine = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  const startX = 10;
  const endX = 490;
  const centerX = 250;
  const baseY = 100;

  const point = useRef({ x: centerX, y: baseY });

  useGSAP(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    const draw = () => {
      const { x, y } = point.current;
      path.setAttribute(
        "d",
        `M ${startX} ${baseY} Q ${x} ${y} ${endX} ${baseY}`,
      );
    };

    const move = (e) => {
      const rect = svg.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 500;
      const y = ((e.clientY - rect.top) / rect.height) * 200;

      gsap.to(point.current, {
        x,
        y,
        duration: 0.4,
        ease: "power3.out",
        onUpdate: draw,
      });
    };

    const leave = () => {
      gsap.to(point.current, {
        x: centerX,
        y: baseY,
        duration: 1,
        ease: "elastic.out(1, 0.1)",
        onUpdate: draw,
      });
    };

    svg.addEventListener("mousemove", move);
    svg.addEventListener("mouseleave", leave);

    draw();

    return () => {
      svg.removeEventListener("mousemove", move);
      svg.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section
      ref={svgRef}
      className="w-screen h-[40vh] flex items-center justify-center bg-black overflow-hidden"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path ref={pathRef} stroke="white" strokeWidth="2" fill="transparent" />
      </svg>
    </section>
  );
};

export default SvgLine;
