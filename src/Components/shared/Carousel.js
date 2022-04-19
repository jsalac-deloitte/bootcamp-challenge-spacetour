import React from "react";

const refs = data.reduce((acc, val, i) => {
  acc[i] = React.createRef();
  return acc;
}, {});

export default function Carousel({ data, scrollTo }) {
  const [currentImage, setCurrentImage] = React.useState(0);

  function scrollTo(selectedIndex) {
    setCurrentImage(selectedIndex);
    refs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  return (
    <div className="w-full">
      {data.maps((Image, index) => (
        <img src={Image} alt={Image.name} />
      ))}
    </div>
  );
}
