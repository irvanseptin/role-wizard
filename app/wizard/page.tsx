"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  WizardLayout,
  Stepper,
  Step1Form,
  Step2Form,
  ProgressModal,
} from "@/components";
import { FormData, UserRole, ProgressLog } from "@/types/index";
import { useAutoSave } from "@/hooks/useAutoSave";
import {
  saveDraft,
  loadDraft,
  clearDraft as clearStoredDraft,
} from "@/services/storage";
import { submitBasicInfo, submitDetails } from "@/services/api";

const WIZARD_STEPS = [{ label: "Basic Info" }, { label: "Details" }];

function WizardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const isUserRole = (value: string | null): value is UserRole =>
    value === "admin" || value === "ops";

  const role: UserRole = isUserRole(roleParam) ? roleParam : "admin";

  const [currentStep, setCurrentStep] = useState(role === "admin" ? 1 : 2);
  const [formData, setFormData] = useState<FormData>({});
  const [showProgress, setShowProgress] = useState(false);
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>([]);

  useAutoSave(formData, (data) => saveDraft(role, data), 2000);

  useEffect(() => {
    const savedDraft = loadDraft(role);
    if (savedDraft) {
      setFormData(savedDraft);
    }
  }, [role]);

  useEffect(() => {
    setCurrentStep(role === "admin" ? 1 : 2);
  }, [role]);

  const clearDraft = () => {
    clearStoredDraft(role);
    setFormData({});
  };

  const handleSubmit = async () => {
    setShowProgress(true);
    setProgressLogs([]);

    try {
      setProgressLogs([{ icon: "⏳", text: "Submitting basicInfo..." }]);

      const basicInfoData = {
        fullName: formData.fullName,
        email: formData.email,
        department: formData.department,
        role: formData.role,
        employeeId: formData.employeeId,
      };

      await submitBasicInfo(basicInfoData);

      setProgressLogs((prev) => [
        ...prev,
        { icon: "✅", text: "basicInfo saved!" },
      ]);

      setProgressLogs((prev) => [
        ...prev,
        { icon: "⏳", text: "Submitting details..." },
      ]);

      const detailsData = {
        email: formData.email,
        employmentType: formData.employmentType,
        officeLocation: formData.officeLocation,
        photo: formData.photo,
        notes: formData.notes,
      };

      await submitDetails(detailsData);

      setProgressLogs((prev) => [
        ...prev,
        { icon: "✅", text: "details saved!" },
      ]);

      setProgressLogs((prev) => [
        ...prev,
        { icon: "🎉", text: "All data processed successfully!" },
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearDraft();
      setShowProgress(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Submit error:", error);
      setProgressLogs((prev) => [
        ...prev,
        { icon: "❌", text: "Error occurred!" },
      ]);
    }
  };

  const handleCancel = () => {
    const hasData = Object.values(formData).some(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (hasData) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Your draft will be saved. Do you want to leave?"
      );
      if (!confirmLeave) return;
    }

    router.push("/");
  };

  return (
    <>
      <WizardLayout
        role={role}
        stepper={
          role === "admin" ? (
            <Stepper currentStep={currentStep} steps={WIZARD_STEPS} />
          ) : undefined
        }
        onClearDraft={clearDraft}
        onCancel={handleCancel}
      >
        {currentStep === 1 && role === "admin" ? (
          <Step1Form
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(2)}
          />
        ) : (
          <Step2Form
            formData={formData}
            setFormData={setFormData}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleSubmit}
            isAdmin={role === "admin"}
          />
        )}
      </WizardLayout>

      {showProgress && <ProgressModal logs={progressLogs} />}
    </>
  );
}
export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div>Loading wizard...</div>
        </div>
      }
    >
      <WizardPageContent />
    </Suspense>
  );
}
