import DataLoader from "@/app/components/DataLoader";
import { ExamStatus } from "@/app/data/admin/examenums";
import { getExamsByEntrance } from "@/app/data/entranceclient";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import v from "voca";

const ExamUpdate = ({ entrance }) => {
  const { data: exams, isLoading: examsLoading } = useQuery({
    queryKey: ["exam", entrance.id],
    queryFn: () => getExamsByEntrance(entrance.id),
  });
  console.log("entrance", entrance);
  console.log("exams", exams);

  return (
    <div>
      <h2 className="block text-sm font-bold leading-6 text-gray-900">
        {entrance.code.toUpperCase()} - {entrance.name}
      </h2>
      <div className="my-3">
        <button
          type="button"
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Create New Exam
        </button>
      </div>
      <div>
        {examsLoading ? (
          <DataLoader />
        ) : exams.length > 0 ? (
          <div>
            <p>{exams[0].description}</p>
            <select
              onChange={(e) => changeStatus(exams[0])}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
            >
              {Object.keys(ExamStatus).map((key) => (
                <option key={key} value={key}>
                  {v.capitalize(key.toLowerCase())}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>No Exams</p>
        )}
      </div>
      <div>
        <h2 className="block text-sm font-bold leading-6 text-gray-900">
          Previous Exams
        </h2>
        {examsLoading ? (
          <DataLoader />
        ) : exams.length > 2 ? (
          <ul>
            {exams.map((exam, idx) => {
              if (idx != 0) {
                return <li key={exam.id}>{exam.status}</li>;
              }
            })}
          </ul>
        ) : (
          <p>No Exams</p>
        )}
      </div>
    </div>
  );
};

export default ExamUpdate;
