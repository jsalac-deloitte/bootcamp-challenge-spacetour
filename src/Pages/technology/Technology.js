import React, { useState, useRef } from "react";

import { content, navs } from "./content";

const bgImage =
  "bg-mobile-technology md:bg-tablet-technology lg:bg-desktop-technology bg-no-repeat bg-cover";

export default function Technology() {
  const [selectedTechnology, setSelectedTechnolgy] = useState(0);

  const refs = content.reduce((list, img, index) => {
    list[index] = React.createRef(null);
    return list;
  }, {});

  const scrollToImage = (index) => {
    setSelectedTechnolgy(index);
    refs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div
      className={`h-screen w-screen bg-gray-500  overflow-auto ${bgImage} pt-[100px] lg:pt-0 `}
    >
      {/* container */}
      <div className="space-y-[32px] lg:space-y-0  lg:h-full lg:flex lg:flex-col lg:justify-center ">
        {/* tag line */}
        <div className=" flex justify-center px-[38.5px] lg:px-[166px] md:justify-start  lg:h-11">
          <h2 className="text-white font-barlow-condensed tracking-[3px] text-[16px] md:text-[20px] lg:text-[28px]">
            <span className="font-bold text-gray-500">
              {content[selectedTechnology].id}
            </span>{" "}
            <span className="font-thin">SPACE LAUNCH 101</span>
          </h2>
        </div>
        {/* content */}
        <div className=" space-y-[34px] lg:space-y-0  lg:flex lg:h-3/5 lg:flex-row-reverse">
          <div className="lg:w-full  flex  lg:h-full  overflow-x-hidden ">
            {content.map((item, index) => (
              <div
                className="w-full flex flex-shrink-0  lg:justify-end"
                key={item.name}
                ref={refs[index]}
              >
                <img
                  className="lg:hidden w-full object-contain"
                  src={content[index].landscape}
                  alt={content[index].name}
                />
                <img
                  className="hidden w-auto lg:flex   "
                  src={content[index].portrait}
                  alt={content[index].name}
                />
              </div>
            ))}
          </div>
          <div className="space-y-[26px] lg:space-y-0 lg:w-full lg:flex lg:pl-[10%]">
            {/* scroll / carousel */}
            <ul className=" flex justify-center space-x-4 lg:space-y-6 lg:space-x-0 lg:flex-col ">
              {navs.map((nav, index) => (
                <li
                  key={nav}
                  onClick={() => scrollToImage(index)}
                  className={`w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] text-[16px] md:text-[24px] rounded-full border border-gray-700 hover:border-gray-300  flex items-center justify-center font-bellefair 
                  ${
                    nav == content[selectedTechnology].id
                      ? "bg-white text-black"
                      : "bg-transparent text-white"
                  }`}
                >
                  {parseInt(nav)}
                </li>
              ))}
            </ul>
            {/* content text */}
            {}
            <div className="space-y-[16px] lg:pl-[10%]  lg:flex lg:flex-col lg:justify-center ">
              {/* label and title */}
              <div className=" text-white text-center lg:text-left font-thin ">
                <h2 className="font-barlow-condensed text-[14px]  md:text-[20px] lg:text-[24px] tracking-[2px]">
                  THE TERMINOLOGY...
                </h2>
                <h1 className="font-bellefair text-[24px] md:text-[40px] lg:text-[50px] ">
                  {content[selectedTechnology].name.toUpperCase()}
                </h1>
              </div>
              {/* description */}
              <div className=" text-center lg:text-left font-barlow px-[24px] md:px-[155px] lg:px-0  lg:pr-[5%]">
                <p className="font-thin text-desc text-[15px] md:text-[18px] lg:text-[22px] ">
                  {content[selectedTechnology].about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
