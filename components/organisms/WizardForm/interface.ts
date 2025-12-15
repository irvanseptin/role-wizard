import { FormData } from "@/types/index";

export interface Step1FormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

export interface Step2FormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onBack: () => void;
  onSubmit: () => void;
  isAdmin: boolean;
}
