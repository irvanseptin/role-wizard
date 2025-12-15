import React from "react";
import { ProgressLogProps } from "./interface";
import "./styles.scss";

export const ProgressLog: React.FC<ProgressLogProps> = ({ icon, text }) => {
  return (
    <div className="progress-log">
      <span className="progress-log__icon">{icon}</span>
      <span className="progress-log__text">{text}</span>
    </div>
  );
};

export default ProgressLog;
