import React from "react";
import { NavLink } from "react-router-dom";
import { BsPower, BsHeadset, BsGear } from "react-icons/bs";
import { SideLinkProps } from "../types";

const AdminTopSideLinks: React.FC<SideLinkProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  //   const toggleNavbar = () => {
  //     setIsExpanded((prev) => !prev);
  //   };

  const activeClass =
    "flex items-center gap-2 p-2 text-white bg-primary rounded transition-all duration-300 text-brand-blue text-sm";
  const inactiveClass =
    "flex items-center gap-2 p-2  rounded transition-all duration-300 text-sm ";

  return (
    <div className={`pb-8 flex flex-col gap-4 transition-all duration-300`}>
      {/* Links */}
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        end
      >
        <BsGear />
        {isExpanded && <span>Settings</span>}
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        end
      >
        <BsHeadset />
        {isExpanded && <span>Support</span>}
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        end
      >
        <BsPower />
        {isExpanded && <span>Logout</span>}
      </NavLink>
    </div>
  );
};

export default AdminTopSideLinks;
