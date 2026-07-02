import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/AuthSlice";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.cart.items).length;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(token ? "/profile" : "/auth");
  };

  return (
    <nav className="w-full bg-bg-secondary border-b border-border shadow-soft px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-50">
      <h1 className="text-xl sm:text-2xl font-black text-primary whitespace-nowrap">
        استایلینو
      </h1>

      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <li>
          <Link to={"/"} className="text-text-primary hover:text-accent transition-all">
            خانه
          </Link>
        </li>
        <li>
          <Link to={"/about"} className="text-text-primary hover:text-accent transition-all">
            درباره ما
          </Link>
        </li>
        <li>
          <Link to={"/products/all/all-category"} className="text-text-primary hover:text-accent transition-all">
            محصولات
          </Link>
        </li>
        {!token ? (
          <li>
            <Link to={"/auth"} className="px-4 py-2 rounded-card bg-accent text-white hover:bg-accent-hover transition-all">
              ورود / ثبت‌نام
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={() => dispatch(logout())}
              className="px-4 py-2 rounded-card bg-primary text-white hover:bg-primary-light transition-all"
            >
              خروج
            </button>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            className="w-64 h-11 rounded-card border border-border bg-bg-primary px-4 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <div className="absolute top-full left-0 w-full mt-2">
            {/* search result */}
          </div>
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative w-11 h-11 rounded-full bg-bg-primary border border-border flex items-center justify-center cursor-pointer text-primary hover:text-accent hover:border-accent transition-all"
        >
          {cartLength > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-[10px] flex items-center justify-center">
              {cartLength}
            </span>
          )}
          <FiShoppingCart className="text-xl" />
        </div>

        <div
          onClick={handleProfileClick}
          className="relative w-11 h-11 rounded-full bg-bg-primary border border-border flex items-center justify-center cursor-pointer text-primary hover:text-accent hover:border-accent transition-all"
        >
          <FiUser className="text-xl" />
          {token && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success border-2 border-bg-secondary" />
          )}
        </div>
      </div>
    </nav>
  );
}