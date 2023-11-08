"use client";
import React, { useState } from "react";
import ReportWrapper from "./reportwrapper";

const reportSections = [
  { id: 1, name: "UTM" },
  { id: 2, name: "State" },
  { id: 3, name: "District" },
];

const MainDash = () => {
  const [sectionId, setSectionId] = useState(1);
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Reports
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select
              </label>
              <div className="relative mt-2">
                <div className="">
                  <select
                    onChange={(e) => {
                      setSectionId(parseInt(e.target.value));
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                  >
                    {reportSections &&
                      reportSections.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        <ReportWrapper section={sectionId} />
      </div>
    </div>
  );
};

export default MainDash;
