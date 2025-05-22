import React from "react";
import { Button, Table } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsArrowDownUp } from "react-icons/bs";
import { Pagination } from "@mantine/core";
import { useModal } from "@src/index";
import AddStudents from "../forms/AddStudents";
import StudentDetails from "./StudentDetails";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  class_name: string;
}

const ManageClassTable: React.FC = () => {
  const { showModal } = useModal();

  // Example student data
  const students: Student[] = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      age: 15,
      gender: "Male",
      class_name: "JSS 1A",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      age: 14,
      gender: "Female",
      class_name: "JSS 1A",
    },
    {
      id: 3,
      first_name: "Michael",
      last_name: "Brown",
      age: 16,
      gender: "Male",
      class_name: "JSS 1B",
    },
    {
      id: 4,
      first_name: "Emily",
      last_name: "Davis",
      age: 15,
      gender: "Female",
      class_name: "JSS 1B",
    },
    {
      id: 5,
      first_name: "John",
      last_name: "Doe",
      age: 15,
      gender: "Male",
      class_name: "JSS 1A",
    },
    {
      id: 6,
      first_name: "Jane",
      last_name: "Smith",
      age: 14,
      gender: "Female",
      class_name: "JSS 1A",
    },
    {
      id: 7,
      first_name: "Michael",
      last_name: "Brown",
      age: 16,
      gender: "Male",
      class_name: "JSS 1B",
    },
    {
      id: 8,
      first_name: "Emily",
      last_name: "Davis",
      age: 15,
      gender: "Female",
      class_name: "JSS 1B",
    },
  ];

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
  const rows = students.map((student) => (
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
      <Table.Td className="p-3">{student.age}</Table.Td>
      <Table.Td className="p-3">{student.gender}</Table.Td>
      <Table.Td className="p-3">{action}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold px-2 mb-2">Students in ...</h1>
        <Button
          onClick={() =>
            showModal(<AddStudents />, {
              size: "100%",
              withCloseButton: false,
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
          <Pagination total={10} />
        </div>
      </section>
    </div>
  );
};

export default ManageClassTable;
