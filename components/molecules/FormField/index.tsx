import React from "react";
import { Label, ErrorMessage } from "@/components";
import { FormFieldProps } from "./interface";
import "./styles.scss";

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
  htmlFor,
}) => {
  return (
    <div className="form-field">
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export * from "./interface";
