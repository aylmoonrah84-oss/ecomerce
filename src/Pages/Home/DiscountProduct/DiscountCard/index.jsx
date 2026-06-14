import React from "react";
import { useNavigate } from "react-router-dom";

export default function DiscountCard({
  img,
  id,
  price,
  priceAfterDiscount,
  discountPercent,
  title,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          `/products/${id}/${title.replaceAll(
            " ",
            "-"
          )}`
        )
      }
      className="
        group
        relative
        overflow-hidden
        rounded-card
        bg-bg-secondary
        border border-border
        shadow-soft
        cursor-pointer
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Discount */}
      <span
        className="
          absolute
          top-3 right-3
          z-20
          px-3 py-1
          rounded-full
          bg-accent
          text-white
          text-xs
          font-bold
        "
      >
        %{discountPercent} تخفیف
      </span>

      {/* Image */}
      <div
        className="
          h-[240px]
          overflow-hidden
          bg-bg-primary
          flex
          items-center
          justify-center
        "
      >
        <img
          src={img}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="
            text-text-primary
            text-sm
            font-semibold
            leading-7
            line-clamp-2
            min-h-[56px]
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-4
            flex
            items-end
            justify-between
          "
        >
          <div>
            <p
              className="
                text-lg
                font-black
                text-primary
              "
            >
              {priceAfterDiscount}
              <span
                className="
                  mr-1
                  text-xs
                  font-normal
                  text-text-secondary
                "
              >
                تومان
              </span>
            </p>

            <del
              className="
                text-sm
                text-text-secondary
              "
            >
              {price}
            </del>
          </div>

          <button
            className="
              px-4 py-2
              rounded-xl
              bg-accent
              text-white
              text-sm
              transition-all
              hover:bg-accent-hover
            "
          >
            مشاهده
          </button>
        </div>
      </div>
    </div>
  );
}