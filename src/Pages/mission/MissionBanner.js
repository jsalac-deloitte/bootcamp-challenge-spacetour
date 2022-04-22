import React from "react";

export default function MissonBanner({ slideToMissions }) {
  return (
    <div className="h-screen w-full bg-desktop-mission bg-cover bg-center bg-no-repeat   ">
      {/* header container */}
      <div className=" w-full h-full px-4">
        {/* nav */}
        <div className=" h-[25%] flex  justify-center items-center md:items-end">
          <h2 className="text-white font-barlow-condensed font-bont text-2xl tracking-[4px]">
            SPACE SAVVY
          </h2>
        </div>
        {/* text */}
        <div className="text-white h-[75%] flex flex-col justify-around  md:px-28">
          <h1 className="font-bellefair text-[60px] md:text-[80px] text-center tracking-widest">
            Discover Space Mission
          </h1>
          <div className="flex justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={slideToMissions}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
