import React from "react";
import { Button, Table } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsArrowDownUp } from "react-icons/bs";
import { Pagination } from "@mantine/core";
import { useModal } from "@src/index";
import { AddStudentsTab } from "@features/students";
import StudentDetails from "./StudentDetails";
import { Grade } from "@features/classes/components/ClassRoomCards";
import { useGetStudentsQuery } from "@features/students/services/api";

// interface Student {
//   id: number;
//   first_name: string;
//   last_name: string;
//   age: number;
//   gender: string;
//   class_name: string;
// }

interface ManageClassRoomTableProps {
  grade: Grade;
}

const ManageClassTable: React.FC<ManageClassRoomTableProps> = ({ grade }) => {
  const { data } = useGetStudentsQuery({
    schoolId: 4,
    grade_id: grade.id,
  });

  console.log({ data });
  const students = data?.students || [];
  // const pagination = data?.pagination || {};

  const { showModal } = useModal();

  console.log(data);

  // Sort icon for table headers
  const sortIcon = (title: string): React.ReactNode => {
    return (
      <div className="flex items-center gap-2 text-xs font-light text-gray-500">
        <p>{title}</p>
        <BsArrowDownUp />
      </div>
    );
  };

  // Action buttons for each row
  const action = (
    <div className="flex gap-4 text-gray-600">
      <div className="flex gap-1 item-center">
        <FaEdit />
        <small>Edit</small>
      </div>
      <div className="flex gap-1 item-center">
        <FaTrash />
        <small>Delete</small>
      </div>
    </div>
  );

  // Map student data to table rows
  const rows = students.map((student: any) => (
    <Table.Tr
      key={student.id}
      onClick={() =>
        showModal(<StudentDetails />, {
          withCloseButton: false,
          size: "80%",
        })
      }
    >
      <Table.Td className="p-3">{student.first_name}</Table.Td>
      <Table.Td className="p-3">{student.last_name}</Table.Td>
      <Table.Td className="p-3">17</Table.Td>
      <Table.Td className="p-3">Male</Table.Td>
      <Table.Td
        className={`${
          student.verification_status === "unverified"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-800"
        }`}
      >
        {student.verification_status}
      </Table.Td>
      <Table.Td className="p-3">{action}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold px-2 mb-2">Students in ...</h1>
        <Button
          onClick={() =>
            showModal(<AddStudentsTab class_id={grade.id} />, {
              size: "100%",
              withCloseButton: false,
              fullScreen: true,
            })
          }
        >
          Add Student
        </Button>
      </div>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              style={{
                backgroundColor: "var(--primary-light)",
              }}
            >
              {sortIcon("First Name")}
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: "var(--primary-light)",
              }}
            >
              {sortIcon("Last Name")}
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: "var(--primary-light)",
              }}
            >
              {sortIcon("Age")}
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: "var(--primary-light)",
              }}
            >
              {sortIcon("Gender")}
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: "var(--primary-light)",
              }}
            >
              {sortIcon("Status")}
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: "var(--primary-light)",
              }}
            >
              {sortIcon("Action")}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <section>
        <hr className="my-4 text-gray-500" />
        <div className="flex justify-between items-center">
          <small>
            showing <span className="font-bold">1-{students.length}</span> of{" "}
            <span className="font-bold">{students.length}</span> entries
          </small>
          <Pagination total={1} />
        </div>
      </section>
    </div>
  );
};

export default ManageClassTable;
