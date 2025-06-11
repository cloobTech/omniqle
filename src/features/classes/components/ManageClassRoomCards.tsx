import React from "react";
import { Button } from "@mantine/core";
import CreateClassRoom from "../forms/CreateClassRoom";
import { useModal } from "@src/index";
import {
  useGetGradesQuery,
  useGetGradeDisplayNamesQuery,
} from "../services/api";
import ClassRoomCards from "./ClassRoomCards";
import { ClassRoomCardsSkeleton } from "./Skeletons";
import { useAppSelector } from "@src/index";

const ManageClassRoomCards: React.FC = () => {
  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data, isLoading } = useGetGradesQuery({
    schoolId: schoolId,
  });

  const { data: classLevels, isError } = useGetGradeDisplayNamesQuery({
    schoolId: schoolId,
  });

  const { showModal } = useModal();

  if (isLoading) {
    return <ClassRoomCardsSkeleton />;
  }

  // Handle empty or undefined classLevels
  const classOptions =
    classLevels && Object.keys(classLevels).length > 0
      ? Object.entries(classLevels).map(([key, value]) => ({
          value: key,
          label: value as string,
        }))
      : []; // Fallback to an empty array if classLevels is empty or undefined

  return (
    <div className="h-full bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between ">
        <h1 className="px-2 mb-2">All Classes</h1>
        <Button
          onClick={() =>
            showModal(<CreateClassRoom gradeDisplayNames={classOptions} />, {
              size: "80%",
              withCloseButton: false,
            })
          }
          disabled={classOptions.length === 0 || isError} // Disable button if classOptions is empty or there's an error
        >
          Add Classes
        </Button>
      </div>
      <section>
        <ClassRoomCards data={data?.grades} />
      </section>
    </div>
  );
};

export default ManageClassRoomCards;
