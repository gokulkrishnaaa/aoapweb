import React from "react";
import UTMReports from "./utm";

const ReportWrapper = ({ section }) => {
  console.log(section);

  switch (section) {
    case 1:
      return <UTMReports />;
    default:
      return <p>Section not found</p>;
  }
};

export default ReportWrapper;
