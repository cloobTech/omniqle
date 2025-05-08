import React from "react";
import { TextInput } from "@mantine/core";
import { BsSearch, BsBell, BsPersonCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";


const Navbar: React.FC = () => {
  const location = useLocation();
  const icon = <BsSearch size={16} className="text-gray-500" />;

    // Determine the content based on the current route
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/dashboard":
          return "Dashboard Overview";
        case "/dashboard/manage-classroom":
          return "Manage Classroom";
        case "/dashboard/employees":
          return "Employee Management";
        default:
          return "Welcome, Joshua";
      }
    };
  
    const getPageSubtitle = () => {
      switch (location.pathname) {
        case "/dashboard":
          return "Overview of your administrative tasks";
        case "/dashboard/manage-classroom":
          return "Manage and organize classrooms effectively";
        case "/dashboard/employees":
          return "Manage employee records and details";
        default:
          return "The administrative management portal";
      }
    };
  return (
    <div>
      <nav className=" flex justify-between items-center">
        <div>
          <div className="text-xl font-bold text-primary leading-[30px]">School Name</div>
          <h3 className="font-bold  text-gray-800 leading-[16px]">
            {getPageTitle()}
          </h3>
          <p className="text-gray-600 text-xs">{getPageSubtitle()}</p>
        </div>
        <div className="flex items-center space-x-4 ">
          <TextInput placeholder="Search..." leftSection={icon} />
          <div className="bg-white rounded h-full shadow flex items-center p-2 gap-4">
            <BsBell className="text-gray-500" />
            {/* Vertical Line */}
            <div className="h-4 w-[2px] bg-gray-500"></div>
            <BsPersonCircle className="text-gray-500" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
