import React from "react";
import Gender from "../components/gender";

const Page = ({ params }) => {
  switch (params.section) {
    case "gender":
      return <Gender />;
    default:
      return <div>Section does not exists</div>;
  }
};

export default Page;
