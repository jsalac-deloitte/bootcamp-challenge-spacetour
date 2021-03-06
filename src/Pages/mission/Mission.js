import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

import API from "../../api/axios";
import MissionCard from "./MissionCard";
import SelectBox from "../../Components/SelectBox";
import Button from "../../Components/Button";
import MissionBanner from "./MissionBanner";

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

  const findMission = useRef();
  const topPart = useRef();
  const missionRef = useRef();
  const notAllowedCharacters = "#$&%^*()/#!_";

  //get the launches from api
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

  //get the launch pads from api
  const fetchLaunchpads = async () => {
    try {
      const response = await API.get("/launchpads");
      setLaunchPads(response.data);
      const lp = await getLaunchPads(response.data);
      setLaunchPadDropdown(lp);
    } catch (error) {
      //not 200 response range
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchLaunches();
    fetchLaunchpads();
  }, []);

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

  const getLaunchPads = async (option) => {
    return option.reduce(
      (list, item, index) => {
        list.push({ value: item.id, label: item.full_name });
        return list;
      },
      [{ value: "", label: "ANY" }]
    );
  };

  useEffect(() => {
    const selectOptionYear = years.map((item) => {
      return { value: item, label: item };
    });
    setMinYear(selectOptionYear);
    setMaxYear(selectOptionYear);
  }, [years]);

  useEffect(() => {
    const selectOptionYear = years.map((item) => {
      return { value: item, label: item };
    });
    setMinYear(selectOptionYear);
    setMaxYear(selectOptionYear);
  }, [years]);

  //handle the form submission
  const submitForm = async (e) => {
    e.preventDefault();

    // validate date range filter
    if (
      selectedMinYear != null &&
      selectedMaxYear != null &&
      selectedMinYear > selectedMaxYear
    ) {
      Swal.fire({
        title: "Error!",
        text: "Invalid Date range",
        icon: "error",
      });
      return;
    }

    //construct the filter query parameter
    let searchCriteria = `?`;

    if (keyword !== null && keyword !== "") {
      searchCriteria += `q=${keyword.toString()}`;
    }

    //add the launch pad to query parameter
    if (
      selectedLaunchPad !== null &&
      selectedLaunchPad !== "" &&
      selectedLaunchPad !== "ANY"
    ) {
      searchCriteria += "&launch_site.site_id=" + selectedLaunchPad;
    }

    //add the min year to query parameter
    if (
      selectedMinYear !== null &&
      selectedMinYear !== "" &&
      selectedMinYear !== "ANY"
    ) {
      searchCriteria += `&launch_date_local_gte=${selectedMinYear}`;
    }

    // add the max year to query parameter
    if (
      selectedMaxYear !== null &&
      selectedMaxYear !== "" &&
      selectedMaxYear !== "ANY"
    ) {
      searchCriteria += `&launch_date_local_lte=${selectedMaxYear + 1}`;
    }

    try {
      const response = await API.get("/launches" + searchCriteria);
      setLaunches(response.data);
    } catch (err) {
      //not 200 response range
      console.log(err.response.data);
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
    <div className="h-screen  w-full  ">
      {/* header */}
      <MissionBanner slideToMissions={slideToMissions} />
      {/* content */}
      <div
        className="w-full  h-full  px-4 lg:px-2 pt-6  lg:h-[99%] lg:w-[99%] overflow-x-hidden bg-desktop-galaxy bg-cover bg-center bg-no-repeat "
        ref={findMission}
      >
        {/* container */}
        <div className=" w-full h-full relative  overflow-y-hidden   ">
          {/* filter */}
          <form onSubmit={submitForm} className=" flex-none   ">
            <div className="h-auto bg-transparent flex flex-col md:flex-row md:flex-wrap  px-2 py-6 space-y-4 lg:space-y-0 tracking-widest rounded-xl text-white  ">
              {/*  tablet view */}
              <div className="w-full md:flex  space-y-4 md:space-y-0 lg:w-2/5">
                <div className="flex flex-col w-full md:w-1/2 px-2">
                  <label htmlFor="keyword" className="px-4 ">
                    Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="e.g falcon"
                    className="rounded-lg text-gray-800"
                    onKeyPress={(event) => {
                      if (notAllowedCharacters.indexOf(event.key) >= 0) {
                        event.preventDefault();
                        Swal.fire({
                          title: "Warning!",
                          text: `Invalid Character - Sorry "${notAllowedCharacters}" are special characters and not allowed`,
                          icon: "warning",
                        });
                      }
                    }}
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <SelectBox
                    options={launchpadDropdown}
                    name="launchpad"
                    label="Launch Pad"
                    placeholder="ANY"
                    optionSelected={(value) => setSelectedLaunchPad(value)}
                  />
                </div>
              </div>
              {/*  tablet view */}
              <div className="w-full md:flex space-y-4 md:space-y-0 lg:w-2/5">
                <div className="w-full md:w-1/2 px-2">
                  <SelectBox
                    options={minYear}
                    name="minYear"
                    label="Min Year"
                    placeholder="ANY"
                    optionSelected={(value) => setSelectedMinYear(value)}
                  />
                </div>

                <div className="w-full md:w-1/2 px-2">
                  <SelectBox
                    options={maxYear}
                    name="maxYear"
                    label="Max Year"
                    placeholder="ANY"
                    optionSelected={(value) => setSelectedMaxYear(value)}
                  />
                </div>
              </div>
              <div className="w-full  px-2 lg:w-1/5  lg:flex lg:items-end pb-1">
                <div className="w-full">
                  <Button type="submit" label="Apply" />
                </div>
              </div>
            </div>
          </form>
          {/* results */}
          <div className="h-[60%] md:h-[88%] lg:h-full  flex flex-col w-full    bg-transparent space-y-6  mt-4 overflow-y-hidden ">
            {/* showing  label result*/}
            <div className="h-[80%]  lg:h-[84%] overflow-y-hidden  pb-8 no-scrollbar">
              <div className="flex justify-center text-gray-400 text-[20px] ">
                {launches.length > 0 && (
                  <p>showing {launches.length} missions </p>
                )}
                {launches.length <= 0 && <p>No missions found</p>}
              </div>
              {/* list of items */}
              <div className="h-full">
                {/* item */}
                <div className="h-full overflow-y-scroll no-scrollbar  px-4 space-y-4 ">
                  {launches.map((item, index) =>
                    item.payloads.map((payload, payloadIndex) => (
                      <MissionCard
                        key={payloadIndex}
                        flightImage={item.links?.mission_patch}
                        flightNumber={item.flight_number}
                        rocketName={item.rocket.rocket_name}
                        payloadId={payload.payload_id}
                        btnLinks={item.links}
                        flightSuccess={item.launch_success && item.land_success}
                        launchDate={item.launch_date_local}
                        launchTime={item.launch_date_local}
                        launchFrom={
                          launchpads.filter(
                            (pad) => item?.launch_site?.site_id === pad?.id
                          )[0]?.full_name
                        }
                        refName={index === 0 ? topPart : missionRef}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-200  h-10 absolute bottom-0 lg:bottom-0  bg-gray-100 bg-opacity-10  backdrop-blur-[40px]   w-full lg:h-auto   px-4">
            <p>copyright &copy; {new Date().getFullYear()}</p>
            <p
              onClick={slideToTop}
              className=" text-gray-9jsjjsjj00   underline underline-offset-2 cursor-pointer "
            >
              Back to top
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
