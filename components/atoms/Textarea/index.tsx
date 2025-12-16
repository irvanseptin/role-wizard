import React, { forwardRef } from "react";
import { TextAreaProps } from "./interface";
import "./styles.scss";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error = false, className = "", ...props }, ref) => {
    const classes = ["textarea", error && "textarea--error", className]
      .filter(Boolean)
      .join(" ");

    return <textarea ref={ref} className={classes} {...props} />;
  }
);

TextArea.displayName = "TextArea";

export * from "./interface";
