import React from "react";

export default function Image({ imgSrc, imgAlt, classes }) {
  //set default image on mission path if broken
  const defaultImgSrc = (img) => {
    img.target.src = "/noImage.jpeg";
  };

  return (
    <img
      src={imgSrc}
      alt={imgAlt}
      onError={defaultImgSrc}
      className={classes}
    />
  );
}
