import React from "react";
import { StatCard, RenderListItems } from "@features/shared";

import {
  BsPeople,
  BsBuilding,
  BsGenderMale,
  BsGenderFemale,
} from "react-icons/bs";

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
    title: "Total Male",
    value: 685,
    description: "Number of active teachers",
    icon: <BsGenderMale />, // Icon for a teacher at a chalkboard
  },
  {
    id: 2,
    title: "Total Female",
    value: 595,
    description: "Number of active teachers",
    icon: <BsGenderFemale />, // Icon for a teacher at a chalkboard
  },
  {
    id: 3,
    title: "Classes",
    value: 45,
    description: "Number of active classrooms",
    icon: <BsBuilding />, // Icon for a building (representing classrooms)
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
