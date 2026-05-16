import React, { useState } from 'react'
import fetchData from '../../../Utils/fetchData'
import notify from '../../../Utils/notify';

export default function FirstStep({ phoneNumber, changePhone, changePage }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await fetchData("auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({phoneNumber}),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) {
      changePage(result.data.passwordExist ? "password" : "otp");
    }

    setLoading(false);
  };
  return (

    <form
      onSubmit={handleSubmit}
      className="
    font-sans text-right w-full max-w-md mx-auto mt-16 p-8 rounded-2xl
    backdrop-blur-xl
    bg-bg
    border border-primary
    shadow-xl
    flex flex-col gap-6
    transition-all duration-300
    dark:bg-gray-800/70 dark:border-gray-700
    "
    >
      <h2
        className="
      text-2xl font-bold text-center
      text-gray-800 dark:text-white
      "
      >
        ورود یا ثبت نام
      </h2>

      <input
        type="text"
        placeholder="....شماره خود را وارد کنید"
        value={phoneNumber}
        onChange={(e) => changePhone(e.target.value)}
        className="
      w-full px-4 py-3 rounded-xl
      bg-white
      border border-[var(--color-primary)]
      text-gray-800
      placeholder-gray-400
      focus:border-[var(--color-secondary)]
      focus:ring-2 focus:ring-[var(--color-secondary)]
      outline-none
      transition-all duration-300
      dark:bg-gray-900/60 dark:border-gray-600 dark:text-white
      "
      />

      <button
        disabled={loading || !phoneNumber}
        type="submit"
        className="
      w-full py-3 rounded-xl
      font-semibold
      text-gray-900
      bg-[var(--color-primary)]
      hover:bg-[var(--color-third)]
      transition-all duration-300
      shadow-md hover:shadow-lg
      active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed
      dark:text-gray-900
      "
      >
        ورود
      </button>

      <span
        onClick={() => changePage("forget")}
        className="
      text-sm text-center cursor-pointer
      text-[var(--color-secondary)]
      hover:text-[var(--color-third)]
      transition
      "
      >
        فراموشی رمز
      </span>
    </form>
  );


}
