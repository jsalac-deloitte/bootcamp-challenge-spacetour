import React from "react";
import format from "date-fns/format";
import ButtonLink from "../../Components/ButtonLink";
import Image from "../../Components/Image";

export default function MissionCard({
  flightNumber,
  flightImage,
  rocketName,
  payloadId,
  flightSuccess,
  launchDate,
  launchTime,
  launchFrom,
  btnLinks,
  refName,
}) {
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

  const formatDateAndTime = (dateAndTime, formatting) => {
    return format(new Date(dateAndTime), formatting);
  };

  return (
    <div
      className="flex   bg-gray-500 bg-opacity-10  backdrop-blur-[40px]  px-8 md:px-4 text-gray-300   "
      ref={refName}
    >
      <div className="w-full flex flex-col md:flex-row text-center space-y-4  py-8 ">
        {/* logo */}
        <div className="md:flex-none flex justify-center">
          <Image
            imgSrc={flightImage}
            imgAlt={flightImage}
            classes="w-20 md:w-40 md:h-40 lg:h-60 lg:w-60"
          />
        </div>

        {/* content */}

        <div className="md:flex-auto space-y-4 lg:space-y-0  lg:flex lg:flex-col lg:justify-around">
          <div className="md:text-left md:px-4">
            {/* rocket name and payload id */}
            <h1 className="font-barlow text-lg font-bold lg:text-3xl ">
              {rocketName} {" - "}
              {payloadId}
              {!flightSuccess && (
                <span className="text-red-500"> - Failed mission</span>
              )}
            </h1>
            {/* details about the flight */}
            <p className="text-gray-200 lg:text-2xl">
              {`Launched ${formatDateAndTime(launchDate, "do MMMM yyyy")} at 
              ${formatDateAndTime(launchTime, "h:m bb")}
              from
              ${launchFrom}`}
            </p>
          </div>
          <div className="flex flex-wrap bg-transparent space-y-2  md:space-y-0 pl-2  text-gray-700">
            {getButtonLinks(btnLinks).map((btnLink) => (
              <div key={btnLink.label} className="w-full md:w-auto px-1 py-1">
                <ButtonLink btnLink={btnLink.link} btnLabel={btnLink.label} />
              </div>
            ))}
          </div>
        </div>

        {/* flight number */}
        <div className="md:w-36 lg:w-40  lg:flex lg:items-center">
          <div className="space-y-2 lg:space-y-4">
            <h1 className="font-bellefair text-2xl md:text-3xl lg:font-bold lg:text-[50px]">
              # {flightNumber}
            </h1>
            <p className="font-barlow text-gray-200 lg:text-2xl">
              Flight Number
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
