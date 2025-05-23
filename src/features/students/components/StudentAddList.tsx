import React from "react";
import { Box } from "@mantine/core";

export interface Student {
  first_name: string;
  last_name: string;
  school_identifier: string;
  gender: string | null;
  date_of_birth: string;
  email?: string;
  make_user?: boolean;
}

interface StudentListProps {
  students: Student[];
  handleRemoveStudent: (index: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  handleRemoveStudent,
}) => {
  return (
    <Box
      className={`shadow-md rounded-lg transition-all duration-300 bg-[var(--primary-light)] ${
        students.length > 0
          ? "opacity-100 max-h-screen w-64 p-2"
          : "opacity-0 max-h-0 w-0"
      }`}
    >
      <div>
        <div className="text-center text-sm font-bold mb-2">
          <span>{`${students.length} ${
            students.length > 1 ? "Students" : "Student"
          } Added`}</span>
        </div>
        <ul className="">
          {students.map((student, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-xs shadow p-2 rounded-md mb-2"
            >
              <small>
                {index + 1}. {student.first_name} {student.last_name} (School
                ID: {student.school_identifier})
              </small>
              <button
                onClick={() => handleRemoveStudent(index)}
                className="text-red-500 !font-bold ml-2 bg-white p-1 px-2 rounded cursor-pointer hover:bg-red-100 transition duration-200 "
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default StudentList;
