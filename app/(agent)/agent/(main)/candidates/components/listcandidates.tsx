"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { UserContext } from "../../components/UserProvider";
import { getCandidatesByAgent } from "@/app/data/agent/candidate";
import DataLoader from "@/app/components/DataLoader";
import Link from "next/link";

const ListCandidates = () => {
  const agent = useContext(UserContext);

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["agent", agent.id, "candidates"],
    queryFn: () => getCandidatesByAgent(agent.id),
  });
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <h3 className="font-semibold flex justify-between items-baseline">
            Count : {candidates && candidates.length}
          </h3>
          <div className="h-4"></div>
          {isLoading ? (
            <DataLoader size="lg" />
          ) : candidates && candidates.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Phone
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.fullname ? candidate.fullname : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.email ? candidate.email : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.phone ? candidate.phone : "nil"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link
                        href={`/agent/candidate/${candidate.id}`}
                        className="font-semibold text-pink-600"
                      >
                        {candidate.Onboarding.status
                          ? "Show"
                          : "Complete Profile"}
                      </Link>
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

export default ListCandidates;
