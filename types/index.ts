export interface Employee {
  fullName: string;
  email: string;
  department: string;
  role: string;
  employeeId: string;
  employmentType?: string;
  officeLocation?: string;
  photo?: string;
  notes?: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export type FormData = Partial<Employee>;

export interface ProgressLog {
  icon: string;
  text: string;
}

export type UserRole = "admin" | "ops";
