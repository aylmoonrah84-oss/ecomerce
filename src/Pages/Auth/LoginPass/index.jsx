import React, { useState } from "react";
import { useDispatch } from "react-redux";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { login } from "../../../Store/Slices/AuthSlice";

import {
  LockKeyhole,
  Phone,
  ArrowRight,
  MessageSquareMore,
} from "lucide-react";

export default function LoginPass({
  phoneNumber,
  changePage,
}) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handeleOtp = async () => {
    setLoading(true);

    const result = await fetchData("auth/resend-code", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) changePage("otp");

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await fetchData("auth/login-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        password,
      }),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) {
      dispatch(login(result.data));
    }

    setLoading(false);
  };

  return (<div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-bg-secondary
          border border-border
          shadow-soft
          rounded-card
          p-6 sm:p-8
          flex flex-col gap-5
        "
      >
        {/* Header */}
        <div className="text-center">
          <div
            className="
              w-16 h-16
              rounded-full
              bg-accent/10
              flex items-center justify-center
              mx-auto mb-4
            "
          >
            <LockKeyhole className="w-7 h-7 text-accent" />
          </div>

          <h2 className="text-2xl font-bold text-text-primary">
            ورود با رمز عبور
          </h2>

          <p className="text-sm text-text-secondary mt-2">
            رمز عبور حساب خود را وارد کنید
          </p>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            شماره موبایل
          </label>

          <div className="relative">
            <input
              type="text"
              value={phoneNumber}
              readOnly
              className="
                w-full h-13
                rounded-card
                border border-border
                bg-bg-primary
                pr-12 pl-4
                text-text-secondary
                outline-none
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
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            رمز عبور
          </label>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="رمز خود را وارد کنید"
              className="
                w-full h-13
                rounded-card
                border border-border
                bg-bg-primary
                pr-12 pl-4
                outline-none
                transition-all
                focus:border-accent
                focus:ring-2
                focus:ring-accent/20
              "
            />

            <LockKeyhole
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

        {/* Submit */}
        <button
          disabled={
            loading ||
            !phoneNumber ||
            !password
          }
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
          {loading
            ? "در حال ورود..."
            : "ورود به حساب"}
        </button>
        <div className="flex flex-col gap-3 text-sm">
          <button
            type="button"
            onClick={handeleOtp}
            className="
              flex items-center justify-center gap-2
              text-text-secondary
              hover:text-accent
              transition-all
            "
          >
            <MessageSquareMore className="w-4 h-4" />
            ورود با پیامک
          </button>

          <button
            type="button"
            onClick={() => changePage("forget")}
            className="
              flex items-center justify-center gap-2
              text-text-secondary
              hover:text-accent
              transition-all
            "
          >
            <ArrowRight className="w-4 h-4" />
            فراموشی رمز عبور
          </button>
        </div>
      </form>
    </div>
  );
}