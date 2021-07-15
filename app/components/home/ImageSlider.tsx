import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { urlApi } from "@/context/urlapi";

const ImageSlider = ({ photos }: any) => {
  return (
    <div>
      <Carousel
        dynamicHeight={false}
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {photos.length > 0
          ? photos.map(({ photo }) => (
              <img
                key={photo}
                src={`${urlApi}uploads/banner/${photo}`}
                height="600"
              />
            ))
          : ""}
        {/* <img height="600" src={`${urlApi}uploads/matial-peak.jpg`} />
        <img height="600" src={`${urlApi}uploads/E4a4uubVoAEBUEk.jpg`} />
        <img height="600" src={`${urlApi}uploads/ESnP-OMXgAEa6nm.jpg`} /> */}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
