import { getApplicationById } from "@/app/data/application";
import { redirect } from "next/navigation";
import React from "react";
import AeeeWrapper from "../components/AeeeWrapper";
import AeeeRegistration from "../components/aeeeregistration";

const Page = async ({ params }) => {
  let application = await getApplicationById({ applicationid: params.applnid });

  if (!application) {
    redirect("/applications");
  }

  if (application.status === "PENDING") {
    return <AeeeWrapper application={application} />;
  } else if (application.status === "APPLIED") {
    return <AeeeRegistration application={application} />;
  } else if (
    application.status === "REGISTERED" ||
    application.status === "SLOT" ||
    application.status === "ADMIT" ||
    application.status === "RANK"
  ) {
    <p>Registered for</p>;
  }

  return <p>Application details not found</p>;
};

export default Page;
