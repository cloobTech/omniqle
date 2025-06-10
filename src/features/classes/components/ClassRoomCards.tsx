import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import RenderListItem from "@features/shared/components/RenderListItems";

export interface Grade {
  id: number;
  name: string;
  level: number;
}

interface GradeLevel {
  level: string;
  grades: Grade[];
}

interface TopGradeLevel {
  levels: [];
  group_name: string;
}

const ClassRoomCard: React.FC<GradeLevel> = ({ level, grades }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/dashboard/classrooms/manage-classroom/${level}`, {
      state: { grades },
    });
  };

  return (
    <div onClick={handleNavigation}>
      <div className="flex  justify-between h-22  items-center bg-[var(--primary-lightest)] rounded shadow p-3 cursor-pointer">
        <div className="flex flex-col justify-between h-full">
          <h3 className="text-gray-800">{level}</h3>
          <div className="font-bold">{`${grades.length} classrooms`}</div>
        </div>

        <BsChevronRight />
      </div>
    </div>
  );
};

// Group Card - Elementary, Middle, High School
const GroupCard: React.FC<TopGradeLevel> = ({ group_name, levels }) => {
  return (
    <div className="mb-4">
      <h3>{group_name}</h3>
      <div
        className={`grid md:grid-cols-3 lg:grid-cols-${levels.length} gap-4`}
      >
        <RenderListItem
          data={levels}
          renderItem={({ level, grades }) => (
            <ClassRoomCard level={level} grades={grades} key={level} />
          )}
        />
      </div>
    </div>
  );
};

const ClassRoomCards: React.FC<{ data: TopGradeLevel[] }> = ({ data }) => {
  const elementarySchool = data?.find(
    (item) => item.group_name === "Elementary School"
  );
  const middleSchool = data?.find(
    (item) => item.group_name === "Middle School"
  );
  const highSchool = data?.find((item) => item.group_name === "High School");

  return (
    <div className="bg-white p-2 rounded-lg">
      {elementarySchool && (
        <GroupCard
          group_name={elementarySchool.group_name}
          levels={elementarySchool.levels}
        />
      )}
      {middleSchool && (
        <GroupCard
          group_name={middleSchool.group_name}
          levels={middleSchool.levels}
        />
      )}
      {highSchool && (
        <GroupCard
          group_name={highSchool.group_name}
          levels={highSchool.levels}
        />
      )}
    </div>
  );
};

export default ClassRoomCards;
