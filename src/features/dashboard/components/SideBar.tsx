import React, { useState } from "react";
import BottomSideLinks from "@features/dashboard/components/BottomSideLinks";
import TopSideLinks from "@features/dashboard/components/TopSideLinks";
import { FiChevronLeft, FiMenu } from "react-icons/fi";

const SideBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={`py-18 relative bg-primary-light flex flex-col justify-between p-4 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Expand & Collapse Navbar */}
      <button
        title="Expand/Collapse"
        aria-label="Expand/Collapse"
        type="button"
        onClick={toggleNavbar}
        className={`p-2 rounded absolute  top-4 flex items-center justify-center cursor-pointer ${
          isExpanded ? "bg-primary text-white" : "bg-white text-primary"
        }`}
      >
        {isExpanded ? <FiChevronLeft size={16} /> : <FiMenu size={16} />}
      </button>

      {/* Top Links */}
      <div>
        <TopSideLinks isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      {/* Bottom Links */}
      <div>
        <BottomSideLinks
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>
    </div>
  );
};

export default SideBar;
