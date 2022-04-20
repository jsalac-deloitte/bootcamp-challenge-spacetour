import React from "react";
import SelectBox from "../../Components/SelectBox";
import Button from "../../Components/Button";

export default function FilterMission() {
  return (
    <div className="h-auto bg-gray-100 flex flex-col md:flex-row md:flex-wrap  px-2 py-6 space-y-4  tracking-widest text-gray-800">
      {/*  tablet view */}
      <div className="w-full md:flex space-y-4 md:space-y-0">
        <div className="flex flex-col w-full md:w-1/2 px-2">
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
      <div className="w-full md:flex space-y-4 md:space-y-0">
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
      <div className="w-full md:w-1/2 px-2">
        <Button type="submit" label="Apply" />
      </div>
    </div>
  );
}
