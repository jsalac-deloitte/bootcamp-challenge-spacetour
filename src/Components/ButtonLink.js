import React from "react";

export default function ButtonLink({ btnLink, btnLabel }) {
  return (
    <a
      href={btnLink}
      className="flex justify-center px-4 py-2 bg-white rounded-lg border shadow-md"
      target="_blank"
    >
      {btnLabel}
    </a>
  );
}
