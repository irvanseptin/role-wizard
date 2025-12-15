import React, { useState } from "react";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/Textarea";
import Autocomplete from "@/components/molecules/Autocomplete";
import FileUpload from "@/components/molecules/FileUpload";
import Button from "@/components/atoms/Button";
import { Step2FormProps } from "./interface";
import { validateStep2, ValidationErrors } from "@/utils/validation";
import { fetchLocations } from "@/services/api";
import "./styles.scss";

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Intern", label: "Intern" },
];

export const Step2Form: React.FC<Step2FormProps> = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  isAdmin,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = () => {
    const validationErrors = validateStep2(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit();
    }
  };

  return (
    <div className="wizard-form">
      <h2 className="wizard-form__title">Additional Details</h2>

      <FormField label="Employment Type" required error={errors.employmentType}>
        <Select
          options={EMPLOYMENT_TYPE_OPTIONS}
          value={formData.employmentType || ""}
          onChange={(e) =>
            setFormData({ ...formData, employmentType: e.target.value })
          }
          placeholder="Select type"
          error={!!errors.employmentType}
        />
      </FormField>

      <FormField label="Office Location" required error={errors.officeLocation}>
        <Autocomplete
          value={formData.officeLocation || ""}
          onChange={(val) => setFormData({ ...formData, officeLocation: val })}
          placeholder="Search location..."
          fetchSuggestions={fetchLocations}
          error={!!errors.officeLocation}
        />
      </FormField>

      <FormField label="Photo Upload">
        <FileUpload
          value={formData.photo || null}
          onChange={(photo) =>
            setFormData({ ...formData, photo: photo || undefined })
          }
        />
      </FormField>

      <FormField label="Notes">
        <TextArea
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={4}
        />
      </FormField>

      <div className="wizard-form__actions">
        {isAdmin && (
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
        )}
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Step2Form;
