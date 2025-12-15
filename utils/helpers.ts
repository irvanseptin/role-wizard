export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateEmployeeId = (
  department: string,
  existingCount: number
): string => {
  const deptPrefix = department.substring(0, 3).toUpperCase();
  const sequence = String(existingCount + 1).padStart(3, "0");
  return `${deptPrefix}-${sequence}`;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
