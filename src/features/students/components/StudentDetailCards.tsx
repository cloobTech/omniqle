import React from "react";
import { Avatar } from "@mantine/core";
import { IStudentDetails } from "../types";

interface IStudentPersonalInfo {
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: string;
  dateOfBirth: string;
}

const StudentAvatarAndName = ({
  fullName,
  gradeName,
}: {
  fullName: string;
  gradeName: string;
}) => {
  return (
    <div className="h-full p-2 bg-white rounded">
      <div className="flex items-center gap-2 card-gradient p-4 rounded">
        <Avatar src={null} alt="Class Teacher Image" size={52} />
        <div className="flex flex-col">
          <p className="font-semibold">{fullName}</p>
          <small className="text-xs text-gray-600">{gradeName}</small>
        </div>
      </div>
    </div>
  );
};

const StudentDetaiCard: React.FC<IStudentPersonalInfo> = (
  data: IStudentPersonalInfo
) => {
  return (
    <div className="p-4 rounded bg-white">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-sm">Personal details</p>
        <p className="border border-gray-500 p-1 rounded text-xs">Edit</p>
      </div>
      <div className="h-full p-4 bg-[var(--primary-lightest)] rounded">
        <ul className="grid gap-4">
          <li className="flex justify-between items-center">
            <p className="text-xs text-gray-500">First name</p>
            <p className="text-xs font-[600]">{data.firstName}</p>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Middle name</p>
            <p className="text-xs font-[600]">
              {data?.middleName ?? "---"}
            </p>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Last name</p>
            <p className="text-xs font-[600]">{data?.lastName}</p>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Gender</p>
            <p className="text-xs font-[600] capitalize">{data.gender}</p>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Date of Birth</p>
            <p className="text-xs font-[600]">{data.dateOfBirth}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

const StudentDetailCards: React.FC<IStudentDetails> = (
  data: IStudentDetails
) => {
  const { full_name, grade_name } = data;
  const { first_name, last_name, middle_name, gender, date_of_birth } =
    data.person_details;
  const studentDetails = {
    firstName: first_name,
    lastName: last_name,
    middleName: middle_name,
    gender,
    dateOfBirth: date_of_birth,
  };

  return (
    <div className="flex flex-col gap-4">
      <StudentAvatarAndName fullName={full_name} gradeName={grade_name} />
      <StudentDetaiCard {...studentDetails} />
    </div>
  );
};

export default StudentDetailCards;
