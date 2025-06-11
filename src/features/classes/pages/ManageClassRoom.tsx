import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grade } from "../components/ClassRoomCards";
import { ManageClassRoomTable } from "@features/students";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNavbar } from "@src/index";
import GeneralClassInformation from "../components/GeneralClassInformation";
import { GeneralClassInformationSkeleton } from "../components/GeneralClassInfoSkeleton";
import { useGetSingleGradesQuery } from "@features/classes";
import { useAppSelector } from "@src/index";

const ManageClassRoom: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const location = useLocation();
  const { grades } = location?.state as { grades: Grade[] };
  // Automatically set the first item as the default active class
  const [activeClassId, setActiveClassId] = useState<number | null>(
    grades.length > 0 ? grades[0].id : null
  );
  const navigate = useNavigate();
  const { hideNav, displayNav } = useNavbar();
  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data: classroomDetails, isLoading } = useGetSingleGradesQuery({
    schoolId: schoolId,
    gradeId: activeClassId,
  });

  useEffect(() => {
    // Hide the navbar when this component is mounted
    hideNav();

    // Cleanup function to show the navbar again when unmounted
    return () => {
      displayNav();
    };
  }, []);

  const handleClassClick = (id: number) => {
    setActiveClassId(id);
  };

  // Find the active grade based on the activeClassId
  const activeGrade = grades.find((grade) => grade.id === activeClassId);

  return (
    //
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 ">
          <FaAngleDoubleLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-bold ">{level}</h1>
        </div>
      </div>
      {/*  */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {grades?.map((grade) => (
          <div
            key={grade.id}
            onClick={() => handleClassClick(grade.id)}
            className={`p-4 rounded shadow cursor-pointer ${
              activeClassId === grade.id ? "bg-primary text-white" : "bg-white"
            }`}
          >
            <h3 className="font-bold">{grade.name}</h3>
          </div>
        ))}
      </div>
      {isLoading ? (
        <GeneralClassInformationSkeleton />
      ) : (
        <GeneralClassInformation {...classroomDetails} />
      )}

      <section>
        {/* Render the table only if an active class is selected */}
        {activeClassId && (
          <div className="mt-4">
            {activeGrade && (
              <ManageClassRoomTable
                grade={activeGrade}
                classLevelName={level || "Unknown Level"}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageClassRoom;
