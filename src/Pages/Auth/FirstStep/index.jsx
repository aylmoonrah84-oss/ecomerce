import React, { useState } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { Phone, Lock } from "lucide-react";

export default function FirstStep({
  phoneNumber,
  changePhone,
  changePage,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await fetchData("auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) {
      changePage(result.data.passwordExist ? "password" : "otp");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-bg-secondary
          border border-border
          shadow-soft
          rounded-card
          p-6 sm:p-8
          flex flex-col gap-6
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              w-16 h-16
              rounded-full
              bg-accent/10
              flex items-center justify-center
            "
          >
            <Lock className="text-accent w-7 h-7" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary">
              ورود / ثبت‌نام
            </h2>

            <p className="text-sm text-text-secondary mt-2">
              برای ادامه شماره موبایل خود را وارد کنید
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            شماره موبایل
          </label>

          <div className="relative">
            <input
              type="text"
              placeholder="0915xxxxxxx"
              value={phoneNumber}
              onChange={(e) => changePhone(e.target.value)}
              className="
                w-full
                h-13
                rounded-card
                border border-border
                bg-bg-primary
                pr-12 pl-4
                text-text-primary
                placeholder:text-text-secondary/60
                outline-none
                transition-all
                focus:border-accent
                focus:ring-2
                focus:ring-accent/20
              "
            />

            <Phone
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-5 h-5
                text-text-secondary
              "
            />
          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading || !phoneNumber}
          type="submit"
          className="
            h-13
            rounded-card
            bg-accent
            hover:bg-accent-hover
            text-white
            font-semibold
            transition-all
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "در حال بررسی..." : "ادامه"}
        </button>

        {/* Forget Password */}
        <button
          type="button"
          onClick={() => changePage("forget")}
          className="
            text-sm
            text-text-secondary
            hover:text-accent
            transition-all
            mx-auto
          "
        >
          رمز عبور را فراموش کرده‌ام
        </button>
      </form>
    </div>
  );
}