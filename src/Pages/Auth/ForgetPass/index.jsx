import React, { useEffect, useState } from 'react'
import fetchData from '../../../Utils/fetchData';
import notify from '../../../Utils/notify';
import useFormFields from '../../../Hooks/userFormFields';

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
    const timer = setInterval(() => setResendTime((s) => 5 - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTime]);
  const resendCode = async () => {
    setLoading(true);
    setFields({ ...fields, code: "" });
    const result=await fetchData("auth/resend-code",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body: JSON.stringify({phoneNumber:fields.phoneNumber}),
    });
    notify(result.success ? "success":"error",result.message);
    if(result.success)setResendTime(120);
    setLoading(false);
  };
  const handeleSubmit = async(e)=>{
    e.pereventDefult();
    setLoading(true);

    const result=await fetchData("auth/forget-password",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body: JSON.stringify(fields),
    });
    notify(result.success ?"success":"error",result.message);
    if(result.success){
      changePhone(fields.phoneNumber);
      changePage("password");
        }
        setLoading(false);
  };
  const isSubmitDisabled=
  !fields.newPassword ||
  !fields.confrimPassword ||
  loading ||
  !fields.code||
  !fields.phoneNumber ||
  fields.newPassword !== fields.confrimPassword;
  return (
    <form onSubmit={handeleSubmit}>
      <h2>پسورد جدید</h2>
      <input type="text" name='phoneNumber'
       value={fields.phoneNumber}
      onChange={handeleChange}
      placeholder='شماره تلفن'
      />
      <div>
        <input type="text" value={fields.code} onChange={handeleChange}
        name="code"
        placeholder='رمز مجدد را وارد کنید'
         id="" />
         <button type='button'
         onClick={resendCode}
         disabled={resendTime > 0}>
{resendTime > 0 ? formatTime():"Resend Code"}
         </button>
      </div>
      <input type="password" name="newPassword" value={fields.newPassword}
      onChange={handeleChange}
      placeholder='رمز جدید' />
      <button type='submit' disabled={isSubmitDisabled}>
{loading ? "processing..":"change password"}
      </button>

    </form>
  );
}
