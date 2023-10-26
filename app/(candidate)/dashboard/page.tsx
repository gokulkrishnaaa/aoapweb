import React from "react";
import ActiveApplicationsPanel from "../applications/components/activeapplications";
import DashProfile from "../applications/components/dashprofile";

const Page = () => {
  return (
    <>
      <DashProfile />
      <div className="h-4"></div>
      <ActiveApplicationsPanel />
    </>
  );
};

export default Page;
