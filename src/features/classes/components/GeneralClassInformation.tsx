import React from "react";
import { Avatar, Button, Select } from "@mantine/core";
import { BsGenderMale, BsGenderFemale, BsPersonCheck } from "react-icons/bs";
import { IClassroomDetails } from "../types";

const ClassTeacherInformation = ({
  classTeacher,
}: {
  classTeacher: string | null;
}) => {
  return (
    <div className="h-full p-4 card-gradient-two rounded shadow">
      <div className="flex items-center gap-2 ">
        <Avatar src={null} alt="Class Teacher Image" size={52} />
        <div className="flex flex-col">
          <p className="font-semibold">{classTeacher ?? "Not available"}</p>
          <small className="text-xs text-gray-600">Class Teacher</small>
        </div>
      </div>
      <Button
        variant="outline"
        className="mt-4"
        style={{
          fontSize: "0.6rem",
          padding: "0.25rem 0.5rem",
          color: "#333333",
          height: "1.5rem",
          borderColor: "#cccccc",
        }}
        onClick={() => console.log("Edit Class Teacher")}
      >
        View Class Teacher
      </Button>
    </div>
  );
};

const ClassRepsInformation = ({
  classCaptain,
}: {
  classCaptain: string | null;
}) => {
  return (
    <div className="h-full p-4 bg-[var(--primary-lightest)] rounded shadow flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="font-semibold">{classCaptain ?? "Not available"}</p>
        <small className="text-xs text-gray-600">Class Captain/Rep</small>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{classCaptain ?? "Not available"}</p>
        <small className="text-xs text-gray-600">
          Assistant Class Captain/Rep
        </small>
      </div>
    </div>
  );
};

const ClassStudentsInformation = ({
  maleCount,
  femaleCount,
  malePercent,
  femalePercent,
}: {
  maleCount: number;
  femaleCount: number;
  malePercent: number;
  femalePercent: number;
}) => {
  return (
    <div className="h-full p-4 bg-[var(--primary-lightest)] rounded shadow flex flex-col gap-1 text-xs text-gray-700">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1">
          <BsGenderMale />
          Male Students
        </p>
        <p className="font-bold text-lg flex items-center gap-1">
          <span className="text-xs text-gray-400">{`(${malePercent}%)`}</span>
          {maleCount}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1">
          <BsGenderFemale />
          Female Students
        </p>
        <p className="font-bold text-lg flex items-center gap-1">
          <span className="text-xs text-gray-400">{`(${femalePercent}%)`}</span>
          {femaleCount}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-1">
            <BsPersonCheck />
            Class attendance
          </p>
          <Select
            data={[
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
              { value: "term", label: "This Term" },
            ]}
            defaultValue="week"
            size="xs"
          />
        </div>
        <p className="font-bold text-lg">88%</p>
      </div>
    </div>
  );
};

const GeneralClassInformation: React.FC<IClassroomDetails> = (
  data: IClassroomDetails
) => {
  const { class_teacher } = data;
  const { class_prefect } = data;
  const { male, female } = data?.statistics?.gender_distribution;
  const { count: maleCount, percentage: malePercent } = male;
  const { count: femaleCount, percentage: femalePercent } = female;

  return (
    <div className="grid md:grid-cols-3 bg-white rounded p-2 gap-4 mt-4">
      <ClassTeacherInformation classTeacher={class_teacher} />
      <ClassRepsInformation classCaptain={class_prefect} />
      <ClassStudentsInformation
        maleCount={maleCount}
        femaleCount={femaleCount}
        malePercent={malePercent}
        femalePercent={femalePercent}
      />
    </div>
  );
};

export default GeneralClassInformation;
