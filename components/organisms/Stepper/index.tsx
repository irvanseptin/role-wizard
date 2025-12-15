import React from "react";
import StepperItem from "@/components/molecules/StepperItem";
import { StepperProps } from "./interface";
import "./styles.scss";

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <StepperItem
            number={index + 1}
            label={step.label}
            active={currentStep >= index + 1}
          />
          {index < steps.length - 1 && <div className="stepper__line" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
