import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MainSlider() {
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchData("sliders");

      if (result.success) {
        setSliders(result.data);
        const result = await fetchData("sliders");
console.log(result);
      }
    })();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      <Swiper
        className="
          rounded-card
          overflow-hidden
          shadow-soft
          bg-bg-secondary
        "
        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {sliders.map((item) => (
          <SwiperSlide
            key={item._id}
            onClick={() => navigate(item.herf)}
            className="
              cursor-pointer
              overflow-hidden
            "
          >
            <img
              src={
                import.meta.env.VITE_BASE_FILE +
                item.image
              }
              alt={item.title}
              className="
                w-full
                h-[220px]
                sm:h-[320px]
                md:h-[400px]
                lg:h-[500px]
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}