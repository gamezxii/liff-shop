import React from "react";
import Image from "next/image";

const Banner = () => {
  const myLoader = ({ src, width, quality }) => {
    return `https://image.freepik.com/free-vector/happy-new-year-banner_1048-11275.jpg?w=${width}&q=${quality || 75}`;
  };
  return (
    <div>
      <Image
        loader={myLoader}
        src="me.png"
        alt="Picture of the author"
        width={1232}
        height={200}
      />
    </div>
  );
};

export default Banner;
