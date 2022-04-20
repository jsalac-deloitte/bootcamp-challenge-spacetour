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
    <div key={flightNumber} className="flex   bg-gray-50 px-8   " ref={refName}>
      <div className="w-full flex flex-col text-center space-y-4 border-b py-8">
        {/* logo */}
        <div className=" flex justify-center">
          <Image imgSrc={flightImage} imgAlt={flightImage} classes="w-20" />
        </div>

        {/* content */}

        <div className="space-y-4 ">
          <div>
            {/* rocket name and payload id */}
            <h1 className="font-barlow text-lg font-bold">
              {rocketName} {" - "}
              {payloadId}
              {!flightSuccess && (
                <span className="text-red-500"> - Failed mission</span>
              )}
            </h1>
            {/* details about the flight */}
            <p className="text-gray-500">
              Launched {formatDateAndTime(launchDate, "do MMMM yyyy")} at
              {formatDateAndTime(launchTime, "h:m bb")}
              {" from "}
              {launchFrom}
            </p>
          </div>
          <div className="flex flex-wrap bg-gray-50 space-y-2 text-gray-500">
            {getButtonLinks(btnLinks).map((btnLink) => (
              <div key={btnLink.label} className="w-full ">
                <ButtonLink btnLink={btnLink.link} btnLabel={btnLink.label} />
              </div>
            ))}
          </div>
        </div>

        {/* flight number */}
        <div className="">
          <h1 className="font-bellefair text-2xl"># {flightNumber}</h1>
          <p className="font-barlow">Flight Number</p>
        </div>
      </div>
    </div>
  );
}
