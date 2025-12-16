"use client";

import React, { useState, useEffect } from "react";
import { FormField, Input, Select, Autocomplete, Button } from "@/components";
import { FormData } from "@/types/index";
import { validateStep1, ValidationErrors } from "@/utils/validation";
import { generateEmployeeId } from "@/utils/helpers";
import { fetchDepartments } from "@/services/api";
import { getEmployeeCount } from "@/services/storage";

interface Step1FormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

const ROLE_OPTIONS = [
  { value: "Ops", label: "Ops" },
  { value: "Admin", label: "Admin" },
  { value: "Engineer", label: "Engineer" },
  { value: "Finance", label: "Finance" },
];

export const Step1Form: React.FC<Step1FormProps> = ({
  formData,
  setFormData,
  onNext,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [employeeId, setEmployeeId] = useState("");
  const [generatingId, setGeneratingId] = useState(false);

  useEffect(() => {
    generateId();
  }, [formData.department]);

  const generateId = async () => {
    if (formData.department) {
      setGeneratingId(true);
      try {
        const count = await getEmployeeCount();
        const id = generateEmployeeId(formData.department, count);
        setEmployeeId(id);
        setFormData({ ...formData, employeeId: id });
      } catch (error) {
        console.error("Error generating employee ID:", error);
      } finally {
        setGeneratingId(false);
      }
    }
  };

  const handleNext = () => {
    const validationErrors = validateStep1(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="wizard-form">
      <h2 className="wizard-form__title">Basic Information</h2>

      <FormField label="Full Name" required error={errors.fullName}>
        <Input
          value={formData.fullName || ""}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder="Enter full name"
          error={!!errors.fullName}
        />
      </FormField>

      <FormField label="Email" required error={errors.email}>
        <Input
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="name@example.com"
          error={!!errors.email}
        />
      </FormField>

      <FormField label="Department" required error={errors.department}>
        <Autocomplete
          value={formData.department || ""}
          onChange={(val) => setFormData({ ...formData, department: val })}
          placeholder="Search department..."
          fetchSuggestions={fetchDepartments}
          error={!!errors.department}
        />
      </FormField>

      <FormField label="Role" required error={errors.role}>
        <Select
          options={ROLE_OPTIONS}
          value={formData.role || ""}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="Select role"
          error={!!errors.role}
        />
      </FormField>

      {employeeId && (
        <FormField label="Employee ID">
          <Input value={generatingId ? "Generating..." : employeeId} disabled />
        </FormField>
      )}

      <div className="wizard-form__actions">
        <Button variant="primary" onClick={handleNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
};
