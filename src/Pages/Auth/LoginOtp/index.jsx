import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { login } from "../../../Store/Slices/AuthSlice";

import {
  ShieldCheck,
  Phone,
  ArrowRight,
  LockKeyhole,
  MessageSquareMore,
} from "lucide-react";

export default function LoginOtp({
  phoneNumber,
  changePage,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTime, setResendTime] = useState(120);

  const dispatch = useDispatch();

  const formatTime = () => {
    const min = Math.floor(resendTime / 60);
    const sec = resendTime % 60;

    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  useEffect(() => {
    if (resendTime <= 0) return;
    const timer = setInterval(() => {
      setResendTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTime]);

  const resendCode = async () => {
    setLoading(true);
    setCode("");
    const result = await fetchData(
      "auth/resend-code",
      {
        method: "POST",
        headers: {
          "content-type":
            "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
        }),
  }
);
notify(
      result.success
        ? "success"
        : "error",
      result.message
    );

    if (result.success) {
      setResendTime(120);
    }

    setLoading(false);
  };

  const handeleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await fetchData(
      "auth/login-otp",
      {
        method: "POST",
        headers: {
          "content-type":
            "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          code,
        }),
      }
    );

    notify(
      result.success
        ? "success"
        : "error",
      result.message
    );

    if (result.success) {
      dispatch(login(result.data));
    }

    setLoading(false);
  };
return (
  <div className="flex items-center justify-center px-4 py-10">
    <form
      onSubmit={handeleSubmit}
      className="
        w-full max-w-md
        bg-bg-secondary
        border border-border
        rounded-card
        shadow-soft
        p-6 sm:p-8
        flex flex-col gap-5
      "
    >
      <div className="text-center">
        <div
          className="
            w-16 h-16 mx-auto mb-4
            rounded-full
            bg-accent/10
            flex items-center justify-center
          "
        >
          <MessageSquareMore className="w-7 h-7 text-accent" />
        </div>

        <h2 className="text-2xl font-bold text-text-primary">
          ورود با کد تایید
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          کد ارسال شده به شماره موبایل را وارد کنید
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">
          شماره موبایل
        </label>

        <div className="relative">
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

          <input
            type="text"
            readOnly
            value={phoneNumber}
            className="
              w-full h-12
              rounded-card
              border border-border
              bg-bg-primary
              pr-12 pl-4
              text-text-primary
              outline-none
            "
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-secondary">
          کد تایید
        </label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <ShieldCheck
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-5 h-5
                text-text-secondary
              "
            />

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کد تایید را وارد کنید"
              className="
                w-full h-12
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
          </div>

          <button
            type="button"
            onClick={resendCode}
            disabled={resendTime > 0 || loading}
            className="
              px-4
              rounded-card
              bg-primary
              text-white
              text-sm
              transition-all
              hover:bg-primary-light
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {resendTime > 0
              ? formatTime()
              : "ارسال مجدد"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={!code || loading}
        className="
          h-12
          rounded-card
          bg-accent
          text-white
          font-semibold
          transition-all
          hover:bg-accent-hover
          active:scale-[0.98]
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "در حال ورود..." : "ورود به حساب"}
      </button>

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={() => changePage("password")}
          className="
            flex items-center justify-center gap-2
            text-sm
            text-text-secondary
            hover:text-accent
            transition-all
          "
        >
          <LockKeyhole className="w-4 h-4" />
          ورود با رمز عبور
        </button>

        <button
          type="button"
          onClick={() => changePage("first")}
          className="
            flex items-center justify-center gap-2
            text-sm
            text-text-secondary
            hover:text-accent
            transition-all
          "
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت
        </button>
      </div>
    </form>
  </div>
);
}
