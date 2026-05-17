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

}
