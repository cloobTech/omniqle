import React from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const DashbordLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      <SideBar />

      <section className="flex-1 p-6 flex flex-col">
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 ">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashbordLayout;
