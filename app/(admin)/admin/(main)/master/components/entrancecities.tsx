"use client";
import DataLoader from "@/app/components/DataLoader";
import {
  addCityForEntrance,
  removeCityForEntrance,
  updateCityForEntrance,
} from "@/app/data/admin/examcity";
import {
  CheckIcon,
  ExclamationCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Confirmation from "../../../components/confirmation";
import { Spinner } from "flowbite-react";
import { getEntrances } from "@/app/data/entranceclient";
import { getExamCities } from "@/app/data/applicationclient";
import { getCities } from "@/app/data/admin/city";
import EntranceCity from "./entrancecity";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EntranceCities() {
  const [entranceId, setEntranceId] = useState(null);
  const queryClient = useQueryClient();

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  const {
    data: cities,
    isLoading: citiesLoading,
    isFetching: citiesFetching,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getCities(),
    enabled: !!entranceId,
  });

  const {
    data: entrancecities,
    isLoading: encitiesLoading,
    isFetching: encitiesFetching,
  } = useQuery({
    queryKey: ["entrancecities", entranceId],
    queryFn: () => getExamCities(entranceId),
    enabled: !!entranceId,
  });

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Cities for Entrances
          </h2>

          <div className="space-y-5">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Entrance{" "}
                {entrancesLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="relative mt-2">
                <select
                  onChange={(e) => {
                    setEntranceId(e.target.value);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="">--Select--</option>
                  {entrances &&
                    entrances.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.code.toUpperCase()}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg max-w-2xl">
          {citiesFetching || encitiesFetching ? (
            <div>
              <div className="py-6 flex justify-center">
                <DataLoader />
              </div>
            </div>
          ) : !cities ? (
            <p className="py-10 px-4 text-center">Select Entrance</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cities.map((item) => {
                  return (
                    <EntranceCity
                      key={item.id}
                      city={item}
                      encities={entrancecities}
                      entranceId={entranceId}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
