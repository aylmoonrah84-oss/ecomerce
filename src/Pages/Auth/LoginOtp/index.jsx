import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import fetchData from '../../../Utils/fetchData';
import notify from '../../../Utils/notify';
import { login } from '../../../Store/Slices/AuthSlice';

export default function LoginOtp({phoneNumber,changePage}) {
  const[code,setCode]=useState("");
  const[loading,setLoading]=useState(false);
  const[resendTime,setResendTime]=useState(120);
  const dispatch=useDispatch();

  const formatTime=()=>{
    const min=Math.floor(resendTime / 60);
    const sec =resendTime % 60;
    return`${min}:${sec < 10 ?"0" + sec:sec}`;
  };
  useEffect(()=>{
    if(resendTime<=0)return;
    const timer =setInterval(()=>setResendTime((s)=>s -1),1000);
    return()=>clearInterval(timer);
  },[resendTime]);

  const resendCode=async()=>{
    setLoading(true);
    setCode("");
    const result=await fetchData("auth/resend-code",{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify({phoneNumber}),
    });
    notify(result.success ? "success":"error",result.massage);
    if(result.success)setResendTime(120);
    setLoading(false);
  };
  const handeleSubmit=async(e)=>{
    e.preventDefult();
    setLoading(true);
    const result=await fetchData("auth/login-otp",{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify({phoneNumber,code}),
    });
    notify(result.success ?"success":"error",result.massage);
    if(result.success)dispatch(login(result.data));
    setLoading(false);
  };
  return (
    <form onSubmit={handeleSubmit}>
      <h2>ورود با رمز یکبار مصرف</h2>
      <span onClick={()=>changePage("first")}>بازگشت</span>
      <input type="text" readOnly value={phoneNumber} />
      <div>
        <input value={code} onChange={(e)=>setCode(e.target.value) }type="text" placeholder='رمز یکبار مصرف را وارد کنید'/>
        <button type='button' onClick={resendCode} disabled={resendCode > 0}>{resendTime>0?formatTime():"Resend Code"}</button>
      </div>
      <span onClick={()=>changePage("password")}>ورود با رمز</span>
    </form>
  )
}
