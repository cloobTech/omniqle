import React from "react";
import { BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import RenderListItem from "@features/shared/components/RenderListItems";

interface ClassRoomCardProps {
  level: string;
  classrooms: number;
}

interface Grade {
  id: number;
  name: string;
  level: number;
}

interface GradeLevel {
  level: string;
  grades: Grade[];
}

const ClassRoomCard: React.FC<ClassRoomCardProps> = ({ level, classrooms }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/dashboard/manage-classroom")}>
      <div className="flex flex-col justify-between h-32 bg-gray-100 rounded shadow p-4 cursor-pointer">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-gray-500">{level}</h3>

          <div className="bg-white p-2 rounded">
            <BsBuilding style={{ color: "var(--primary)" }} />
          </div>
        </div>
        <div className="font-bold">{`${classrooms} classrooms`}</div>
      </div>
    </div>
  );
};

const ClassRoomCards: React.FC<{ data: GradeLevel[] }> = ({ data }) => {
  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-2 lg:grid-cols-5 gap-4">
      {data && (
        <RenderListItem
          data={data}
          renderItem={({ level, grades }) => (
            <ClassRoomCard
              level={level}
              classrooms={grades.length}
              key={grades.id}
            />
          )}
        />
      )}
    </div>
  );
};

export default ClassRoomCards;
