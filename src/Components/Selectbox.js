import React from "react";
import Select from "react-select";

export default function SelectBox({
  label,
  options,
  placeholder,
  name,
  optionSelected,
}) {
  return (
    <>
      <label htmlFor={name} className="px-2 ">
        {label}
      </label>
      <Select
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={(e) => optionSelected(e.value)}
      />
    </>
  );
}
