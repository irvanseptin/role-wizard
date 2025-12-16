import React from "react";
import { ErrorMessageProps } from "./interface";
import "./styles.scss";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className = "",
}) => {
  if (!children) return null;

  return <span className={`error-message ${className}`}>{children}</span>;
};

export * from "./interface";
