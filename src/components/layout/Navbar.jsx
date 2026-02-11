import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import React from "react";

const Navbar = () => {
  useGSAP(() => {
    document.addEventListener("DOMContentLoaded", () => {
      gsap.registerPlugin(CustomEase, SplitText);
      CustomEase.create("hop", ".87, 0, .13, 1");

      const textContainer = document.querySelectorAll(".menuCol");
      let splitTextByContainer = [];

      textContainer.forEach((container) => {
        const textElements = container.querySelectorAll("a, p");
        let containerSplit = [];

        textElements.forEach((element) => {
          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line",
          });
          containerSplit.push(split);
          gsap.set(split.lines, { y: "-110%" });
        });
        splitTextByContainer.push(containerSplit);
      });
    });
  });
  return (
    <nav className="fixed top-0 left-0 w-screen h-svh pointer-events-none overflow-hidden z-50">
      <div className="fixed top-0 left-0 w-screen p-8 flex items-center justify-between pointer-events-auto text-white z-50">
        <div className="w-8 h-8">
          <a href="#" className="text-2xl font-medium">
            <img src="/bnb-fill.png" alt="Logo" />
          </a>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="overflow-hidden">
            <p
              className="text-base font-medium relative translate-y-0 will-change-transform
                transition-transform duration-300 ease-in-out"
            >
              Menu
            </p>
          </div>
          <div className="relative w-12 h-12 flex flex-col items-center justify-center border-2 border-white rounded-full overflow-hidden">
            <span className="absolute w-3.5 h-0.5 text-white transition-all duration-750 ease-[cubic-bezier(0.87,0,0.13,1)] origin-center will-change-transform"></span>
            <span className="absolute w-3.5 h-0.5 text-white transition-all duration-750 ease-[cubic-bezier(0.87,0,0.13,1)] origin-center will-change-transform"></span>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-screen h-svh text-white overflow-hidden z-40 bg-gray-600/50">
        <div className="fixed top-0 left-0 w-screen h-svh text-white overflow-hidden z-40 flex  will-change-transform pointer-events-auto">
          <div className="flex-2 will-change-[opacity]">
            <img
              src="https://instagram.fccu9-2.fna.fbcdn.net/v/t51.82787-15/607635971_18065646413631092_9197319423994738240_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=Mzc5OTE4OTg4NzQ4MTE5MjY3Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=ITHhxo-m1TQQ7kNvwF3UUHt&_nc_oc=AdmGuRl8GCPwFhJPOQ4Gz812en002IT9UAnjSSNH3YiMNADCqV2Ct_ca1tiX49Md2GBS_f2rmWRf0UuTnS5K078U&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu9-2.fna&_nc_gid=HYsroLg3SFcghVkB_p6RIw&oh=00_AfvpA6xeGJvkPvLZGHg2NFIghVU6woOwyXJKVdp_wRNOPg&oe=698FD9D7"
              alt="Menu Media"
              className="w-full h-full object-cover opacity-25"
            />
          </div>
          <div className="flex-3 relative flex">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 p-8 flex items-end gap-8">
              <div className="flex flex-col gap-2 menuCol">
                <a href="#" className="text-6xl font-medium leading-tight">
                  Home
                </a>
                <a href="#" className="text-6xl font-medium leading-tight">
                  About
                </a>
                <a href="#" className="text-6xl font-medium leading-tight">
                  Skills
                </a>
                <a href="#" className="text-6xl font-medium leading-tight">
                  Education
                </a>
                <a href="#" className="text-6xl font-medium leading-tight">
                  Projects
                </a>
                <a href="#" className="text-6xl font-medium leading-tight">
                  Contact
                </a>
              </div>
              <div className="flex flex-col gap-2 menuCol">
                <div className="menuTag">
                  <p className="text-base font-medium text-gray-300/20">
                    Web Animation
                  </p>
                </div>
                <div className="menuTag">
                  <p className="text-base font-medium text-gray-300/20">
                    Tech Enthusiast
                  </p>
                </div>
                <div className="menuTag">
                  <p className="text-base font-medium text-gray-300/20">
                    Software Developer
                  </p>
                </div>
              </div>
            </div>
            <div className="my-0 mx-auto w-3/4 p-8 flex items-end gap-8">
              <div className="flex flex-col gap-2 menuCol">
                <p className="text-base font-medium text-gray-300/20">
                  Kolkata, India
                </p>
              </div>
              <div className="flex flex-col gap-2 menuCol">
                <p className="text-base font-medium text-gray-300/20">
                  +91 9830846280
                </p>
                <p className="text-base font-medium text-gray-300/20">
                  sekharsurya111@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
