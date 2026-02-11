import { memo } from "react";

const IntroSlide = memo(
  ({ introRef, titlesRef, loadingProgress, progressBarRef }) => {
    return (
      <div
        ref={introRef}
        className="min-h-screen flex items-start justify-center bg-gray-100 text-black text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl flex-col gap-4 sm:gap-6 md:gap-8 font-bold tracking-tighter absolute top-0 left-0 w-full z-10 uppercase overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <h1
          ref={(el) => (titlesRef.current[0] = el)}
          style={{ willChange: "transform, opacity" }}
        >
          Hi, I&apos;m Surya Sekhar Sharma
        </h1>
        <h1
          ref={(el) => (titlesRef.current[1] = el)}
          style={{ willChange: "transform, opacity" }}
        >
          A Software Developer
        </h1>
        <h1
          ref={(el) => (titlesRef.current[2] = el)}
          style={{ willChange: "transform, opacity" }}
        >
          A Web Designer
        </h1>
        <h1
          ref={(el) => (titlesRef.current[3] = el)}
          style={{ willChange: "transform, opacity" }}
        >
          And a Tech Enthusiast
        </h1>

        <div
          ref={progressBarRef}
          className="fixed bottom-0 right-0 flex items-center"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-9xl md:text-7xl lg:text-9xl font-bold whitespace-nowrap">
            {loadingProgress}%
          </span>
        </div>
      </div>
    );
  },
);

IntroSlide.displayName = "IntroSlide";

export default IntroSlide;
