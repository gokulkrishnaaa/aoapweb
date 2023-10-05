import DataLoader from "@/app/components/DataLoader";
import { getExamCities } from "@/app/data/applicationclient";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ApplicationCities = ({
  applicationCities,
  removeCity,
  application,
  addCity,
  cityaddloading,
  cityremoveloading,
}) => {
  const { data: examcities, isLoading: examcitiesLoading } = useQuery({
    queryKey: ["examcities"],
    queryFn: () => getExamCities(application.exam.entranceId),
  });

  function handleRemove(city) {
    removeCity(city);
  }

  function citySelected(e) {
    addCity(e.target.value);
  }
  console.log("cityaddloading", cityaddloading);

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 rounded-md border border-gray-200"
    >
      {applicationCities.map((city) => (
        <li
          key={city.id}
          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
        >
          <div className="flex w-0 flex-1 items-center">
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">{city.examcity.name}</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => handleRemove(city)}
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
      {examcitiesLoading ? null : applicationCities.length < 3 ? (
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="ml-4 flex-shrink-0">
            <div className="flex items-baseline gap-3">
              {cityaddloading ? (
                <DataLoader size="xs" />
              ) : (
                <select
                  id="location"
                  name="location"
                  onChange={citySelected}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={0}>--All--</option>
                  {examcities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </li>
      ) : null}
    </ul>
  );
};

export default ApplicationCities;
