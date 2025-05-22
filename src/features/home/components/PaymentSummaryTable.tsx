import React from "react";
import { Table } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";

const PaymentSummaryTable: React.FC = () => {
  // Example payment data for classrooms
  const classrooms = [
    {
      id: 1,
      name: "JSS 1A",
      total_students: 30,
      completed_payments: 25,
      owing_students: 5,
      expected_income: 300000, // Example in currency
    },
    {
      id: 2,
      name: "JSS 1B",
      total_students: 28,
      completed_payments: 20,
      owing_students: 8,
      expected_income: 280000,
    },
    {
      id: 3,
      name: "JSS 2A",
      total_students: 32,
      completed_payments: 30,
      owing_students: 2,
      expected_income: 320000,
    },
    {
      id: 4,
      name: "JSS 2B",
      total_students: 25,
      completed_payments: 22,
      owing_students: 3,
      expected_income: 250000,
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

  // Map classroom data to table rows
  const rows = classrooms.map((classroom) => (
    <Table.Tr key={classroom.id} className="rounded-md">
      <Table.Td className="p-3">{classroom.name}</Table.Td>
      <Table.Td className="p-3">{classroom.total_students}</Table.Td>
      <Table.Td className="p-3">{classroom.completed_payments}</Table.Td>
      <Table.Td className="p-3">{classroom.owing_students}</Table.Td>
      <Table.Td className="p-3">{`₦${classroom.expected_income.toLocaleString()}`}</Table.Td>
      <Table.Td className="p-3">{action}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white p-4 rounded mt-4">
      <h1 className="font-bold text-sm px-2 mb-2">Payment Summary</h1>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <Table.Thead>
          <Table.Tr className="!bg-blue-500">
            <Table.Th className="!bg-primary-light">Classroom</Table.Th>
            <Table.Th className="!bg-primary-light">Total Students</Table.Th>
            <Table.Th className="!bg-primary-light">
              Completed Payments
            </Table.Th>
            <Table.Th className="!bg-primary-light">Owing Students</Table.Th>
            <Table.Th className="!bg-primary-light">Expected Income</Table.Th>
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

export default PaymentSummaryTable;
