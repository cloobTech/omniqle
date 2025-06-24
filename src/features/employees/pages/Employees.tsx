import React from "react";
import StatCards from "../components/StatCards";
import EmployeeTable from "../components/EmployeeTable";

const Employees: React.FC = () => {
  return (
    <div className="h-full pt-4 flex flex-col">
      <StatCards />
      <EmployeeTable />
    </div>
  );
};

export default Employees;
