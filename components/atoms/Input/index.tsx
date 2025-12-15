import React, { forwardRef } from "react";
import { InputProps } from "./interface";
import "./styles.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, leftIcon, className = "", ...props }, ref) => {
    const classes = [
      "input",
      error && "input--error",
      leftIcon && "input--with-icon",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (leftIcon) {
      return (
        <div className="input-wrapper">
          <span className="input-icon">{leftIcon}</span>
          <input data-testid="input" ref={ref} className={classes} {...props} />
        </div>
      );
    }

    return (
      <input data-testid="input" ref={ref} className={classes} {...props} />
    );
  }
);

Input.displayName = "Input";

export default Input;
