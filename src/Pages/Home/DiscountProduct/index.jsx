import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";

import DiscountCard from "./DiscountCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function DiscountProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        "product-variants?sort=-discountPercent&limit=10&populate=productId,variantId"
      );

      setProducts(result.data || []);
    })();
  }, []);

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-14
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >
        <div>
          <span
            className="
              text-sm
              text-accent
              font-medium
            "
          >
            پیشنهاد ویژه
          </span>

          <h2
            className="
              mt-2
              text-2xl
              sm:text-3xl
              font-black
              text-text-primary
            "
          >
            تخفیف‌های داغ امروز
          </h2>
        </div>

        <div
          className="
            hidden sm:flex
            items-center
            gap-2
            text-text-secondary
            text-sm
          "
        >
          تا قبل از اتمام موجودی
        </div>
      </div>

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
        spaceBetween={18}
        slidesPerView={1}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        loop
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="
          rounded-card
          overflow-hidden
        "
      >
        {products?.map((item) => (
          <SwiperSlide
            key={item._id}
            className="pb-12"
          >
            <div
              className="
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <DiscountCard
                img={
                  import.meta.env
                    .VITE_BASE_FILE +
                  item?.productId?.images?.at(0)
                }
                title={
                  item.productId.title
                }
                price={item.price}
                priceAfterDiscount={
                  item.priceAfterDiscount
                }
                discountPercent={
                  item.discountPercent
                }
                id={item.productId._id}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}