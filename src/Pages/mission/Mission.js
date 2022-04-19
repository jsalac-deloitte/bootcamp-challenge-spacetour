import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import format from "date-fns/format";
import Swal from "sweetalert2";

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

  const findMission = useRef();
  const topPart = useRef();
  const missionRef = useRef();

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

      let selectOptions = launchpads.map((item) => {
        return { value: item.id, label: item.full_name };
      });
      setLaunchPadDropdown(selectOptions);
    } catch (error) {
      //not 200 response range
      console.log(err.response.data);
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

  //set default image on mission path if broken
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
    let searchCriteria = "?q=" + (keyword || "");

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
      searchCriteria += "&launch_date_local_lte=" + selectedMinYear;
    }

    // add the max year to query parameter
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

  const formatDateAndTime = (dateAndTime) => {
    let newDate = format(new Date(dateAndTime), "do MMMM yyyy");
    let newTime = format(new Date(dateAndTime), "h:m bb");
    return `${newDate} at ${newTime}`;
  };

  const getButtonLinks = (buttonLinks) => {
    let links = {
      reddit_campaign: "Reddit Campaign",
      reddit_launch: "Reddit Launch",
      reddit_recovery: "Reddit Recovery",
      reddit_media: "Reddit Media",
      presskit: "Press",
      article_link: "Article",
      video_link: "Watch Videos",
    };

    let arrayLinks = [];
    Object.keys(links).forEach((item) => {
      if (buttonLinks.hasOwnProperty(item) && buttonLinks[item] !== null) {
        arrayLinks.push({
          label: links[item],
          link: buttonLinks[item],
        });
      }
    });

    return arrayLinks;
  };

  return (
    <div className="h-screen w-full ">
      {/* header */}
      <div className="h-full w-full bg-desktop-mission bg-center  ">
        {/* header container */}
        <div className=" w-full h-full px-4">
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
      <div className="w-full  h-full  px-4 pt-6 bg-gray-200 " ref={findMission}>
        {/* container */}
        <div className=" w-full h-full relative  overflow-y-scroll ">
          {/* filter */}
          <form onSubmit={submitForm} className=" bg-yellow-400 ">
            <div className=" bg-gray-100 flex flex-col px-2  space-y-4 tracking-widest text-gray-800">
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
          <div className="w-full h-1/2  bg-gray-50 space-y-6 overflow-y-scroll mt-4 ">
            {/* showing  label result*/}

            <div className="flex justify-center ">
              {launches.length > 0 && (
                <p>showing {launches.length} missions </p>
              )}
              {launches.length <= 0 && <p>No missions found</p>}
            </div>
            {/* list of items */}
            <div className="h-full overflow-y-scroll  px-4  ">
              {/* item */}
              {launches.map((item, index) => (
                <div
                  key={item.flight_number}
                  className="flex   bg-gray-50 px-8   "
                  ref={index === 0 ? topPart : missionRef}
                >
                  <div className="w-full flex flex-col text-center space-y-4 border-b py-8">
                    {/* logo */}
                    <div className=" flex justify-center">
                      {item.links.mission_patch && (
                        <img
                          onError={defaultImgSrc}
                          src={item.links?.mission_patch}
                          alt={item.links?.mission_patch}
                          className="w-20"
                        ></img>
                      )}
                    </div>

                    {/* content */}

                    <div className="space-y-4 ">
                      <div>
                        {/* rocket name and payload id */}
                        <h1 className="font-barlow text-lg font-bold">
                          {item?.rocket?.rocket_name} {" - "}
                          {item?.payloads[0]?.payload_id}
                          {(!item.launch_success || !item.land_success) && (
                            <span className="text-red-500">
                              {" "}
                              - Failed mission
                            </span>
                          )}
                        </h1>
                        {/* details about the flight */}
                        <p className="text-gray-500">
                          Launched{" "}
                          {formatDateAndTime(new Date(item.launch_date_local))}
                          {" from "}
                          {
                            launchpads.filter(
                              (pad) => item?.launch_site?.site_id === pad?.id
                            )[0]?.full_name
                          }
                        </p>
                      </div>
                      <div className="flex flex-wrap bg-gray-50 space-y-2 text-gray-500">
                        {getButtonLinks(item.links).map((btnLink) => (
                          <div key={btnLink.label} className="w-full ">
                            <a
                              href={btnLink.link}
                              className="flex justify-center px-4 py-2 bg-white rounded-lg border    shadow-md"
                            >
                              {btnLink.label}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* flight number */}
                    <div className="">
                      <h1 className="font-bellefair text-2xl">
                        # {item?.flight_number}
                      </h1>
                      <p className="font-barlow">Flight Number</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center   bg-gray-200 w-full">
            <p
              onClick={slideToTop}
              className="text-gray-800   underline underline-offset-2 "
            >
              Back to top
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
