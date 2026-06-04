import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CategoryCard({ id, title, image }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() =>
        navigate(
          `/products/${id}/${title.replaceAll(" ", "-")}`
        )
      }
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-card
        bg-bg-secondary
        border border-border
        shadow-soft
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <img
        src={import.meta.env.VITE_BASE_FILE + image}
        alt={title}
        className="
          w-full
          aspect-square
          object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
      />

      <div className="p-4">
        <h2
          className="
            text-center
            font-semibold
            text-text-primary
            transition-colors
            group-hover:text-accent
          "
        >
          {title}
        </h2>
      </div>
    </div>
  )
}