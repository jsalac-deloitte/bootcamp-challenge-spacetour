import React from "react";

export default function Button({ label, type, className }) {
  return (
    <input
      type={type}
      value={label}
      className={`h-auto px-4 py-2 bg-green-400 w-full rounded-lg tracking-[2px] text-white font-semibold ${className}`}
    />
  );
}
