import React from "react";
import Label from "@/components/atoms/Label";
import ErrorMessage from "@/components/atoms/ErrorMessage";
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

export default FormField;
