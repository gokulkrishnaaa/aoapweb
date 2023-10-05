import React from "react";
import BreadCrumbs from "../../../components/breadcrumbs";
import { checkExamValid } from "@/app/data/entrance";
import Link from "next/link";

import {
  createApplication,
  getApplicationByExam,
} from "@/app/data/application";
import ShowApplication from "../../components/ShowApplication";

const Page = async ({ params }) => {
  console.log(params);

  const { valid } = await checkExamValid({
    examid: params.examid,
    code: "aeee",
  });

  let application = await getApplicationByExam({ examid: params.examid });
  if (!application) {
    application = await createApplication({ examId: params.examid });
  }

  console.log(application);

  return (
    <div>
      <BreadCrumbs />
      <div className="h-6"></div>
      {!valid ? (
        <p>
          This is not a valid exam.{" "}
          <Link href="/dashboard">Go To Dashboard</Link>
        </p>
      ) : (
        <ShowApplication application={application} />
      )}
    </div>
  );
};

export default Page;
