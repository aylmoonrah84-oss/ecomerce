import React, { useState } from 'react'
import fetchData from '../../../Utils/fetchData'
import notify from '../../../Utils/notify';

export default function FirstStep({phoneNumber,changePhone,changePage}) {
    const[loading,setIsLoading]=useState('false');
    const handelSubmit=async(e)=>{
        e.preventDefult()
        setIsLoading(true);
        const result= await fetchData("auth",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(phoneNumber),
        });
        notify(result.success?"success":"error",result.massage);
        if(result.success){
            changePage(result.data.passwordExist ? "password":"otp");
        }
        setIsLoading(false);
    }
  return (
    <form  onSubmit={handelSubmit}className='text-right'>
      <h2>ورود یا ثبت نام</h2>
      <input type="text"
       placeholder='شماره خود را وارد کنید' 
       name=''
       value={phoneNumber}
       onChange={(e)=>changePhone(e.target.value)}
       id=''
       />
      <button disabled={loading||!phoneNumber} type='submit'>ورود</button>
      <span onClick={()=>changePage('forget')}>فراموشی رمز</span>
    </form>
  );
}
