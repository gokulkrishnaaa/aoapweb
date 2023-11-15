import DataLoader from "@/app/components/DataLoader";
import { getActiveAeeeForJee } from "@/app/data/jee";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import JeeCreateForm from "./jeecreateform";

const JeeCreate = () => {
  const { data: aeee, isLoading: aeeeLoading } = useQuery({
    queryKey: ["jee", "aeee"],
    queryFn: () => getActiveAeeeForJee(),
  });

  return (
    <div>
      {aeeeLoading ? (
        <DataLoader />
      ) : aeee && aeee.Exam.length > 0 ? (
        <JeeCreateForm exam={aeee.Exam[0]} />
      ) : (
        <p>
          No Active AEEE to create JEE. Please create an active AEEE and check
        </p>
      )}
    </div>
  );
};

export default JeeCreate;
