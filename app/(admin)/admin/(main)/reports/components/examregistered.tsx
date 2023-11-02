"use client";
import DataLoader from "@/app/components/DataLoader";
import { getExamRegistered } from "@/app/data/admin/reports";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ExamRegistered = () => {
  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ["reports", "examregistered"],
    queryFn: () => getExamRegistered(),
  });

  console.log(reports);

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {reportsLoading ? (
            <DataLoader size="lg" />
          ) : reports && reports.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Entrance
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Exam Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.examId}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {report.entrance}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {report.exam}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {report.registered}
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

export default ExamRegistered;
