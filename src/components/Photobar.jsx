import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import "./styles/photobarStyles.css";

// import required modules
import { Pagination, Navigation, EffectCards } from "swiper";

export default function Photobar({userPhotos}) {

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >

       {userPhotos.map(photo=> (
        <SwiperSlide> <img src={photo.photo_link}/> </SwiperSlide>
       ))} 
      </Swiper>
    </>
  );
}
