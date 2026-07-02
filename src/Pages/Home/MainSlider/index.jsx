import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function MainSlider() {
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    (async () => {
      const result = await fetchData("sliders");

    if (result.success) {
  setSliders(result.data);
  console.log(result);
}
    })();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-px w-5 bg-accent" />
          <span className="text-[11px] font-semibold tracking-widest text-accent uppercase">
            کالکشن‌ها
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        modules={[Autoplay]}
        loop
        speed={600}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          0:   { slidesPerView: 1.15, spaceBetween: 10 },
          480: { slidesPerView: 1.6,  spaceBetween: 12 },
          768: { slidesPerView: 2.4,  spaceBetween: 14 },
          1024:{ slidesPerView: 3.2,  spaceBetween: 16 },
        }}
      >
        {sliders.map((item, i) => (
          <SwiperSlide key={item._id}>
            <div
              onClick={() => navigate(item.herf)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-card shadow-soft">
                <img
                  src={import.meta.env.VITE_BASE_FILE + item.image}
                  alt={item.title}
                  className="w-full h-[160px] sm:h-[200px] md:h-[230px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 right-0 p-3 sm:p-4 text-right w-full">
                  <p className="text-[10px] text-text-light/60 mb-0.5">کالکشن جدید</p>
                  <h2 className="text-sm sm:text-base font-bold text-text-light leading-tight line-clamp-1">
                    {item.title}
                  </h2>
                </div>

                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1 bg-accent text-bg-secondary text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    مشاهده
                    <svg className="w-2.5 h-2.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center gap-1.5 mt-3 justify-center">
        {sliders.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 h-1.5 bg-accent"
                : "w-1.5 h-1.5 bg-border"
            }`}
          />
        ))}
      </div>

    </section>
  );
}