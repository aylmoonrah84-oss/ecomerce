import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import useFormFields from "../../../Hooks/userFormFields";
import {
  Phone,
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

export default function ForgetPass({ changePage, changePhone }) {
  const [resendTime, setResendTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const [fields, handeleChange, setFields] = useFormFields({
    phoneNumber: "",
    code: "",
    newPassword: "",
    confrimPassword: "",
  });

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

    setFields({
      ...fields,
      code: "",
    });

    const result = await fetchData("auth/resend-code", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: fields.phoneNumber,
      }),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) {
      setResendTime(120);
    }

    setLoading(false);
  };

  const handeleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await fetchData("auth/forget-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) {
      changePhone(fields.phoneNumber);
      changePage("password");
    }

    setLoading(false);
  };

  const isSubmitDisabled =
    !fields.newPassword ||
    !fields.confrimPassword ||
    loading ||
    !fields.code ||
    !fields.phoneNumber ||
    fields.newPassword !== fields.confrimPassword;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <form
        onSubmit={handeleSubmit}
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
            بازیابی رمز عبور
          </h2>

          <p className="text-sm text-text-secondary mt-2">
            اطلاعات زیر را وارد کنید
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
              name="phoneNumber"
              value={fields.phoneNumber}
              onChange={handeleChange}
              placeholder="0912xxxxxxx"
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

        {/* Code */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            کد تایید
          </label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                name="code"
                value={fields.code}
                onChange={handeleChange}
                placeholder="کد ارسال شده"
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
            </div>

            <button
              type="button"
              onClick={resendCode}
              disabled={resendTime > 0 || loading}
              className="
                px-4
                rounded-card
                bg-primary
                text-text-light
                text-sm
                hover:bg-primary-light
                transition-all
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
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            رمز جدید
          </label>

          <div className="relative">
            <input
              type="password"
              name="newPassword"
              value={fields.newPassword}
              onChange={handeleChange}
              placeholder="رمز جدید"
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            تکرار رمز عبور
          </label>

          <div className="relative">
            <input
              type="password"
              name="confrimPassword"
              value={fields.confrimPassword}
              onChange={handeleChange}
              placeholder="تکرار رمز عبور"
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

        {/* Error */}
        {fields.newPassword &&
          fields.confrimPassword &&
          fields.newPassword !== fields.confrimPassword && (
            <span className="text-sm text-danger text-center">
              رمزها باهم مطابقت ندارند
            </span>
          )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
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
            ? "در حال پردازش..."
            : "تغییر رمز عبور"}
        </button>

        {/* Back */}
        <button
          type="button"
          onClick={() => changePage("login")}
          className="
            flex items-center justify-center gap-2
            text-sm
            text-text-secondary
            hover:text-accent
            transition-all
          "
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به ورود
        </button>
      </form>
    </div>
  )
};