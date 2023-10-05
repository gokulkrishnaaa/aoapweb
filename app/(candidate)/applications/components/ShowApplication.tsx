import React from "react";
import AeeeWrapper from "./AeeeWrapper";
import { redirect } from "next/navigation";

const ShowApplication = ({ application }) => {
  if (application.status != "PENDING") {
    redirect(`/applications/${application.id}`);
  }

  return <AeeeWrapper application={application} />;
};

export default ShowApplication;
