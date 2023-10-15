"use client";
import {
  getApplicationJeeStatus,
  getCityByApplication,
  getProgrammesByApplication,
} from "@/app/data/applicationclient";

import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import CompleteRegistration from "./completeregistration";

export default function AeeeRegistration({ application }) {
  const router = useRouter();

  const { data: applicationCities, isLoading: applicationCitiesLoading } =
    useQuery({
      queryKey: ["cities", application.id],
      queryFn: () => getCityByApplication(application.id),
    });

  const { data: jeestatus, isLoading: jeeStatusLoading } = useQuery({
    queryKey: ["application", application.id, "jee"],
    queryFn: () => getApplicationJeeStatus(application.id),
  });

  const { data: selectedProgrammes, isLoading: selProgrammesLoading } =
    useQuery({
      queryKey: ["application", application.id, "programme"],
      queryFn: () => getProgrammesByApplication(application.id),
    });

  const registration = application.Registration[0];

  return (
    <>
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl">
        {registration ? (
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Registration No : {registration.registrationNo}
            </h3>
          </div>
        ) : (
          <CompleteRegistration application={application} />
        )}

        <div className="mt-6 border-t border-gray-200">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Entrance Exam
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.exam.entrance.code.toUpperCase()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                City
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {applicationCitiesLoading ? (
                  <p>Loading ...</p>
                ) : applicationCities.length < 1 ? (
                  <p>No cities selected</p>
                ) : (
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
                            <span className="truncate">
                              {city.examcity.name}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Do you want to consider based on the JEE CRL Rank?
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {jeeStatusLoading ? (
                  <p>Loading...</p>
                ) : jeestatus.jee ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Selected Programs
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {selProgrammesLoading ? (
                  <p>Loading ...</p>
                ) : selectedProgrammes.length < 1 ? (
                  <p>No programmes selected</p>
                ) : (
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {selectedProgrammes.map((programme) => (
                      <li
                        key={programme.id}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate">
                              {`${programme.programme.course.name} - ${programme.programme.campus.name}`}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
