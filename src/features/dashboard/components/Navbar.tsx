import React from "react";
import { TextInput } from "@mantine/core";
import { BsSearch, BsBell, BsPersonCircle } from "react-icons/bs";

const Navbar: React.FC = () => {
  const icon = <BsSearch size={16} className="text-gray-500" />;
  return (
    <div>
      <nav className=" flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-primary">School Name</div>
          <h3 className="font-bold text-xl text-gray-800">
            Welcome, Joshua 
          </h3>
          <p className="text-gray-600 text-sm">The administrative management portal</p>
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
