import React, { useState } from "react";

import { content, navs } from "./content";

const bgImage =
  "bg-mobile-destination md:bg-tablet-destination lg:bg-desktop-destination bg-no-repeat bg-cover";

export default function Destination() {
  const [selectedPlanet, setSelectedPlanet] = useState(0);

  const refs = navs.reduce((list, item, index) => {
    list[index] = React.createRef(null);
    return list;
  }, []);

  const scrollToPlanet = (index) => {
    setSelectedPlanet(index);
    refs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div
      className={`h-full bg-gray-500 pt-[88px]  ${bgImage} overflow-auto flex flex-col justify-center lg:flex-row lg:items-center lg:pb-20`}
    >
      <div className="text-white  lg:w-3/6 lg:h-full">
        <div className="flex justify-center font-barlow-condensed tracking-[2px] text-[16px] md:justify-start md:pl-[38px] lg:text-[28px] lg:h-1/4 lg:px-36 lg:items-end  ">
          <h2 className="font-thin ">
            <span className="font-bold text-gray-600">
              {content[selectedPlanet].id}{" "}
            </span>{" "}
            PICK YOUR DESTINATION
          </h2>
        </div>
        <div className="w-full flex  mt-[32px]  lg:h-3/4 lg:items-center  overflow-hidden">
          {content.map((planet, index) => (
            <div
              key={index}
              className="w-full flex justify-center flex-shrink-0"
              ref={refs[index]}
            >
              <img
                src={planet.img}
                alt={planet.destination}
                className="w-[170px] h-[170px] md:w-[300px] md:h-[300px] lg:w-[445px] lg:h-[445px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="md:flex md:justify-center  lg:justify-start ">
          <ul
            className="flex justify-around px-[69px] text-white font-thin font-barlow-condensed text-[14px] mt-[26px] md:text-[19px] 
            md:justify-evenly md:px-0 md:w-1/2
            lg:px-0 lg:justify-start lg:space-x-[35px]"
          >
            {navs.map((nav, index) => (
              <li
                key={nav}
                className={`
                   hover:border-gray-500 hover:border-b-2 cursor-pointer
                  ${
                    nav === content[selectedPlanet].destination
                      ? "underline underline-offset-4"
                      : ""
                  }
                `}
                onClick={() => scrollToPlanet(index)}
              >
                {nav}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-[20px]">
          <h1 className="text-white  text-center text-[56px] font-bellefair tracking-[2px] md:text-[80px] lg:text-left">
            {content[selectedPlanet].destination}
          </h1>
        </div>
        <div className="px-[24px] md:px-[97px] lg:px-0  lg:pr-44">
          <p className="text-desc text-center font-barlow font-thin text-[15px] px-[24px] md:text-[16px] lg:text-left lg:px-0">
            {content[selectedPlanet].description}
          </p>
        </div>
        <div className="px-[24px] mt-10 md:px-[97px] lg:px-0 lg:pr-44">
          <div className="w-full border-b border-gray-600"></div>
        </div>
        <div
          className="flex flex-col text-center  text-white  mt-[32px] space-y-6 md:flex-row  md:space-y-0 md:justify-evenly md:px-[97px] 
                    lg:px-0  lg:justify-start lg:text-left lg:space-x-[79px]"
        >
          <div className="flex flex-col space-y-[4px] ">
            <h4 className="font-barlow-condensed font-thin tracking-wider">
              AVG. DISTANCE
            </h4>
            <h3 className="text-3xl font-bellefair">
              {content[selectedPlanet].distance}
            </h3>
          </div>
          <div className="flex flex-col space-y-[4px]">
            <h4 className="font-barlow-condensed font-thin tracking-wider">
              EST. TRAVEL TIME
            </h4>
            <h3 className="text-3xl font-bellefair">
              {content[selectedPlanet].travelTime}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
