import React, { useContext } from "react";
import hero from "./../../assets/images/hero-4.jpg";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import "../../assets/css/footer.css";
import NavigationContext from "../../contexts/NavigationContext";

export const Footer = () => {
  const navigate = useNavigate();
  const scrollRefs = useContext(NavigationContext);

  const handleNavigateToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      const offset = sectionRef.current.offsetTop;
      const headerHeight =
        document.querySelector("section.fixed")?.offsetHeight || 0;
      window.scrollTo({
        top: offset - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleNavigateToSectionMobile = (sectionRef) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        handleNavigateToSection(sectionRef);
      }, 300);
    } else {
      handleNavigateToSection(sectionRef);
    }
  };
  const handleExploreClick = () => {
    // Redirect to another page, e.g., '/projects'
    navigate("/login");
  };
  return (
    <>
      <section className="relative overflow-hidden w-full xl:h-[350px] h-[80vh] font-poppins flex items-center justify-center font-press-start">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] to-transparent z-10"></div>

        <img
          src={hero}
          className="absolute inset-0 w-full xl:h-full h-[80vh] object-cover z-0"
          alt=""
        />

        <div className="relative z-20 w-full xl:h-auto h-[80vh] md:flex items-left md:mt-0 mt-[200px]">
          <div className="md:w-[33.33%] pl-5">
            <img
              src={logo}
              className="w-[120px] md:h-[100px] md:w-[180px]  "
              alt=""
            />
            <div className="md:text-[22px] text-[18px] text-[#1b4172] font-bold md:mt-4 mt-1">
              Building Tomorrow's Solutions, Today
            </div>
            <div className="md:text-[14px] text-[13px] text-[#1b4172] font-medium">
              Innovative, future-ready solutions crafted today, blending
              creativity, technology, and impactful problem-solving.
            </div>
          </div>
          <div className=" md:w-[33.33%] text-center">
            <div className="text-[18px] font-bold text-[#1b4172] md:mb-[30px] md:mt-0 mt-8">
              LINKS
            </div>
            <div className="text-[14px] font-medium text-[#1b4172] leading-8 cursor-pointer">
              <div
                onClick={() => handleNavigateToSectionMobile(scrollRefs.home)}
              >
                Home
              </div>
              <div
                onClick={() =>
                  handleNavigateToSectionMobile(scrollRefs.aboutMe)
                }
              >
                About Me
              </div>
              <div
                onClick={() =>
                  handleNavigateToSectionMobile(scrollRefs.technical)
                }
              >
                Technical Expertise
              </div>
              <div
                onClick={() =>
                  handleNavigateToSectionMobile(scrollRefs.services)
                }
              >
                Services
              </div>
              <div onClick={() => navigate("/projects")}>Projects</div>
              <div
                onClick={() =>
                  handleNavigateToSectionMobile(scrollRefs.contact)
                }
              >
                Contact Me
              </div>
            </div>
          </div>
          <div className=" md:w-[33.33%]">
            <div className="text-[18px] font-bold text-[#1b4172] mb-[30px] md:text-center text-center md:mt-0 mt-4">
              CONTACT
            </div>
            <div className="flex gap-5 justify-center">
              <button class="Btn">
                <span class="svgContainer">
                  <svg
                    viewBox="0 0 448 512"
                    height="1.3em"
                    xmlns="http://www.w3.org/2000/svg"
                    class="svgIcon"
                    fill="white"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path>
                  </svg>
                </span>
                <span class="BG-Linkedin"></span>
              </button>

              <button class="Btn">
                <span class="svgContainer">
                  <svg fill="white" viewBox="0 0 496 512" height="1.3em">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                </span>
                <span class="BG-git"></span>
              </button>
              <button class="Btn">
                <span class="svgContainer">
                  <svg
                    viewBox="0 0 448 512"
                    fill="white"
                    height="1.3em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </span>
                <span class="BG-whatsapp"></span>
              </button>
              <button class="Btn">
                <span class="svgContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#e0e0e0"
                      d="M5.5,40.5h37c1.933,0,3.5-1.567,3.5-3.5V11.543c0-1.933-1.567-3.5-3.5-3.5h-37	c-1.933,0-3.5,1.567-3.5,3.5V37C2,38.933,3.567,40.5,5.5,40.5z"
                    ></path>
                    <path
                      fill="#d9d9d9"
                      d="M44.482,12.759L24,27.763L3.518,12.758c0,0-0.095-0.066-0.236-0.182L26,40.5h16.5 c1.933,0,3.5-1.567,3.5-3.5V11.441c0-0.102-0.021-0.197-0.03-0.296C45.816,12.262,44.482,12.759,44.482,12.759z"
                    ></path>
                    <path
                      fill="#eee"
                      d="M6.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L6.745,40.5z"
                    ></path>
                    <path
                      fill="#e0e0e0"
                      d="M25.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L18.771,31.616L25.745,40.5z"
                    ></path>
                    <path
                      fill="#ca3737"
                      d="M3.603,12.759c0,0-1.334-0.938-1.488-2.055c-0.008,0.099-0.03,0.195-0.03,0.296 L2,11.473v17.799V37c0,1.933,1.567,3.5,3.5,3.5H7V15.247L3.603,12.759z"
                    ></path>
                    <path
                      fill="#ca3737"
                      d="M45.97,11.145c-0.154,1.117-1.488,1.614-1.488,1.614L41,15.31V40.5h1.5 c1.933,0,3.5-1.567,3.5-3.5v-7.729v-17.83C46,11.34,45.979,11.244,45.97,11.145z"
                    ></path>
                    <path
                      fill="#bcbcbc"
                      d="M3.42,13.31l20.623,14.973L44.665,13.31c0,0,0.937-0.661,1.335-1.531v-0.228	c-0.012-1.996-1.569-3.51-3.5-3.5h-37c-1.933,0-3.5,1.567-3.5,3.5v0.009C2.323,12.536,3.42,13.31,3.42,13.31z"
                    ></path>
                    <g>
                      <path
                        fill="#f5f5f5"
                        d="M42.5,8H24H5.5C3.567,8,2,9.536,2,11.5c0,1.206,1.518,2.258,1.518,2.258L24,28.256 l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.536,44.433,8,42.5,8z"
                      ></path>
                      <path
                        fill="#e84f4b"
                        d="M43.246,8.082L24,21.5L4.754,8.082C3.18,8.419,2,9.797,2,11.5 c0,1.206,1.518,2.258,1.518,2.258L24,28.256l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.797,44.82,8.419,43.246,8.082z"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span class="BG-mail"></span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full md:flex justify-between items-center p-2 bg-[#2fff24]">
        <div className="text-black text-[13px] font-semibold md:text-left text-center md:mb-0 mb-1">
          © 2024 Chamaththa Shamod - All Rights Reserved
        </div>
        <div className="md:block flex justify-center">
          <button onClick={handleExploreClick}>
            <div class="group relative flex size-8 items-center justify-center gap-1 rounded-lg border border-black">
              <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0"></div>
              <div class="relative size-1 origin-center rounded-full bg-black duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-black before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-black after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45"></div>
              <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0"></div>
            </div>
          </button>
        </div>
      </section>
    </>
  );
};
