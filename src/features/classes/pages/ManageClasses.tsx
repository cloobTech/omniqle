import React from "react";
import StatCards from "../components/StatCards";
import ManageClassTable from "../components/ManageClassTable";

const ManageClasses: React.FC = () => {
  return (
    <div className="mt-4">
      <StatCards />
      <ManageClassTable />
    </div>
  );
};

export default ManageClasses;
