"use client";

import React from "react";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { WizardLayoutProps } from "./interface";
import "./styles.scss";

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  role,
  stepper,
  children,
  onClearDraft,
  onCancel,
}) => {
  return (
    <div className="wizard-layout">
      <div className="wizard-layout__header">
        <h1 className="wizard-layout__title">Add New Employee</h1>
        <Badge variant="default">Role: {role?.toUpperCase()}</Badge>
      </div>

      {stepper && <div className="wizard-layout__stepper">{stepper}</div>}

      <div className="wizard-layout__content">{children}</div>

      <div className="wizard-layout__footer">
        <Button variant="text" onClick={onClearDraft}>
          Clear Draft
        </Button>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WizardLayout;
