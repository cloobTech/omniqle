import React from "react";
import { NavLink } from "react-router-dom";
import { BsHouse, BsBriefcase, BsReceipt, BsBuilding } from "react-icons/bs";
import { SideLinkProps } from "../types";

const AdminTopSideLinks: React.FC<SideLinkProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  // Classes for active and inactive links
  const activeClass =
    "flex items-center gap-2 p-2 text-white bg-primary rounded transition-all duration-300 text-brand-blue text-sm";
  const inactiveClass =
    "flex items-center gap-2 p-2 rounded transition-all duration-300 text-sm";

  // Class names for expanded/collapsed text
  const expandCollapseClass = isExpanded
    ? "max-w-xs opacity-100"
    : "max-w-0 opacity-0";

  return (
    <div className={`pb-8 flex flex-col gap-4 transition-all duration-300`}>
      {/* Links */}
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        end
        title="dashboard"
      >
        <div className="flex items-center gap-2">
          <BsHouse />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Home
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/classrooms"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="classrooms"
      >
        <div className="flex items-center gap-2">
          <BsBuilding />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Classes
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/employees"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="employees"
      >
        <div className="flex items-center gap-2">
          <BsBriefcase />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Employees
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/payments"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        title="payments"
      >
        <div className="flex items-center gap-2">
          <BsReceipt />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Payments
          </span>
        </div>
      </NavLink>
    </div>
  );
};

export default AdminTopSideLinks;
