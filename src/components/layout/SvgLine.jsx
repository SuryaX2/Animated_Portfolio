import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";

// ── SVG coordinate constants ─────────────────────────────────────────────────
const START_X = 10;
const END_X = 490;
const CENTER_X = 250;
const BASE_Y = 100;
const VIEW_W = 500;
const VIEW_H = 200;

// How far the control point can stray from the baseline in each direction.
// Keeping it within [MARGIN, VIEW_H - MARGIN] prevents the curve from
// clipping against the viewBox edges and looking "cut".
const Y_MIN = 10;
const Y_MAX = VIEW_H - 10; // 190
const X_MIN = START_X;
const X_MAX = END_X;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const SvgLine = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const point = useRef({ x: CENTER_X, y: BASE_Y });

  useGSAP(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    // ── draw ───────────────────────────────────────────────────────────────
    const draw = () => {
      const { x, y } = point.current;
      path.setAttribute(
        "d",
        `M ${START_X} ${BASE_Y} Q ${x} ${y} ${END_X} ${BASE_Y}`,
      );
    };

    // ── shared coordinate mapper ───────────────────────────────────────────
    // Converts a clientX/clientY into clamped SVG viewBox coordinates.
    const toSVGCoords = (clientX, clientY) => {
      const rect = svg.getBoundingClientRect();
      const rawX = ((clientX - rect.left) / rect.width) * VIEW_W;
      const rawY = ((clientY - rect.top) / rect.height) * VIEW_H;
      return {
        x: clamp(rawX, X_MIN, X_MAX),
        y: clamp(rawY, Y_MIN, Y_MAX),
      };
    };

    // ── spring-back (shared by mouseleave / touchend) ──────────────────────
    const springBack = () => {
      gsap.to(point.current, {
        x: CENTER_X,
        y: BASE_Y,
        duration: 1,
        ease: "elastic.out(1, 0.1)",
        onUpdate: draw,
      });
    };

    // ── mouse handlers (desktop — logic unchanged, now uses mapper) ─────────
    const onMouseMove = (e) => {
      const { x, y } = toSVGCoords(e.clientX, e.clientY);
      gsap.to(point.current, {
        x,
        y,
        duration: 0.4,
        ease: "power3.out",
        onUpdate: draw,
      });
    };

    // ── touch handlers ──────────────────────────────────────────────────────
    const onTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const { x, y } = toSVGCoords(touch.clientX, touch.clientY);
      gsap.to(point.current, {
        x,
        y,
        duration: 0.25,
        ease: "power3.out",
        onUpdate: draw,
      });
    };

    svg.addEventListener("mousemove", onMouseMove);
    svg.addEventListener("mouseleave", springBack);
    svg.addEventListener("touchmove", onTouchMove, { passive: false });
    svg.addEventListener("touchend", springBack);
    svg.addEventListener("touchcancel", springBack);

    draw();

    return () => {
      svg.removeEventListener("mousemove", onMouseMove);
      svg.removeEventListener("mouseleave", springBack);
      svg.removeEventListener("touchmove", onTouchMove);
      svg.removeEventListener("touchend", springBack);
      svg.removeEventListener("touchcancel", springBack);
    };
  }, []);

  return (
    <section
      ref={svgRef}
      className={[
        "w-full h-[20vh] sm:h-[40vh]",
        "flex items-center justify-center bg-black overflow-hidden",
        "touch-none",
        isTouchDevice ? "cursor-none" : "cursor-default",
      ].join(" ")}
      aria-label="Interactive elastic line — drag or hover to bend"
      role="img"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ touchAction: "none" }}
      >
        <path ref={pathRef} stroke="white" strokeWidth="2" fill="transparent" />
      </svg>
    </section>
  );
};

export default SvgLine;
