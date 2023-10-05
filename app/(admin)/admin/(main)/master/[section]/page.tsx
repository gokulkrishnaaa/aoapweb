import React from "react";
import Gender from "../components/gender";
import Exam from "../components/exam";

const Page = ({ params }) => {
  switch (params.section) {
    case "gender":
      return <Gender />;
    case "exam":
      return <Exam />;
    default:
      return <div>Section does not exists</div>;
  }
};

export default Page;
