import React, { useReducer } from "react";

//components
import Brand from "../Brand";

import Navbar from "../Navbar";

const logo = "./assets/shared/logo.svg";

export default function Header() {
  return (
    <div className="flex justify-between w-screen   relative pt-6">
      <Brand logo={logo} name="logo" />
      <Navbar />
      <div className="hidden lg:flex border-b border-gray-600 lg:w-[25%] absolute top-[38px] left-[160px]"></div>
    </div>
  );
}
