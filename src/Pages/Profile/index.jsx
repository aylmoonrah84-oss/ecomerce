import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fetchData from "../../Utils/fetchData";
import { updateUser } from "../../Store/Slices/AuthSlice";
import notify from "../../Utils/notify";

import {
  User,
  LockKeyhole,
  Save,
} from "lucide-react";

export default function Profile() {
  const { user, token } =
    useSelector((state) => state.auth);

  const [fullName, setFullName] =
    useState(user.fullName);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await fetchData(
      `users/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type":
            "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
        }),
      }
    );

    if (result.success) {
      dispatch(updateUser(result.data));
    }

    notify(
      result.success
        ? "success"
        : "error",
      result.message
    );

    setLoading(false);
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result =
      await fetchData(
        `users/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-type":
              "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

    notify(
      result.success
        ? "success"
        : "error",
      result.message
    );

    setOldPassword("");
    setNewPassword("");

    setLoading(false);
  };

  return (
    <div
      className="
        max-w-6xl
        mx-auto
        px-4
        py-10
      "
    >
      <div className="mb-8">

        <span
          className="
            text-accent
            text-sm
          "
        >
          حساب کاربری
        </span>

        <h1
          className="
            mt-2
            text-3xl
            font-black
            text-text-primary
          "
        >
          تنظیمات پروفایل
        </h1>

      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >

        {/* profile */}

        <form
          onSubmit={handleUpdate}
          className="
            bg-bg-secondary
            rounded-card
            border
            border-border
            shadow-soft
            p-7
          "
        >

          <div className="flex items-center gap-3 mb-6">

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-accent/10
                flex
                items-center
                justify-center
              "
            >
              <User className="text-accent" />
            </div>

            <div>

              <h2
                className="
                  font-bold
                  text-text-primary
                "
              >
                اطلاعات حساب
              </h2>

              <p
                className="
                  text-sm
                  text-text-secondary
                "
              >
                ویرایش اطلاعات شخصی
              </p>

            </div>

          </div>

          <input
            type="text"
            required
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            placeholder="نام و نام خانوادگی"

            className="
              w-full
              h-12
              px-4
              rounded-card
              border
              border-border
              bg-bg-primary
              focus:outline-none
              focus:ring-2
              focus:ring-accent/20
              focus:border-accent
              mb-5
            "
          />

          <button
            disabled={loading}
            type="submit"
            className="
              w-full
              h-12
              rounded-card
              bg-accent
              text-white
              font-semibold
              transition
              hover:bg-accent-hover
              disabled:opacity-50
            "
          >
            {loading
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
          </button>

        </form>

        {/* password */}

        <form
          onSubmit={
            handlePassword
          }
          className="
            bg-bg-secondary
            rounded-card
            border
            border-border
            shadow-soft
            p-7
          "
        >

          <div className="flex items-center gap-3 mb-6">

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-primary/10
                flex
                items-center
                justify-center
              "
            >
              <LockKeyhole className="text-primary" />
            </div>

            <div>

              <h2
                className="
                  font-bold
                  text-text-primary
                "
              >
                تغییر رمز عبور
              </h2>

              <p
                className="
                  text-sm
                  text-text-secondary
                "
              >
                امنیت حساب خود را حفظ کنید
              </p>

            </div>

          </div>

          <input
            type="password"
            required
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
            placeholder="رمز فعلی"

            className="
              w-full
              h-12
              px-4
              rounded-card
              border
              border-border
              bg-bg-primary
              focus:outline-none
              focus:ring-2
              focus:ring-accent/20
              focus:border-accent
              mb-4
            "
          />

          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            placeholder="رمز جدید"

            className="
              w-full
              h-12
              px-4
              rounded-card
              border
              border-border
              bg-bg-primary
              focus:outline-none
              focus:ring-2
              focus:ring-accent/20
              focus:border-accent
              mb-5
            "
          />

          <button
            disabled={loading}
            type="submit"
            className="
              w-full
              h-12
              rounded-card
              bg-primary
              text-white
              font-semibold
              hover:bg-primary-light
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "در حال تغییر..."
              : "تغییر رمز"}
          </button>

        </form>

      </div>
    </div>
  );
}

