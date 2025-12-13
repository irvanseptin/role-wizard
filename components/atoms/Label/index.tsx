import React from "react";
import { LabelProps } from "./interface";
import "./styles.scss";

export const Label: React.FC<LabelProps> = ({
  required = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <label className={`label ${className}`} {...props}>
      {children}
      {required && <span className="label__required">*</span>}
    </label>
  );
};

export default Label;
