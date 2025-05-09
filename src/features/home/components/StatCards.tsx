import React from "react";
import { StatCard, RenderListItems } from "@features/shared";

import { BsPeople, BsBuilding } from "react-icons/bs";
import { FaChalkboardTeacher, FaMoneyBillWave } from "react-icons/fa";

const statsData = [
  {
    id: 1,
    title: "Total Students",
    value: 1280,
    description: "Number of enrolled students",
    icon: <BsPeople />,
  },
  {
    id: 2,
    title: "Total Employees",
    value: 85,
    description: "Number of active employees",
    icon: <FaChalkboardTeacher />, // Icon for a teacher at a chalkboard
  },
  {
    id: 3,
    title: "Classes",
    value: 45,
    description: "Number of active classrooms",
    icon: <BsBuilding />, // Icon for a building (representing classrooms)
  },
  {
    id: 4,
    title: "Pending Fees",
    value: "$12,500",
    description: "Total pending fees",
    icon: <FaMoneyBillWave />, // Icon for money or fees
  },
];

const StatCards: React.FC = () => {
  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <RenderListItems
        data={statsData}
        renderItem={(item) => <StatCard {...item} key={item.id} />}
      />
    </div>
  );
};

export default StatCards;
