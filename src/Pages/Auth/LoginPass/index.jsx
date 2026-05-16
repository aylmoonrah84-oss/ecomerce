import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import fetchData from '../../../Utils/fetchData';
import notify from '../../../Utils/notify';
import { login } from '../../../Store/Slices/AuthSlice';

export default function LoginPass({ phoneNumber, changePage }) {
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
      body: JSON.stringify({ phoneNumber, password }),
    });

    notify(result.success ? "success" : "error", result.message);

    if (result.success) dispatch(login(result.data));

    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className='text-right font-sans'>

      <span onClick={() => changePage("forget")}>برگشت</span>

      <input type='text'
        value={phoneNumber}
        readOnly
        className='' />

      <input type="password"
        value={password} onChange={(e) => setPassword(e.target.value)}
        placeholder='رمز خود را وارد کنید'
        className='' />

      <button
        disabled={loading || !phoneNumber || !password}
        type='submit'
        className=''>
        ورود
      </button>
      <span onClick={handeleOtp}>  ورود با پیامک</span>
      <span onClick={() => ChangePage("forget")}>فراموشی رمز؟</span>
    </form>
  );
}
