export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateRequired = (value: string | undefined): boolean => {
  return !!value?.trim();
};

export interface ValidationErrors {
  [key: string]: string;
}

export const validateStep1 = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!validateRequired(data.fullName)) {
    errors.fullName = "Full name is required";
  }

  if (!validateRequired(data.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!validateRequired(data.department)) {
    errors.department = "Department is required";
  }

  if (!data.role) {
    errors.role = "Role is required";
  }

  return errors;
};

export const validateStep2 = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.employmentType) {
    errors.employmentType = "Employment type is required";
  }

  if (!validateRequired(data.officeLocation)) {
    errors.officeLocation = "Office location is required";
  }

  return errors;
};
