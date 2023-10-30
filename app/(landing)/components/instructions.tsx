import React from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Instructions = () => {
  return (
    <div className="bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1
          id="admissioninstructions"
          className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Instructions
        </h1>
        <p className="mt-6 text-xl leading-8">
          Directorate of Admissions & Academic Outreach at Amrita Vishwa
          Vidyapeetham conducts entrance examinations every year for admission
          to all the undergraduate programmes.
        </p>
        <div className="mt-10 max-w-2xl space-y-5">
          <p>
            Prospective candidates are hereby informed that this is the only
            portal to register for the entrance examinations conducted by
            Directorate of Admissions & Academic Outreach, Amrita Vishwa
            Vidyapeetham for admission to various undergraduate and integrated
            programmes offered at all the campuses.
          </p>
          <p>
            There are no agents or agencies entrusted by the Directorate of
            Admissions to offer any admissions on behalf of the university.
          </p>
          <p>
            Steps to complete your Registration for Amrita Entrance
            Examinations:
          </p>
          <div>
            <p className="font-bold">Step 1 :</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    1
                  </span>
                </p>
                <span>
                  Enter your Email ID OR Mobile Number to get OTP. Note that,
                  this Email ID OR Mobile Number will be used as the primary
                  channel for all the communications from Directorate of
                  Admissions.
                </span>
              </li>
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    2
                  </span>
                </p>
                <span>
                  After logging into the portal, fill the basic details like
                  full name as per the records, date of birth, social status,
                  contact details, aadhaar number, etc.
                </span>
              </li>
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    3
                  </span>
                </p>
                <span>
                  Upload your latest photograph. The application may get
                  rejected even after paying the registration fee if the
                  photograph is found to be unclear. Signature in digital format
                  also needs to be uploaded.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Step 2 :</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    1
                  </span>
                </p>
                <span>
                  Enter the name, Email ID & Mobile number to proceed further.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Step 3 :</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    1
                  </span>
                </p>
                <span>Select the state from where you studied +2</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="mt-8">Now you have completed your profile entry.</p>
            <p className="mt-8">
              Next is to choose the entrance examination you wish to attend by
              clicking on the “Apply” button.
            </p>
            <p className="mt-8">
              In Step 1, choose 3 cities to attend the entrance. Note that you
              are required to choose 3 cities. If you wish to seek admission
              based on JEE Mains 2024 Percentile also, check the option. You may
              check this option later too.
            </p>
            <p className="mt-8">
              Next is to complete your payment and you are done with the
              registration!
            </p>
            <p className="mt-8 italic">
              <span className="font-bold text-lg text-red-600">*</span> Once you
              receive the welcome email, mark it as “Not Spam” or “Important” so
              that the future email communication doesn’t go to the Spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
