import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L13 7H17L14 11L15.5 16L10 13L4.5 16L6 11L3 7H7L10 2Z" fill="none" stroke="#c08b5c" strokeWidth="1.6" strokeLinejoin="round" />
                  <circle cx="10" cy="10" r="2" fill="#c08b5c" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black text-text-light tracking-tight">استایلینو</span>
                <span className="text-[9px] font-medium text-accent tracking-[0.2em] uppercase">Fashion Store</span>
              </div>
            </div>
            <p className="text-sm text-text-light/50 leading-relaxed">
              بهترین برندها، جدیدترین استایل‌ها. مستقیم از منبع، بدون واسطه.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="#" className="w-9 h-9 rounded-full border border-text-light/10 flex items-center justify-center text-text-light/50 hover:border-accent hover:text-accent transition-all duration-200">
                <FiInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-text-light/10 flex items-center justify-center text-text-light/50 hover:border-accent hover:text-accent transition-all duration-200">
                <FiTwitter size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-accent" />
              <h4 className="text-xs font-bold tracking-widest text-accent uppercase">دسترسی سریع</h4>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "خانه", to: "/" },
                { label: "محصولات", to: "/products/all/all-category" },
                { label: "درباره ما", to: "/about" },
                { label: "تماس با ما", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-text-light/50 hover:text-accent transition-colors duration-200 flex items-center gap-1.5 group">
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 rotate-180 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-accent" />
              <h4 className="text-xs font-bold tracking-widest text-accent uppercase">خدمات</h4>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "پیگیری سفارش", to: "/orders" },
                { label: "قوانین مرجوعی", to: "/returns" },
                { label: "راهنمای سایز", to: "/size-guide" },
                { label: "سوالات متداول", to: "/faq" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-text-light/50 hover:text-accent transition-colors duration-200 flex items-center gap-1.5 group">
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 rotate-180 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-accent" />
              <h4 className="text-xs font-bold tracking-widest text-accent uppercase">تماس با ما</h4>
            </div>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-text-light/50">
                <FiPhone size={15} className="text-accent shrink-0" />
                <span>۰۲۱-۱۲۳۴-۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-light/50">
                <FiMail size={15} className="text-accent shrink-0" />
                <span>info@stylino.ir</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-light/50">
                <FiMapPin size={15} className="text-accent shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-text-light/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-light/30">
            © {new Date().getFullYear()} استایلینو — تمامی حقوق محفوظ است
          </p>
          <p className="text-xs text-text-light/30">
            طراحی و توسعه با ❤️
          </p>
        </div>

      </div>
    </footer>
  );
}