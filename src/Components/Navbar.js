import React, { useEffect, useState, useReducer } from "react";
import { Link, useLocation } from "react-router-dom";

import { menuIcon, closeIcon } from "../Config/constants";

const navList = [
  {
    id: "00",
    to: "/",
    title: "HOME",
  },
  {
    id: "01",
    to: "/destination",
    title: "DESTINATION",
  },
  {
    id: "02",
    to: "/crew",
    title: "CREW",
  },
  {
    id: "03",
    to: "/technology",
    title: "TECHNOLOGY",
  },
  {
    id: "04",
    to: "/discover",
    title: "DISCOVER",
  },
];

function VerticalNavbar({ navs }) {
  const location = useLocation().pathname;
  const [activePage, setActivePage] = useState("/");

  useEffect(() => {
    setActivePage(location);
  }, [location]);

  const [showMenu, toggle] = useReducer((showMenu) => !showMenu, false);

  return (
    <div className="flex items-center  h-full  justify-end pr-[24px] md:hidden">
      <img
        className={showMenu ? "hidden" : ""}
        src={menuIcon}
        alt="show menu"
        onClick={toggle}
      />
      <div
        className={`
            ${!showMenu ? "hidden" : ""}
            w-[254px] 
            backdrop-blur-[40px] 
            bg-gray-600 
            bg-opacity-25  
            absolute top-0 
            right-0 
            h-screen 
            pt-[38px]
            z-40
            transition-all
            duration-300
            `}
      >
        <div className="flex justify-end pr-[24px]">
          <img
            className="tex-desc "
            onClick={toggle}
            src={closeIcon}
            alt="close menu"
          />
        </div>
        <div className="pt-[64.95px]">
          <ul className="space-y-[32px]">
            {navs.map((nav) => (
              <li
                key={nav.id}
                className={`text-white pl-[32px] tracking-widest hover:border-r-4 ${
                  nav.to === activePage ? "border-r-4" : ""
                } `}
                onClick={toggle}
              >
                <Link
                  to={nav.to}
                  className="font-barlow-condensed text-[19px] "
                >
                  <span className="font-bold">{nav.id}</span>
                  <span className="font-thin pl-2">{nav.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function HorizontalNavbar({ navs }) {
  const location = useLocation().pathname;
  const [activePage, setActivePage] = useState("/");

  useEffect(() => {
    setActivePage(location);
  }, [location]);

  return (
    <ul
      className="hidden 
      md:w-full md:flex md:h-20 lg:h-20  md:justify-evenly md:pr-8  md:bg-gray-700 md:bg-opacity-30 
      lg:backdrop-blur-[40px]  
      bg-opacity-25 
      "
    >
      {navs.map((nav) => (
        <li
          key={nav.id}
          className={`text-white 
          md:flex md:items-center 
          md:h-full
          hover:border-b-4
          hover:border-gray-500
          ${nav.to === activePage ? "text-gray-400 border-b-4" : ""}`}
        >
          <Link to={nav.to}>
            <h2 className="flex space-x-2 tracking-widest font-barlow-condensed text-[14px] md:text-[16px] lg:text-[24px]">
              <span className="font-bold hidden lg:block"> {nav.id} </span>
              <span className="font-thin ">{nav.title}</span>
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar({ navClass }) {
  return (
    <div className="w-1/2 md:w-3/5  lg:w-3/5 lg:h-full">
      <VerticalNavbar navs={navList} />
      <HorizontalNavbar navs={navList} />
    </div>
  );
}
