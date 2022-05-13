import React from "react";

function Notfound() {
  return (
    <div className="w-screen h-screen bg-desktop-mission flex justify-center items-center  ">
      <div className=" bg-gray-300 rounded-lg backdrop-blur-sm bg-opacity-10">
        <img src="/notfound.svg" alt="not found" />
      </div>
    </div>
  );
}

export default Notfound;
