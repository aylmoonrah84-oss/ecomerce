import { useNavigate } from "react-router-dom";

const stats = [
  { value: "+۵۰۰", label: "برند منتخب" },
  { value: "+۱۲هزار", label: "مشتری خوشحال" },
  { value: "۷", label: "سال تجربه" },
  { value: "۱۰۰٪", label: "اصل‌بودن کالا" },
];

const values = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "کالای اصل",
    desc: "تمام محصولات مستقیم از برندهای معتبر تأمین می‌شن. هیچ‌وقت با کپی طرف نمی‌شی.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "ارسال سریع",
    desc: "سفارش‌ها ظرف ۲۴ ساعت بسته‌بندی و ارسال می‌شن. رهگیری لحظه‌ای هم داری.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
    title: "مرجوعی آسان",
    desc: "تا ۷ روز بعد از دریافت، بدون سؤال مرجوع کن. هزینه برگشت هم با ماست.",
  },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary">

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="pointer-events-none select-none absolute -top-4 left-0 text-[20vw] font-black leading-none text-text-primary/[0.03]">
          ABOUT
        </span>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold tracking-widest text-accent uppercase">
              داستان ما
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            استایل خوب
            <br />
            <span className="text-accent">از انتخاب درست</span>
            <br />
            شروع می‌شه
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
            از ۱۳۹۶ تا حالا یه کار ساده انجام می‌دیم؛ بهترین لباس‌ها رو پیدا می‌کنیم و مستقیم می‌ذاریم جلوی تو. بدون واسطه، بدون تخفیف‌های دروغی، بدون کالای تقلبی.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-card overflow-hidden shadow-soft">
          {stats.map((s, i) => (
            <div key={i} className="bg-bg-secondary flex flex-col items-center justify-center py-8 px-4 text-center">
              <span className="text-2xl sm:text-3xl font-black text-accent mb-1">{s.value}</span>
              <span className="text-xs sm:text-sm text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="rounded-card overflow-hidden bg-bg-dark aspect-[4/3] flex items-center justify-center shadow-soft">
            <svg className="w-16 h-16 text-accent/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5M4.5 3v18M19.5 3v18" />
            </svg>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">چرا ما؟</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              فروشگاهی که
              <br />
              خودمون دوست داشتیم وجود داشته باشه
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              همیشه دردسر خرید آنلاین لباس رو داشتیم؛ عکس‌های ادیت‌شده، جنس‌های بی‌کیفیت، ارسال دیر. تصمیم گرفتیم خودمون همون فروشگاهی باشیم که آرزوش رو داشتیم.
            </p>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              هر محصولی که می‌ذاریم اول خودمون چک می‌کنیم. جنس، دوخت، رنگ‌بندی — همه چیز باید استانداردمون رو رد کنه تا به سایت برسه.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="self-start flex items-center gap-2 bg-accent hover:bg-accent-hover text-bg-secondary font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
            >
              مشاهده محصولات
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-2 mb-8">
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">تعهدات ما</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-bg-secondary border border-border rounded-card p-6 flex flex-col gap-4 shadow-soft hover:border-accent transition-colors duration-200"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                {v.icon}
              </span>
              <h3 className="font-bold text-base">{v.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-bg-dark rounded-card px-8 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-soft">
          <div className="text-center sm:text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-text-light mb-2">
              سؤالی داری؟
            </h2>
            <p className="text-sm text-text-light/50">
              تیم پشتیبانی ما همیشه آماده‌ست
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="shrink-0 flex items-center gap-2 bg-accent hover:bg-accent-hover text-bg-secondary font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
          >
            تماس با ما
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
}