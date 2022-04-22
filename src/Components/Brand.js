import React from "react";
import { Link } from "react-router-dom";

export default function Brand({ logo, name }) {
  return (
    <div className="flex items-center   pl-[24px] w-2/5 md:pl-[39px] md:w-2/5 lg:w-2/5 lg:pl-[55px] ">
      <Link to="/">
        <img src={logo} alt={name} />
      </Link>
    </div>
  );
}
