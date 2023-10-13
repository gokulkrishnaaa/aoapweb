"use client";
import OtpTimer from "@/app/(landing)/components/otptimer";
import DataLoader from "@/app/components/DataLoader";
import createCandidateParent from "@/app/data/createCandidateParent";
import sendEmailOtp from "@/app/data/emailotp";
import sendPhoneOtp from "@/app/data/phoneotp";
import updateOnboarding from "@/app/data/updateOnboarding";
import verifyEmailOtp from "@/app/data/verifyEmailOtp";
import verifyPhoneOtp from "@/app/data/verifyPhoneOtp";
import { isValidEmail } from "@/app/utilities/checkemail";
import isValidPhone from "@/app/utilities/checkphone";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const ParentInfoSchmema = yup.object().shape({
  fullname: yup.string().required("Name Required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required").email("Enter Valid Email"),
});

const ParentsInfo = ({ showNext }) => {
  const [parentEmail, setParentEmail] = useState("");
  const [emailverified, setEmailVerified] = useState("");
  const [otpEmailMode, setOtpEmailMode] = useState(false);
  const [mailOtpResend, setMailOtpResend] = useState(false);
  const [mailOtpVerifying, setMailOtpVerifying] = useState(false);
  const [mailOtpFetching, setMailOtpFetching] = useState(false);
  const [mailOtpError, setMailOtpError] = useState("");
  const [mailOtp, setMailOtp] = useState("");

  const [parentPhone, setParentPhone] = useState("");
  const [phoneverified, setPhoneVerified] = useState("");
  const [otpPhoneMode, setOtpPhoneMode] = useState(false);
  const [phoneOtpResend, setPhoneOtpResend] = useState(false);
  const [phoneOtpVerifying, setPhoneOtpVerifying] = useState(false);
  const [phoneOtpFetching, setPhoneOtpFetching] = useState(false);
  const [phoneOtpError, setPhoneOtpError] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  function emailOnChange(e) {
    setParentEmail(e.target.value);
    setEmailVerified("");
  }

  function phoneOnChange(e) {
    setParentPhone(e.target.value);
    setPhoneVerified("");
  }

  async function sendMailOtp(e) {
    if (isValidEmail(parentEmail)) {
      setMailOtpError("");
      setMailOtpFetching(true);
      let status = await sendEmailOtp({ email: parentEmail });
      setMailOtpFetching(false);
      if (status) {
        setOtpTimer();
        setOtpEmailMode(true);
      }
    } else {
      setMailOtpError("Invalid Email");
    }
  }

  async function sendPhoneNoOtp(e) {
    if (isValidPhone(parentPhone)) {
      setPhoneOtpError("");
      setPhoneOtpFetching(true);
      let status = await sendPhoneOtp({ phone: parentPhone });
      setPhoneOtpFetching(false);
      if (status) {
        setOtpTimer();
        setOtpPhoneMode(true);
      }
    } else {
      setPhoneOtpError("Invalid Phone");
    }
  }

  async function verifyEmail(e) {
    e.preventDefault();
    setMailOtpVerifying(true);
    const status = await verifyEmailOtp({ email: parentEmail, otp: mailOtp });
    setMailOtpVerifying(false);
    if (status) {
      setEmailVerified(new Date().toISOString());
      setMailOtpError("");
      setOtpEmailMode(false);
      setMailOtpResend(false);
      clearErrors("emailverified");
    } else {
      setMailOtpError("Verification Failed");
    }
  }

  async function verifyPhone(e) {
    e.preventDefault();
    setPhoneOtpVerifying(true);
    const status = await verifyPhoneOtp({ phone: parentPhone, otp: phoneOtp });
    setPhoneOtpVerifying(false);
    if (status) {
      setPhoneVerified(new Date().toISOString());
      setPhoneOtpError("");
      setOtpPhoneMode(false);
      setPhoneOtpResend(false);
    } else {
      setPhoneOtpError("Verification Failed");
    }
  }

  function setOtpTimer() {
    setMailOtpResend(false);
    setTimeout(() => {
      setMailOtpResend(true);
    }, 60000);
  }

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(ParentInfoSchmema)(data, context, options)
      );
      return yupResolver(ParentInfoSchmema)(data, context, options);
    },
  });
  //   console.log(errors);
  const onSubmit = async (data) => {
    clearErrors("emailverified");
    if (emailverified != "") {
      const res = await createCandidateParent(data);
      const onboarding = await updateOnboarding({
        data: { current: 3 },
      });
      showNext();
    }
    setError("emailverified", {
      type: "custom",
      message: "Email is not verified",
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Parent’s / Guardians Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter details of you parent or guardian.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="fullname"
                  {...register("fullname")}
                  autoComplete="fullname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
                {errors["fullname"] && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors["fullname"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["fullname"].message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="flex gap-2">
                <div className="relative mt-2 flex-1">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        value={parentEmail}
                        disabled={emailverified != ""}
                        onChange={(e) => {
                          emailOnChange(e);
                          field.onChange(e);
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                    )}
                  />
                  {(errors["email"] || errors["emailverified"]) && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <div className="self-center mt-2">
                  {emailverified != "" ? (
                    <CheckBadgeIcon
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : otpEmailMode ? (
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  ) : mailOtpFetching ? (
                    <DataLoader size="xs" />
                  ) : (
                    <Link
                      href="#"
                      onClick={sendMailOtp}
                      className="text-sm font-semibold text-pink-600 hover:text-pink-500"
                    >
                      Verify
                    </Link>
                  )}
                </div>
              </div>
              {otpEmailMode && (
                <div className="py-2 text-sm">
                  <div className="py-4 text-right">
                    {mailOtpResend ? (
                      mailOtpFetching ? (
                        <DataLoader size="xs" />
                      ) : (
                        <Link
                          href="#"
                          onClick={sendMailOtp}
                          className="text-sm font-semibold text-pink-600 hover:text-pink-500"
                        >
                          Resend
                        </Link>
                      )
                    ) : (
                      <OtpTimer />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <input
                      type="text"
                      value={mailOtp}
                      onChange={(e) => setMailOtp(e.target.value)}
                      placeholder="Otp to verify email"
                      className="flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      onClick={verifyEmail}
                      className="rounded-md border border-pink-600 px-3 py-2 text-sm font-semibold text-pink-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                    >
                      {mailOtpVerifying ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}
              {mailOtpError === "" ? null : (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {mailOtpError}
                </p>
              )}
              {(errors["email"] || errors["emailverified"]) && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["email"]
                    ? errors["email"].message
                    : errors["emailverified"]
                    ? errors["emailverified"].message
                    : null}
                </p>
              )}
            </div>

            <div className="relative sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="flex gap-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="phonecode"
                      {...register("phonecode")}
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm"
                    >
                      <option value="+91">+91</option>
                    </select>
                  </div>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        value={parentPhone}
                        disabled={phoneverified != ""}
                        onChange={(e) => {
                          phoneOnChange(e);
                          field.onChange(e);
                        }}
                        className="block pl-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                    )}
                  />
                  {(errors["phone"] || errors["phoneverified"]) && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <div className="self-center mt-2">
                  {phoneverified != "" ? (
                    <CheckBadgeIcon
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : otpPhoneMode ? (
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  ) : phoneOtpFetching ? (
                    <DataLoader size="xs" />
                  ) : (
                    <Link
                      href="#"
                      onClick={sendPhoneNoOtp}
                      className="text-sm font-semibold text-pink-600 hover:text-pink-500"
                    >
                      Verify
                    </Link>
                  )}
                </div>
              </div>
              {otpPhoneMode && (
                <div className="py-2 text-sm">
                  <div className="py-4 text-right">
                    {phoneOtpResend ? (
                      phoneOtpFetching ? (
                        <DataLoader size="xs" />
                      ) : (
                        <Link
                          href="#"
                          onClick={sendPhoneNoOtp}
                          className="text-sm font-semibold text-pink-600 hover:text-pink-500"
                        >
                          Resend
                        </Link>
                      )
                    ) : (
                      <OtpTimer />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <input
                      type="text"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      placeholder="Otp to verify Phone"
                      className="flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      onClick={verifyPhone}
                      className="rounded-md border border-pink-600 px-3 py-2 text-sm font-semibold text-pink-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                    >
                      {phoneOtpVerifying ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}
              {phoneOtpError === "" ? null : (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {phoneOtpError}
                </p>
              )}
              {(errors["phone"] || errors["phoneverified"]) && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["phone"]
                    ? errors["phone"].message
                    : errors["phoneverified"]
                    ? errors["phoneverified"].message
                    : null}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          {isSubmitting ? "Processing..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default ParentsInfo;
