import React, { useState } from "react";

import { content, navs } from "./content";

const bgImage =
  "bg-mobile-crew md:bg-tablet-crew lg:bg-desktop-crew bg-no-repeat bg-cover";

export default function Crew() {
  const [selectedCrew, setSelectedCrew] = useState(0);

  const refs = content.reduce((list, img, index) => {
    list[index] = React.createRef(null);
    return list;
  }, {});

  const refsTablet = content.reduce((list, img, index) => {
    list[index] = React.createRef(null);
    return list;
  }, {});

  const scrollToImage = (index) => {
    setSelectedCrew(index);
    console.log(index);
    refs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    refsTablet[index].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div
      className={`h-full bg-gray-500   ${bgImage} overflow-auto flex flex-col  justify-center `}
    >
      <div className="h-screen md:flex md:flex-col md:justify-between ">
        <div className="flex flex-col justify-between text-white h-2/5 md:h-12   px-[24px] md:px-0  mt-[88px] ">
          <div className="flex justify-center   font-barlow-condensed tracking-[4px] text-[16px] md:justify-start md:pl-[38px] md:pt-[24px]   ">
            <h2 className="font-thin ">
              <span className="font-bold text-gray-600">
                {content[selectedCrew].id}
              </span>{" "}
              MEET YOUR CREW
            </h2>
          </div>
          <div className="flex overflow-x-hidden mt-10">
            {content.map((item, index) => (
              <div
                className="border-b border-gray-500 md:hidden flex flex-shrink-0 w-full"
                key={index}
                ref={refs[index]}
              >
                <img
                  src={content[index].photo}
                  alt={content[index].about}
                  className="w-full h-full object-scale-down"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:flex lg:h-full">
          <div className=" lg:w-1/2">
            <div className="hidden lg:flex  lg:h-2/5 lg:items-center lg:pt-[2px] lg:pl-[20%]">
              <h2 className="font-thin font-barlow-condensed lg:text-[28px] text-white lg:tracking-widest">
                <span className="font-bold text-gray-600 ">
                  {content[selectedCrew].id}
                </span>{" "}
                MEET YOUR CREW
              </h2>
            </div>
            <div className="md:flex md:flex-col-reverse mt-2  lg:mt-0  lg:h-3/5 lg:pl-[20%]">
              <div className="flex justify-center  h-10  items-center lg:justify-start  lg:h-1/2 lg:items-start ">
                <ul
                  className="flex justify-evenly w-1/2 
                        md:text-[19px]  md:justify-evenly md:px-0 md:w-1/3  lg:justify-start lg:space-x-8"
                >
                  {navs.map((nav, index) => (
                    <li
                      key={nav}
                      className={` w-3 h-3  rounded-full
                  ${
                    nav === content[selectedCrew].id
                      ? "bg-gray-200"
                      : "bg-gray-700"
                  }
                `}
                      onClick={() => scrollToImage(index)}
                    ></li>
                  ))}
                </ul>
              </div>
              <div className=" h-1/3 md:h-full flex flex-col justify-between">
                <div className="mt-[20px]">
                  <h1 className="text-white  text-center text-[14px] font-bellefair tracking-[2px] md:text-[24px] lg:text-left lg:text-[32px]">
                    {content[selectedCrew].position.toUpperCase()}
                  </h1>
                  <h1 className="text-white  text-center text-[24px] font-bellefair tracking-[2px] md:text-[40px] lg:text-left lg:text-[48px] ">
                    {content[selectedCrew].name.toUpperCase()}
                  </h1>
                </div>
                <div className="px-[24px] md:px-[97px] lg:px-0 h-2/3 lg:pr-[20%]">
                  <p className="text-desc text-center font-barlow font-thin text-[15px] px-[24px] md:text-[16px]  lg:text-left lg:px-0 lg:text-[18px]">
                    {content[selectedCrew].about}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:w-full md:flex overflow-x-hidden   lg:w-1/2 lg:items-end ">
            {content.map((item, index) => (
              <div
                className="w-full flex-shrink-0 "
                key={index}
                ref={refsTablet[index]}
              >
                <img
                  src={content[index].photo}
                  alt={content[index].about}
                  className="h-[280px] md:h-[572px] md:w-full  object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
