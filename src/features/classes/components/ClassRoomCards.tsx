import React from "react";
import { BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface ClassRoomCardProps {
  level: string;
  classrooms: number;
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

const ClassRoomCards: React.FC = () => {
  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-2 lg:grid-cols-5 gap-4">
      <ClassRoomCard level="Primary 1" classrooms={3} />
      <ClassRoomCard level="Primary 2" classrooms={3} />
      <ClassRoomCard level="Primary 3" classrooms={7} />
      <ClassRoomCard level="JSS 1" classrooms={2} />
      <ClassRoomCard level="JSS 2" classrooms={4} />
      <ClassRoomCard level="SS 1" classrooms={5} />
      <ClassRoomCard level="SS 2" classrooms={3} />
      <ClassRoomCard level="SS 3" classrooms={5} />
    </div>
  );
};

export default ClassRoomCards;
