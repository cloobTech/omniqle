import React from "react";
import { TextInput, Avatar } from "@mantine/core";
import { BsSearch, BsBell, BsPersonCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "@features/users";
import { getPageTitle, getPageSubtitle } from "../utils/updateNavBar";
import { useAppSelector } from "@src/index";

const Navbar: React.FC = () => {
  const location = useLocation();
  const icon = <BsSearch size={16} className="text-gray-500" />;

  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data } = schoolId
    ? useGetCurrentUserQuery({ schoolId })
    : { data: null };

  const current_school = data?.current_school || { name: "Unknown School" }; // Fallback for current_school
  const user = data?.user || { name: "Guest" }; // Fallback for user

  return (
    <div>
      <nav className="flex justify-between items-center">
        <div>
          <div className="text-xl font-bold text-primary leading-[30px]">
            {current_school.name} {/* Fallback ensures no crash */}
          </div>
          <h3 className="font-bold text-gray-800 leading-[16px]">
            {getPageTitle(location.pathname, user.name)}
          </h3>
          <p className="text-gray-600 text-xs">
            {getPageSubtitle(location.pathname)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <TextInput placeholder="Search..." leftSection={icon} />
          <div className="bg-white rounded h-full shadow flex items-center p-1 gap-4">
            <BsBell className="text-gray-500" />
            {/* Vertical Line */}
            <div className="h-4 w-[2px] bg-gray-500"></div>
            <>
              {data ? (
                <Avatar src={user.photo} alt="it's me" size="sm" />
              ) : (
                <BsPersonCircle className="text-gray-500" />
              )}
            </>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
