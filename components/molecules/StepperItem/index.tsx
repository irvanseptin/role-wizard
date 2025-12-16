import React from "react";
import { StepperItemProps } from "./interface";
import "./styles.scss";

export const StepperItem: React.FC<StepperItemProps> = ({
  number,
  label,
  active,
}) => {
  return (
    <div className={`stepper-item ${active ? "stepper-item--active" : ""}`}>
      <div className="stepper-item__number">{number}</div>
      <div className="stepper-item__label">{label}</div>
    </div>
  );
};

export * from "./interface";
