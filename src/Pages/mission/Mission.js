import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

import API from "../../api/axios";

export default function Mission() {
  const [selectedLaunchPad, setSelectedLaunchPad] = useState(null);
  const [selectedMinYear, setSelectedMinYear] = useState(null);
  const [selectedMaxYear, setSelectedMaxYear] = useState(null);
  const [keyword, setKeyword] = useState(null);

  const [launches, setLaunches] = useState([]);
  const [launchpads, setLaunchPads] = useState([]);
  const [launchpadDropdown, setLaunchPadDropdown] = useState([]);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [years, setYears] = useState([]);

  const findMission = useRef(null);
  const topPart = useRef(null);

  const fetchLaunches = async () => {
    try {
      const response = await API.get("/launches");
      setLaunches(response.data);
      const year = await getYears(response.data);
      setYears(year);
    } catch (err) {
      //not 200 response range
      console.log(err);
    }
  };

  const fetchLaunchpads = async () => {
    try {
      const response = await API.get("/launchpads");
      setLaunchPads(response.data);

      let selectOptions = launchpads.map((item) => {
        return { value: item.id, label: item.full_name };
      });
      setLaunchPadDropdown(selectOptions);
    } catch (error) {
      //not 200 response range
      console.log(err.response.data);
    }
  };

  const getYears = async (option) => {
    return option.reduce(
      (list, item, index) => {
        let year = new Date(item.launch_date_local).getFullYear();
        if (list.indexOf(year) === -1) {
          list.push(year);
        }
        return list;
      },
      ["ANY"]
    );
  };

  const defaultImgSrc = (img) => {
    img.target.src = "/noImage.jpeg";
  };

  useEffect(() => {
    const selectOptionYear = years.map((item) => {
      return { value: item, label: item };
    });
    setMinYear(selectOptionYear);
    setMaxYear(selectOptionYear);
  }, [years]);

  useEffect(() => {
    fetchLaunches();
    fetchLaunchpads();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("form submit");
    console.log("selected launch pad", selectedLaunchPad);
    console.log("selected MIn year", selectedMinYear);
    console.log("selected Max year", selectedMaxYear);
    console.log("selected keyword", keyword);

    let searchCriteria = "?q=" + (keyword || "");

    if (
      selectedLaunchPad !== null &&
      selectedLaunchPad !== "" &&
      selectedLaunchPad !== "ANY"
    ) {
      searchCriteria += "&launch_site.site_id=" + selectedLaunchPad;
    }

    if (
      selectedMinYear !== null &&
      selectedMinYear !== "" &&
      selectedMinYear !== "ANY"
    ) {
      searchCriteria += "&launch_date_local_lte=" + selectedMinYear;
    }

    if (
      selectedMaxYear !== null &&
      selectedMaxYear !== "" &&
      selectedMaxYear !== "ANY"
    ) {
      searchCriteria += "&launch_date_local_lte=" + selectedMaxYear;
    }

    try {
      const response = await API.get("/launches" + searchCriteria);
      setLaunches(response.data);
      console.log("Response data", response);
    } catch (err) {
      //not 200 response range
      console.log(err);
    }
  };

  const slideToMissions = () => {
    findMission.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const slideToTop = () => {
    topPart.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div className="h-screen w-full " ref={topPart}>
      {/* header */}
      <div className="h-full w-full bg-desktop-mission bg-center  ">
        {/* header container */}
        <div className=" w-full h-full ">
          {/* nav */}
          <div className=" h-[25%] flex  justify-center items-center">
            <h2 className="text-white font-barlow-condensed font-bont text-2xl tracking-[4px]">
              SPACE SAVVY
            </h2>
          </div>
          {/* text */}
          <div className="text-white h-[75%] flex flex-col justify-around ">
            <h1 className="font-bellefair text-[60px] text-center tracking-widest">
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
      {/* content */}
      <div className="w-full  h-full  px-4 pt-6 bg-gray-200" ref={findMission}>
        {/* container */}
        <div className=" w-full h-full  ">
          {/* filter */}
          <form onSubmit={submitForm}>
            <div className="bg-gray-100 flex flex-col px-2 py-2 space-y-4 tracking-widest text-gray-800">
              <div className="flex flex-col">
                <label htmlFor="keyword" className="px-4 ">
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="e.g falcon"
                  className="rounded-lg"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="keyword" className="px-2 ">
                  Launch pad
                </label>
                <Select
                  name="keyword"
                  options={launchpadDropdown}
                  placeholder="ANY"
                  onChange={(e) => setSelectedLaunchPad(e.value)}
                />
              </div>

              <div>
                <label htmlFor="minYear" className="px-2 ">
                  Min Year
                </label>
                <Select
                  name="minYear"
                  options={minYear}
                  placeholder="ANY"
                  onChange={(e) => setSelectedMinYear(e.value)}
                />
              </div>

              <div>
                <label htmlFor="maxYear" className="px-2 ">
                  Max Year
                </label>
                <Select
                  name="maxYear"
                  options={maxYear}
                  placeholder="ANY"
                  onChange={(e) => setSelectedMaxYear(e.value)}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Apply"
                  className=" px-4 py-2 bg-green-400 w-full rounded-lg tracking-[2px] text-white font-semibold"
                />
              </div>
            </div>
          </form>
          {/* results */}
          <div className="w-full h-1/2  overflow-y-scroll bg-gray-100 py-6 space-y-6">
            {/* showing  label result*/}

            <div className="flex justify-center">
              {launches.length > 0 && (
                <p>showing {launches.length} missions </p>
              )}
              {launches.length <= 0 && <p>No missions found</p>}
            </div>
            {/* list of items */}
            <div className="space-y-5 px-4">
              {/* item */}
              {launches.map((item, index) => (
                <div
                  key={item.flight_number}
                  className="flex shadow-lg shadow-gray-400 bg-white p-4"
                >
                  <div className="flex flex-col text-center">
                    {/* logo */}
                    <div className="bg-green-400 flex justify-center">
                      {item.links.mission_patch && (
                        <img
                          onError={defaultImgSrc}
                          src={item.links.mission_patch}
                          alt={item.links.patch}
                          className="w-20"
                        ></img>
                      )}
                    </div>

                    {/* content */}
                    <div className="bg-yellow-400">
                      {/* rocket name and payload id */}
                      <h1>
                        {item.rocket.rocket_name} {" - "}
                        {item.payloads[0].payload_id}
                      </h1>
                      {/* details about the flight */}
                      <p>
                        Launched {item.launch_date_local}
                        {" - "}
                        {
                          launchpads.filter(
                            (pad) => item.launch_site.site_id === pad.id
                          )[0].full_name
                        }
                      </p>
                    </div>

                    {/* flight number */}
                    <div className="bg-red-300">
                      <h1>#{item.flight_number}</h1>
                      <p>Flight Number</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            <p
              onClick={slideToTop}
              className="text-gray-800 w-full text-center underline underline-offset-2"
            >
              {" "}
              Back to top
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
