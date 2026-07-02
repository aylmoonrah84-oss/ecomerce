import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ id, title, image }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${id}/${title.replaceAll(" ", "-")}`)}
      className="cursor-pointer group rounded-card overflow-hidden bg-bg-secondary border border-border shadow-soft hover:border-accent hover:shadow-md transition-all duration-300"
    >
      <div className="w-full h-36 overflow-hidden">
        <img
          src={import.meta.env.VITE_BASE_FILE + image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      <div className="px-3 py-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <svg
          className="w-3.5 h-3.5 text-border group-hover:text-accent rotate-180 transition-all duration-200 group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}