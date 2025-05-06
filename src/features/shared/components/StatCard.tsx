import React from "react";
import { BsBriefcase } from "react-icons/bs";

const StatCard: React.FC = () => {
  const icon = <BsBriefcase />;
  return (
    <div className="flex flex-col justify-between h-32  bg-gray-300 rounded shadow p-4 card-gradient">
      <div className="flex items-center justify-between gap-4">
        <div className="leading-none">
          <h3 className="font-bold">Title</h3>
          <small className="text-gray-600 text-xs">
            Lorem, ipsum dolor sit amet consectetur{" "}
          </small>
        </div>
        <div>{icon}</div>
      </div>
      <div className="font-bold text-xl">1280</div>
    </div>
  );
};

export default StatCard;
