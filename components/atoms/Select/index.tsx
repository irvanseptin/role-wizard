import React, { forwardRef } from "react";
import { SelectProps } from "./interface";
import "./styles.scss";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error = false, placeholder, className = "", ...props }, ref) => {
    const classes = ["select", error && "select--error", className]
      .filter(Boolean)
      .join(" ");

    return (
      <select ref={ref} className={classes} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
