"use client";
import React, { useContext } from "react";
import { UserContext } from "../../../components/UserProvider";
import AgentCandidateLanding from "./agentcandidatelanding";
import CandidateEmpty from "./candidateempty";
import OnboardingWrapper from "./onboardingwrapper";
import StepsNav from "../../../candidates/components/stepsnav";
import GeneralWrapper from "./generalwrapper";

const AgentCandidateWrapper = ({ candidate }) => {
  const user = useContext(UserContext);
  if (!user || !candidate || user.id != candidate.agentId) {
    return <CandidateEmpty />;
  }

  if (candidate.Onboarding.status === false) {
    return (
      <div className="max-w-2xl mx-auto">
        <StepsNav currentStep={candidate.Onboarding.current} />
        <div className="h-4"></div>
        <OnboardingWrapper candidate={candidate} />;
      </div>
    );
  }

  return <GeneralWrapper candidateId={candidate.id} />;
};

export default AgentCandidateWrapper;
