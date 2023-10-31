"use client";
import DataLoader from "@/app/components/DataLoader";
import { getUTMReport } from "@/app/data/admin/reports";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UTMReports = () => {
  const { data: utms, isLoading: utmsLoading } = useQuery({
    queryKey: ["utm"],
    queryFn: () => getUTMReport(),
  });

  console.log(utms);

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {utmsLoading ? (
            <DataLoader size="lg" />
          ) : utms && utms.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Sl.No
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Media
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Campaign
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {utms.map((utm, idx) => (
                  <tr key={utm.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {idx + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {utm.utm_source}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {utm.utm_medium}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {utm.utm_campaign}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UTMReports;
