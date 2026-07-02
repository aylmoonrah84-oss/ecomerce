import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 relative overflow-hidden">

      <span className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[28vw] font-black text-text-primary/[0.03] leading-none">
        404
      </span>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm sm:max-w-md gap-6">

        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">
            صفحه پیدا نشد
          </span>
          <span className="h-px w-8 bg-accent" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-5xl sm:text-6xl font-black text-text-primary leading-none tracking-tight">
            گم شدی؟
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            صفحه‌ای که دنبالش می‌گردی وجود نداره، حذف شده، یا آدرسش اشتباهه.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-bg-secondary font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
          >
            برگشت به خانه
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-border hover:border-accent text-text-secondary hover:text-accent text-sm font-medium px-6 py-3 rounded-full transition-colors duration-200"
          >
            صفحه‌ی قبلی
          </button>
        </div>

        <p className="text-[11px] text-text-secondary/50 mt-4">
          کد خطا: ۴۰۴
        </p>
      </div>

    </div>
  );
}