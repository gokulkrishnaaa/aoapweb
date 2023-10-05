import { getApplicationById } from "@/app/data/application";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }) => {
  let application = await getApplicationById({ applicationid: params.applnid });
  if (!application) {
    redirect("/applications");
  }
  console.log(application);

  return <div>{application.candidate.fullname}</div>;
};

export default Page;
