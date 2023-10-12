import DataLoader from "@/app/components/DataLoader";
import { getExamsByEntrance } from "@/app/data/entranceclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import v from "voca";
import CreateExam from "./createexam";
import UpdateExam from "./updateexam";

const ExamUpdate = ({ entrance }) => {
  const [createMode, setcreateMode] = useState(false);
  const [updateExam, setUpdateExam] = useState(null);
  const queryClient = useQueryClient();
  const { data: exams, isLoading: examsLoading } = useQuery({
    queryKey: ["exam", entrance.id],
    queryFn: () => getExamsByEntrance(entrance.id),
  });

  function handleCreateComplete(data) {
    setcreateMode(false);
    queryClient.invalidateQueries(["exam", entrance.id]);
  }

  function handleUpdateComplete(data) {
    setUpdateExam(null);
    queryClient.invalidateQueries(["exam", entrance.id]);
  }

  return (
    <div>
      <h2 className="block text-sm font-bold leading-6 text-gray-900">
        {entrance.code.toUpperCase()} - {entrance.name}
      </h2>
      {createMode ? (
        <CreateExam entrance={entrance} completeCreate={handleCreateComplete} />
      ) : updateExam ? (
        <UpdateExam exam={updateExam} completeUpdate={handleUpdateComplete} />
      ) : (
        <>
          <div className="my-3">
            <button
              type="button"
              onClick={() => setcreateMode(true)}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Create New Exam
            </button>
          </div>
          <div>
            {examsLoading ? (
              <DataLoader />
            ) : exams.length > 0 ? (
              <div className="bg-white border shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Active Exam
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      <span className="font-semibold">Description:</span>{" "}
                      {exams[0].description}.
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {v.capitalize(exams[0].status.toLowerCase())}.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setUpdateExam(exams[0])}
                      className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                    >
                      Update Exam
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p>No Exams</p>
            )}
          </div>
          <div className="mt-10">
            <h2 className="block text-sm font-bold leading-6 text-gray-900">
              Previous Exams
            </h2>
            {examsLoading ? (
              <DataLoader />
            ) : exams.length > 1 ? (
              <ul role="list" className="my-4 divide-y divide-gray-100 border">
                {exams.map((exam, idx) => {
                  if (idx != 0) {
                    return (
                      <li
                        className="flex justify-between gap-x-6 p-5"
                        key={exam.id}
                      >
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm leading-6 text-gray-900">
                            <span className="font-semibold">Description :</span>{" "}
                            {exam.description}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            <span className="font-semibold">Status:</span>{" "}
                            {v.capitalize(exam.status.toLowerCase())}.
                          </p>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            ) : (
              <p>No Exams</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExamUpdate;
