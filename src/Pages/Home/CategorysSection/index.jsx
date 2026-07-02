import React, { useEffect, useState } from 'react'
import fetchData from '../../../Utils/fetchData';
import CategoryCard from './CategoryCard';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchData("categories?limit=10&page=1");
      setCategories(result.data);
    })();
  }, []);

  const items = categories.map((item) => (
    <CategoryCard
      id={item._id}
      image={item.image}
      title={item.title}
      key={item._id}
    />
  ));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="h-px w-5 bg-accent" />
          <h2 className="text-sm font-bold text-text-primary tracking-wide">
            دسته‌بندی‌ها
          </h2>
        </div>
        <span className="text-xs text-text-secondary">
          {categories.length} دسته
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {items}
      </div>

    </section>
  );
}