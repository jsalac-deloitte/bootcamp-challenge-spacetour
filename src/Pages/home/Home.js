import React from "react";
import { Link } from "react-router-dom";
import { content } from "./content";

const bgImage =
  "bg-mobile-home md:bg-tablet-home lg:bg-desktop-home bg-no-repeat bg-cover";

export default function Home() {
  return (
    <div className={`h-full bg-gray-500  ${bgImage} overflow-auto`}>
      <div className="flex flex-col justify-between h-full pt-[112px] pb-14  md:pt-[202px] md:px-[150px]  lg:flex-row lg:items-center ">
        <div className=" lg:w-2/5 ">
          <h2 className="text-caption text-center font-bellefair md:text-[24px] lg:text-left lg:text-[28px]">
            {content.title.toUpperCase()}
          </h2>
          <h1 className="font-bellefair text-[80px] text-center text-caption md:text-[150px] lg:text-left">
            {content.caption.toUpperCase()}
          </h1>
          <p className="font-thin text-desc text-center text-[15px] px-[24px] lg:px-0 md:text-[20px] lg:text-left lg:pr-[120px] lg:text-[24px]">
            {content.description}
          </p>
        </div>
        <div className="flex justify-center lg:w-1/2 lg:justify-end ">
          <div className="flex items-center rounded-full justify-center w-[190px]  md:h-[272px] md:w-[272px] md:text-[32px] lg:w-[400px] lg:h-[400px]  hover:bg-gray-50 hover:bg-opacity-25">
            <div className="flex items-center justify-center bg-white h-[150px] w-[150px] rounded-full md:h-[242px] md:w-[242px] md:text-[32px] lg:w-[274px] lg:h-[274px]">
              <Link to="/destination" className="font-bellefair">
                EXPLORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
