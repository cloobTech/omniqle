import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grade } from "../components/ClassRoomCards";
import { ManageClassRoomTable } from "@features/students";

const ManageClassRoom: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const location = useLocation();
  const { grades } = location.state as { grades: Grade[] };

  // Automatically set the first item as the default active class
  const [activeClassId, setActiveClassId] = useState<number | null>(
    grades.length > 0 ? grades[0].id : null
  );

  const handleClassClick = (id: number) => {
    console.log(`Class with ID ${id} clicked`);
    setActiveClassId(id);
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-center">
        Classroom Details for {level}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {grades.map((grade) => (
          <div
            key={grade.id}
            onClick={() => handleClassClick(grade.id)}
            className={`p-4 rounded shadow cursor-pointer ${
              activeClassId === grade.id ? "bg-primary text-white" : "bg-white"
            }`}
          >
            <h3 className="font-bold">{grade.name}</h3>
            <p>Level: {grade.level}</p>
          </div>
        ))}
      </div>
      <section>
        {/* Render the table only if an active class is selected */}
        {activeClassId && (
          <div className="mt-4">
            <ManageClassRoomTable />
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageClassRoom;
