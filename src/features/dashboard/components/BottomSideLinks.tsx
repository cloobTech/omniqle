import React from "react";
import { NavLink } from "react-router-dom";
import { BsPower, BsHeadset, BsGear } from "react-icons/bs";
import { SideLinkProps } from "../types";
import { useModal } from "@src/index";
import LogoutUser from "@features/auth/forms/LogoutUser";

const BottomSideLinks: React.FC<SideLinkProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const { showModal } = useModal();

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
        to="/dashboard/settings"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        <div className="flex items-center gap-2">
          <BsGear />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Settings
          </span>
        </div>
      </NavLink>
      <NavLink
        onClick={() => setIsExpanded(false)}
        to="/dashboard/supports"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        <div className="flex items-center gap-2">
          <BsHeadset />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Support
          </span>
        </div>
      </NavLink>
      <div
        onClick={() => showModal(<LogoutUser />, {})}
        className={`${inactiveClass} cursor-pointer`}
        role="button"
      >
        <div className="flex items-center gap-2">
          <BsPower />
          <span
            className={`transition-all duration-300 overflow-hidden ${expandCollapseClass}`}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomSideLinks;
