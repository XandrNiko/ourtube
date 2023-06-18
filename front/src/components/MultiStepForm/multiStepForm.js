import React, { useState } from "react";

import "./multiStepForm.css"

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="step-indicator">
      {steps.map((_, idx) => (
        <div key={idx} className={`step ${currentStep === idx ? "active" : ""}`}></div>
      ))}
    </div>
  );
};

const MultiStepForm = ({ steps, onFinish }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(new FormData());

    const handleNextStep = (data) => {
        const newFormData = formData;
        for (const [key, value] of data) {
            newFormData.append(key, value);
        }
        setFormData(newFormData);
        setCurrentStep((currentStep) => Math.min(currentStep + 1, steps.length - 1));
    };

    const handlePrevStep = (data) => {
        setCurrentStep((currentStep) => Math.max(currentStep - 1, 0));
    };

    const handleFinish = (data) => {
        const newFormData = formData;
        for (const [key, value] of data) {
            newFormData.append(key, value);
        }
        setFormData(newFormData);
        onFinish(formData);
    };

    const CurrentStep = steps[currentStep];

    return (
        <div className="dialog-container">
            <CurrentStep
                formData={formData}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                onFinish={handleFinish} // передача handleFinish в RegisterCardStep2
            />
            
            {steps.length > 1 && <StepIndicator steps={steps} currentStep={currentStep} />}
        </div>
    );
};

export default MultiStepForm;