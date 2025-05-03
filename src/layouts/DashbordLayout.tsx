import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BottomSideLinks, TopSideLinks } from "@features/dashboard";
import { FiChevronLeft, FiMenu } from "react-icons/fi";

const DashbordLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`py-18 relative bg-primary-light flex flex-col justify-between p-4 transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        }`}
      >
        {/* Expand & Collapse Navbar */}
        <button
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

      {/* Main Content */}
      <section className="flex-1">
        Dashboard
        <Outlet />
      </section>
    </div>
  );
};

export default DashbordLayout;
