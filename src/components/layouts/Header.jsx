import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationContext from "../../contexts/NavigationContext";

import logo from "./../../assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export const Header = () => {
  const navigate = useNavigate();
  const scrollRefs = useContext(NavigationContext);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    setSidebarOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        handleNavigateToSection(sectionRef);
      }, 300);
    } else {
      handleNavigateToSection(sectionRef);
    }
  };

  return (
    <>
      <section className="fixed top-0 md:z-40 z-50 w-full  bg-white shadow-lg ">
        <div className="flex justify-between w-full">
          <div className="flex-1 flex justify-left items-center">
            <img
              src={logo}
              className="w-[100px] h-auto md:h-auto md:w-[120px] ml-5"
              alt=""
            />
          </div>
          <div className="flex-1 md:flex justify-center items-center w-[70%] hidden">
            <div
              onClick={() => handleNavigateToSectionMobile(scrollRefs.home)}
              className=" p-[16px] pb-[15px] font-press-start font-normal  text-[14px] cursor-pointer leading-[24px] text-[#000000] hover:text-[#74768F] "
            >
              Home
            </div>
            <div
              onClick={() => handleNavigateToSectionMobile(scrollRefs.aboutMe)}
              className=" p-[16px] pb-[15px] font-press-start font-normal  text-[14px] cursor-pointer leading-[24px] text-[#000000] hover:text-[#74768F] "
            >
              About&nbsp;Me
            </div>
            <div
              onClick={() =>
                handleNavigateToSectionMobile(scrollRefs.technical)
              }
              className=" p-[16px] pb-[15px] font-press-start font-normal  text-[14px] cursor-pointer leading-[24px] text-[#000000] hover:text-[#74768F] "
            >
              Technical&nbsp;Expertise
            </div>
            <div
              onClick={() => handleNavigateToSectionMobile(scrollRefs.services)}
              className=" p-[16px] pb-[15px] font-press-start font-normal  text-[14px] cursor-pointer leading-[24px] text-[#000000] hover:text-[#74768F] "
            >
              Services
            </div>

            <div
              onClick={() => navigate("/projects")}
              className=" p-[16px] pb-[15px] font-press-start font-normal  text-[14px] cursor-pointer leading-[24px] text-[#000000] hover:text-[#74768F] "
            >
              Projects
            </div>
            <div
              onClick={() => handleNavigateToSectionMobile(scrollRefs.contact)}
              className=" p-[16px] pb-[15px] font-press-start font-normal cursor-pointer  text-[14px] leading-[24px] text-[#000000] hover:text-[#74768F] "
            >
              Contact&nbsp;Me
            </div>
          </div>
          <div className="flex-1 md:flex hidden justify-end items-center gap-2 mr-5">
            <button className="p-3 bg-[#2ae42d] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                width="20"
                height="20"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </button>
            <div>
              <div className="text-[12px] font-semibold text-[#1b4172]">
                Call Me Today !
              </div>
              <div className="text-[15px] font-semibold text-[#1b4172]">
                070 - 3826 675
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center mr-5">
            {/* Mobile hamburger menu */}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-3 text-[#000000]"
            >
              {isSidebarOpen ? (
                <IoMdClose size={24} />
              ) : (
                <GiHamburgerMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[100%] bg-white z-50 shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <img src={logo} className="w-[120px] h-auto ml-5" alt="Logo" />

          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-3 text-[#000000] mr-3"
          >
            {isSidebarOpen ? (
              <IoMdClose size={24} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>

        <div className="flex flex-col p-5 space-y-14 z-150 mt-5">
          <div
            onClick={() => handleNavigateToSectionMobile(scrollRefs.home)}
            className="font-bold text-[15px] cursor-pointer text-[#000000] hover:text-[#74768F]"
          >
            Home
          </div>
          <div
            onClick={() => handleNavigateToSectionMobile(scrollRefs.aboutMe)}
            className="font-bold text-[15px] cursor-pointer text-[#000000] hover:text-[#74768F]"
          >
            About&nbsp;Me
          </div>
          <div
            onClick={() => handleNavigateToSectionMobile(scrollRefs.technical)}
            className="font-bold text-[15px] cursor-pointer text-[#000000] hover:text-[#74768F]"
          >
            Technical&nbsp;Expertise
          </div>
          <div
            onClick={() => navigate("/projects")}
            className="font-bold text-[15px] cursor-pointer text-[#000000] hover:text-[#74768F]"
          >
            Projects
          </div>
          <div
            onClick={() => handleNavigateToSectionMobile(scrollRefs.contact)}
            className="font-bold text-[15px] cursor-pointer text-[#000000] hover:text-[#74768F]"
          >
            Contact&nbsp;Me
          </div>
        </div>
      </div>
    </>
  );
};