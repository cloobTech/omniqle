import React from "react";
import { Button, Table, Pagination } from "@mantine/core";
import {
  BsArrowDownUp,
  BsQuestionCircle,
  BsCheckCircle,
  BsXCircle,
  BsChevronRight,
} from "react-icons/bs";

import { HiPencilSquare } from "react-icons/hi2";
import { useModal } from "@src/index";
import { Grade } from "@features/classes/components/ClassRoomCards";
import { useGetStudentsQuery } from "@features/students/services/api";
import { IPagination } from "@src/index";
import { useNavigate } from "react-router-dom";
import AddStudentsTab from "./AddStudentsTab";
import { EditClassroom } from "@features/classes";
import { extractDetailsToUpdateClassroom } from "../utils/extractDetailsToUpdateClassroom";

interface Student {
  id: number;
  person_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  age: number;
  school_identifier: string;
  verification_status: string;
}

interface ManageClassRoomTableProps {
  grade: Grade;
  classLevelName: string;
}

const ManageClassTable: React.FC<ManageClassRoomTableProps> = ({
  grade,
  classLevelName,
}) => {
  const navigate = useNavigate();
  const { data } = useGetStudentsQuery({
    schoolId: 4,
    grade_id: grade.id,
  });
  const students = data?.students || [];
  const { showModal } = useModal();

  const handleEditClassroom = () => {
    // Extract the details needed for the EditClassroom component

    const extractedDetails = extractDetailsToUpdateClassroom({
      data,
      classLevelName,
    });

    // Open the modal with the EditClassroom component and pass the extracted details
    // @ts-ignore
    showModal(<EditClassroom {...extractedDetails} />, {});
  };

  const pagination: IPagination =
    data?.pagination ??
    ({
      current_page: 1,
      limit_value: 10,
      total_count: students.length,
      total_pages: Math.ceil(students.length / 10),
    } as any);

  // Sort icon for table headers
  const sortIcon = (title: string): React.ReactNode => {
    return (
      <div className="flex items-center gap-2 text-xs font-light text-gray-500">
        <p>{title}</p>
        <BsArrowDownUp />
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg mt-4 min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold px-2 mb-2">All Students</h1>
        <div className="flex items-center gap-2 ">
          <Button
            variant="outline"
            leftSection={<HiPencilSquare />}
            onClick={handleEditClassroom}
          >
            Edit Class
          </Button>
          <Button
            onClick={() =>
              showModal(<AddStudentsTab class_id={grade.id} />, {
                withCloseButton: false,
                size: "auto",
              })
            }
          >
            Add Student
          </Button>
        </div>
      </div>
      <Table
        stickyHeader
        stickyHeaderOffset={60}
        highlightOnHover
        styles={{
          thead: {
            backgroundColor: "#f3f4f6", // This is the gray color (similar to bg-gray-200)
          },
          th: {
            backgroundColor: "#f3f4f6", // Ensure the th cells also have the same background
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{sortIcon("Full Name")}</Table.Th>
            <Table.Th>{sortIcon("Age")}</Table.Th>
            <Table.Th>{sortIcon("Gender")}</Table.Th>
            <Table.Th>{sortIcon("Status")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {students.map((student: Student) => {
            let statusIcon;
            let statusColor;

            switch (student.verification_status) {
              case "unverified":
                statusIcon = <BsQuestionCircle />;
                statusColor = "bg-yellow-500";
                break;
              case "verified":
                statusIcon = <BsCheckCircle />;
                statusColor = "bg-green-600/80";
                break;
              case "rejected":
                statusIcon = <BsXCircle />;
                statusColor = "bg-red-500";
                break;
              default:
                statusIcon = null;
                statusColor = "bg-gray-500";
            }

            return (
              <Table.Tr
                key={student.id}
                className="relative hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  navigate(`/dashboard/students/profile/${student.id}`, {
                    state: {
                      personId: student.person_id,
                    },
                  })
                }
              >
                <Table.Td>{student.full_name}</Table.Td>
                <Table.Td>{student.age}</Table.Td>
                <Table.Td className="capitalize">{student.gender}</Table.Td>
                <Table.Td
                  className={`p-1 text-xs text-white rounded-3xl my-1 inline-flex items-center gap-2 ${statusColor}`}
                >
                  {statusIcon}
                  {student.verification_status}
                </Table.Td>

                {/* Angle-right icon */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-900">
                  <BsChevronRight />
                </div>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <section className="mt-auto">
        <hr className="my-2 text-gray-500" />
        <div className="flex justify-between items-center">
          <small>
            showing <span className="font-bold">1-{students.length}</span> of{" "}
            <span className="font-bold">{students.length}</span> entries
          </small>
          <Pagination
            total={Math.ceil(pagination.total_count / pagination.limit_value)}
            value={pagination.current_page}
          />
        </div>
      </section>
    </div>
  );
};

export default ManageClassTable;
