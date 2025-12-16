import React from "react";
import { EmployeeTableProps } from "./interface";

import "./styles.scss";

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  if (employees.length === 0) {
    return (
      <div className="employee-table">
        <div className="employee-table__empty">No employees found</div>
      </div>
    );
  }

  return (
    <div className="employee-table">
      <table className="employee-table__table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Location</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={idx}>
              <td>
                {emp.photo ? (
                  <img
                    src={emp.photo}
                    alt={emp.fullName}
                    className="employee-table__photo"
                  />
                ) : (
                  <div className="employee-table__photo-placeholder">—</div>
                )}
              </td>
              <td>{emp.fullName || "—"}</td>
              <td>{emp.department || "—"}</td>
              <td>{emp.role || "—"}</td>
              <td>{emp.officeLocation || "—"}</td>
              <td>
                <code className="employee-table__id">
                  {emp.employeeId || "—"}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export * from "./interface";
