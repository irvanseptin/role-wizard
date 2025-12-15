import { Department, Location } from "@/types/index";

export const fetchDepartments = async (
  query: string
): Promise<Department[]> => {
  try {
    const response = await fetch("/api/departments");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Department[] = await response.json();

    // This logic is simulation purpose, the ideal should be from BE logic not when the FE do the fetching
    if (!query) return data;

    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const fetchLocations = async (query: string): Promise<Location[]> => {
  try {
    const response = await fetch("/api/locations");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Location[] = await response.json();

    // This logic is simulation purpose, the ideal should be from BE logic not when the FE do the fetching
    if (!query) return data;

    const keyword = query.trim().toLowerCase();

    return data.filter((item) => item.name.toLowerCase().includes(keyword));
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const submitBasicInfo = async (data: any): Promise<any> => {
  try {
    // Simulate delay for demo
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch("/api/basicInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting basic info:", error);
    throw error;
  }
};

export const submitDetails = async (data: any): Promise<any> => {
  try {
    // Simulate delay for demo
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch("/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting details:", error);
    throw error;
  }
};

export const fetchBasicInfo = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await fetch(
      `/api/basicInfo?_page=${page}&_limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const totalCount = response.headers.get("X-Total-Count");

    return {
      data,
      totalCount: totalCount ? parseInt(totalCount, 10) : 0,
    };
  } catch (error) {
    console.error("Error fetching basic info:", error);
    return { data: [], totalCount: 0 };
  }
};

export const fetchDetails = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await fetch(`/api/details?_page=${page}&_limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const totalCount = response.headers.get("X-Total-Count");

    return {
      data,
      totalCount: totalCount ? parseInt(totalCount, 10) : 0,
    };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { data: [], totalCount: 0 };
  }
};

export const getBasicInfoById = async (id: number) => {
  try {
    const response = await fetch(`/api/basicInfo/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching basic info by ID:", error);
    return null;
  }
};

export const getDetailsById = async (id: number) => {
  try {
    const response = await fetch(`/api/details/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching details by ID:", error);
    return null;
  }
};
