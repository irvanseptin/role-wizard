"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PageLayout,
  PageHeader,
  EmployeeTable,
  Pagination,
  Icon,
} from "@/components";
import { Employee } from "@/types/index";
import { getEmployees } from "@/services/storage";

const ITEMS_PER_PAGE = 10;

export const EmployeeListPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const result = await getEmployees(currentPage, ITEMS_PER_PAGE);
      setEmployees(result.employees);
      setTotalPages(Math.ceil(result.totalCount / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  if (loading) {
    return (
      <PageLayout maxWidth="xl">
        <div style={{ textAlign: "center", padding: "48px" }}>
          Loading employees...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="xl">
      <PageHeader
        title="Employee Directory"
        action={{
          label: "Add Employee",
          icon: <Icon name="Plus" size={18} />,
          onClick: () => router.push("/select-role"),
        }}
      />
      <EmployeeTable employees={employees} />
      <div style={{ marginTop: "24px" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </PageLayout>
  );
};

export default EmployeeListPage;
