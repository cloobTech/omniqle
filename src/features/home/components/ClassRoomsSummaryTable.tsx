import React from "react";
import { Table } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";

const ClassSummary: React.FC = () => {
  // Example class data for a school
  const classes = [
    {
      id: 1,
      name: "JSS 1A",
      teacher: "John Doe",
      num_students: 30,
    },
    {
      id: 2,
      name: "JSS 1B",
      teacher: "Jane Smith",
      num_students: 25,
    },
    {
      id: 3,
      name: "JSS 2A",
      teacher: "Michael Brown",
      num_students: 28,
    },
    {
      id: 4,
      name: "JSS 2B",
      teacher: "Emily Davis",
      num_students: 32,
    },
  ];

  // Action buttons for each row
  const action = (
    <div className="flex gap-4 text-gray-600">
      <div className="flex gap-1 items-center">
        <FaEdit />
        <small>Edit</small>
      </div>
      <div className="flex gap-1 items-center">
        <FaTrash />
        <small>Delete</small>
      </div>
    </div>
  );

  // Map class data to table rows
  const rows = classes.map((classItem) => (
    <Table.Tr key={classItem.id} className="rounded-md">
      <Table.Td className="p-3">{classItem.name}</Table.Td>
      <Table.Td className="p-3">{classItem.teacher}</Table.Td>
      <Table.Td className="p-3">{classItem.num_students}</Table.Td>
      <Table.Td className="p-3">{action}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white p-4 rounded mt-4">
      <h1 className="font-bold text-sm px-2 mb-2">Class Summary</h1>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <Table.Thead>
          <Table.Tr className="!bg-blue-500">
            <Table.Th className="!bg-primary-light">Class Name</Table.Th>
            <Table.Th className="!bg-primary-light">Assigned Teacher</Table.Th>
            <Table.Th className="!bg-primary-light">Number of Students</Table.Th>
            <Table.Th className="!bg-primary-light">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Caption>See More</Table.Caption>
      </Table>
      <section>
        <hr />
        <small>pagination goes here</small>
      </section>
    </div>
  );
};

export default ClassSummary;