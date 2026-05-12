import React, { useState } from 'react'
import fetchData from '../../../Utils/fetchData'
import notify from '../../../Utils/notify';

export default function FirstStep({ phoneNumber, changePhone, changePage }) {
  const [loading, setIsLoading] = useState('false');
  const handelSubmit = async (e) => {
    e.preventDefult()
    setIsLoading(true);
    const result = await fetchData("auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(phoneNumber),
    });
    notify(result.success ? "success" : "error", result.massage);
    if (result.success) {
      changePage(result.data.passwordExist ? "password" : "otp");
    }
    setIsLoading(false);
  }
  return (
    <form onSubmit={handelSubmit} className=' font-sans dark:dark text-right w-full max-w-md mx-auto mt-16 p-8 rounded-2xl 
    backdrop-blur-xl bg-[#FAE8FF] border-white/30 flex flex-col gap-6 animate-fadeIn'>
      <h2 className='text-2xl font-bold text-center text-gray-800 drop-shadow-md' >ورود یا ثبت نام</h2>
      <input type="text"
        placeholder='....شماره خود را وارد کنید'
        name=''
        value={phoneNumber}
        onChange={(e) => changePhone(e.target.value)}
        id=''
        className="w-full px-4 py-3 rounded-xl bg-white/40 border border-gray-300
         focus:border-blue-500 focus:ring-2
         focus:ring-blue-300 outline-none transition-all duration-300
          placeholder-gray-500 text-gray-800"
      />


      <button
        disabled={loading || !phoneNumber}
        type="submit"
        className={`w-full py-3 rounded-xl border-black text-black font-semibold transition-all duration-300 shadow-lg
          
            : "bg-blue-600 hover:bg-blue-500 hover:shadow-xl active:scale-[0.98]"
          }`}
      >
        ورود
      </button>
      <span onClick={() => changePage('forget')}
        className="text-blue-700 text-sm 
        text-center cursor-pointer hover:underline
         hover:text-blue-900 transition">
        فراموشی رمز
      </span>
    </form>
  );
}
