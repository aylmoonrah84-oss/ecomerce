import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  title,
  categoryTitle,
  brandTitle,
  image,
  price,
  priceAfterDiscount,
  discountPercent,
  id,
  avgRating,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/product-details/${id}/${title.replaceAll(" ", "-")}`)
      }
      className="relative bg-bg-secondary border border-border rounded-card overflow-hidden cursor-pointer shadow-soft hover:border-accent hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
    >

      {discountPercent > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-danger text-white text-[10px] font-bold px-2 py-1 rounded-full">
          -{discountPercent}%
        </span>
      )}

      <div className="h-48 bg-bg-primary flex justify-center items-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">

        <h2 className="text-sm font-semibold text-text-primary line-clamp-2 min-h-[40px] leading-relaxed">
          {title}
        </h2>

        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] text-text-secondary">
            دسته‌بندی: <span className="font-medium text-text-primary">{categoryTitle}</span>
          </p>
          <p className="text-[11px] text-text-secondary">
            برند: <span className="font-medium text-text-primary">{brandTitle}</span>
          </p>
        </div>

        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-warning fill-warning" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[11px] font-medium text-text-secondary">
            {avgRating || 0}
            <span className="text-text-secondary/50"> / ۵</span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-1 pt-2 border-t border-border">
          <span className="text-base font-black text-accent">
            {priceAfterDiscount?.toLocaleString()} تومان
          </span>
          {discountPercent > 0 && (
            <del className="text-xs text-text-secondary/50">
              {price?.toLocaleString()}
            </del>
          )}
        </div>

      </div>
    </div>
  );
}