import { FormData, UserRole } from "@/types/index";
import { fetchBasicInfo, fetchDetails } from "./api";

const DRAFT_PREFIX = "draft_";

// Draft Management (localStorage only)
export const saveDraft = (role: UserRole, data: FormData): void => {
  const key = `${DRAFT_PREFIX}${role}`;
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadDraft = (role: UserRole): FormData | null => {
  const key = `${DRAFT_PREFIX}${role}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

export const clearDraft = (role: UserRole): void => {
  const key = `${DRAFT_PREFIX}${role}`;
  localStorage.removeItem(key);
};

// Employee Data (from json-server)
export const getEmployees = async (page: number = 1, limit: number = 10) => {
  try {
    // Fetch from both endpoints
    const [basicInfoResult, detailsResult] = await Promise.all([
      fetchBasicInfo(page, limit),
      fetchDetails(page, limit),
    ]);

    // Merge data by email
    const merged = basicInfoResult.data.map((basic: any) => {
      const detail = detailsResult.data.find(
        (d: any) => d.email === basic.email
      );
      return { ...basic, ...detail };
    });

    return {
      employees: merged,
      totalCount: basicInfoResult.totalCount,
    };
  } catch (error) {
    console.error("Error getting employees:", error);
    return {
      employees: [],
      totalCount: 0,
    };
  }
};

// Get count of existing employees for ID generation
export const getEmployeeCount = async (): Promise<number> => {
  try {
    const result = await fetchBasicInfo(1, 1);
    return result.totalCount;
  } catch (error) {
    console.error("Error getting employee count:", error);
    return 0;
  }
};
