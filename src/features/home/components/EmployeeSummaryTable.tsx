import React from "react";
import { Table } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeSummary: React.FC = () => {
  // Example employee data for a school
  const employees = [
    {
      id: 1,
      name: "John Doe",
      role: "Math Teacher",
      email: "john.doe@school.com",
      department: "Mathematics",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Science Teacher",
      email: "jane.smith@school.com",
      department: "Science",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Principal",
      email: "michael.brown@school.com",
      department: "Administration",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "English Teacher",
      email: "emily.davis@school.com",
      department: "English",
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

  // Map employee data to table rows
  const rows = employees.map((employee) => (
    <Table.Tr key={employee.id} className="rounded-md">
      <Table.Td className="p-3">{employee.name}</Table.Td>
      <Table.Td className="p-3">{employee.role}</Table.Td>
      <Table.Td className="p-3">{employee.email}</Table.Td>
      <Table.Td className="p-3">{employee.department}</Table.Td>
      <Table.Td className="p-3">{action}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white p-4 rounded mt-4">
      <h1 className="font-bold text-sm px-2 mb-2">Employees in School</h1>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <Table.Thead>
          <Table.Tr className="!bg-blue-500">
            <Table.Th className="!bg-primary-light">Name</Table.Th>
            <Table.Th className="!bg-primary-light">Role</Table.Th>
            <Table.Th className="!bg-primary-light">Email</Table.Th>
            <Table.Th className="!bg-primary-light">Department</Table.Th>
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

export default EmployeeSummary;
