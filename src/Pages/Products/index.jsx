import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import SkeletonProductCard from "./SkeletonProductCard";
import ProductCard from "./ProductCard";

const initialState = {
  products: null,
  page: 1,
  sort: "-createdAt",
  price: [0, 10000],
  limit: 20,
  loading: true,
  count: 0,
};

const userAction = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCT_SUCCESS":
      return { ...state, count: action.payload.count, loading: false, products: action.payload.products };
    case "PAGE":
      return { ...state, loading: true, products: null, page: action.payload };
    case "SORT":
      return { ...state, loading: true, products: null, sort: action.payload };
    case "LIMIT":
      return { ...state, loading: true, products: null, limit: action.payload };
    case "PRICE":
      return { ...state, loading: true, products: null, price: action.payload };
  }
};

export default function Product() {
  const { categoryId } = useParams();
  const [{ products, page, sort, price, limit, loading, count }, dispatch] =
    useReducer(userAction, initialState);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        `products?${categoryId == "all" ? "" : `categoryId=${categoryId}&`}page=${page}&limit=${limit}&sort=${sort}&minPrice[gte]=${price[0]}&maxPrice[lte]=${price[1]}&populate=variantIds`
      );
      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: { products: result.data, count: result.count },
      });
    })();
  }, [limit, price, sort, page, categoryId]);

  const skeletonLoading = new Array(20).fill(<SkeletonProductCard />);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* فیلترها */}
      <div className="flex flex-wrap items-center gap-3 mb-8 bg-bg-secondary border border-border rounded-card px-4 py-3 shadow-soft">

        <select
          onChange={(e) => dispatch({ type: "SORT", payload: e.target.value })}
          className="h-9 px-3 text-sm rounded-full border border-border bg-bg-primary text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
        >
          <option value="-createdAt">جدیدترین</option>
          <option value="title">الف–ی</option>
          <option value="-title">ی–الف</option>
        </select>

        <select
          onChange={(e) => dispatch({ type: "LIMIT", payload: e.target.value })}
          className="h-9 px-3 text-sm rounded-full border border-border bg-bg-primary text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
        >
          <option value="5">۵ محصول</option>
          <option value="10">۱۰ محصول</option>
          <option selected value="20">۲۰ محصول</option>
        </select>

        <div className="flex items-center gap-2 mr-auto">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            از
            <input
              type="text"
              value={price[0]}
              onChange={(e) =>
                dispatch({ type: "PRICE", payload: [e.target.value, price[1]] })
              }
              className="w-20 h-9 px-3 text-sm rounded-full border border-border bg-bg-primary text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-center"
            />
          </label>
          <span className="text-border">—</span>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            تا
            <input
              type="text"
              value={price[1]}
              onChange={(e) =>
                dispatch({ type: "PRICE", payload: [price[0], e.target.value] })
              }
              className="w-20 h-9 px-3 text-sm rounded-full border border-border bg-bg-primary text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-center"
            />
          </label>
          <span className="text-xs text-text-secondary">تومان</span>
        </div>

        {!loading && (
          <span className="text-xs text-text-secondary mr-2">
            <span className="font-bold text-accent">{count}</span> محصول
          </span>
        )}
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading && !products && skeletonLoading}

        {!loading &&
          products?.map((pr) => (
            <ProductCard
              key={pr._id}
              id={pr._id}
              title={pr.title}
              image={import.meta.env.VITE_BASE_FILE + pr.images[0]}
              price={pr.defaultProductVariantId.price}
              priceAfterDiscount={pr.defaultProductVariantId.priceAfterDiscount}
              discountPercent={pr.defaultProductVariantId.discountPercent}
              categoryTitle={pr.categoryId?.title}
              brandTitle={pr.brandId?.title}
              avgRating={pr.avgRating}
            />
          ))}
      </div>
     

      {!loading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
          <svg className="w-16 h-16 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-text-secondary text-base">محصولی یافت نشد</p>
          <p className="text-text-secondary/50 text-sm">فیلترها را تغییر دهید</p>
        </div>
      )}

    </div>
  );
}
