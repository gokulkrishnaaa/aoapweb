"use client";
import React, { useState } from "react";
import ApplySteps from "./applysteps";
import AeeeSubmit from "./exam-submit";
import ProgramSelection from "./program-selection";
import CityJee from "./exam-cityjee";

const AeeeWrapper = ({ application }) => {
  const [step, setStep] = useState(application.ExamApplicationProgress.current);

  console.log(application);

  function nextStep() {
    setStep((state) => state + 1);
  }
  function previousStep() {
    setStep((state) => state - 1);
  }
  return (
    <div className="bg-white py-5 px-2 rounded shadow-sm border border-gray-100">
      <ApplySteps stepId={step} />
      <div className="h-6"></div>
      <section>
        {step === 1 && (
          <ProgramSelection
            nextStep={nextStep}
            step={step}
            application={application}
          />
        )}
        {step === 2 && (
          <CityJee
            previousStep={previousStep}
            nextStep={nextStep}
            step={step}
            application={application}
          />
        )}
        {step === 3 && (
          <AeeeSubmit
            previousStep={previousStep}
            step={step}
            application={application}
          />
        )}
      </section>
    </div>
  );
};

export default AeeeWrapper;
