import React from "react";
import { Button } from "@mantine/core";
import { useModal } from "@src/index";
import InvoiceStepper from "./InvoiceStepper";
import { Table } from "@mantine/core";

const InvoiceTable: React.FC = () => {
  const { showModal } = useModal();

  const classrooms = [
    {
      id: 4,
      name: "Primar 1 School Fees",
      total_students: "2025/2026",
      completed_payments: 22,
      owing_students: "1st Term",
      expected_income: "25th September 2025", // Example date
    },
    {
      id: 1,
      name: "Primar 1 School Fees",
      total_students: "2025/2026",
      completed_payments: 25,
      owing_students: "1st Term",
      expected_income: "25th September 2025", // Example date // Example in currency
    },
    {
      id: 2,
      name: "JSS 2 School Fees",
      total_students: "2025/2026",
      completed_payments: 20,
      owing_students: "1st Term",
      expected_income: "25th September 2025", // Example date
    },
    {
      id: 3,
      name: "JSS 3",
      total_students: "2025/2026",
      completed_payments: 30,
      owing_students: "1st Term",
      expected_income: "25th September 2025", // Example date
    },
  ];

  // Map classroom data to table rows
  const rows = classrooms.map((classroom) => (
    <Table.Tr key={classroom.id} className="rounded-md">
      <Table.Td className="p-3">{classroom.name}</Table.Td>
      <Table.Td className="p-3">{classroom.total_students}</Table.Td>
      <Table.Td className="p-3">{classroom.completed_payments}</Table.Td>
      <Table.Td className="p-3">{classroom.owing_students}</Table.Td>
      <Table.Td className="p-3">{classroom.expected_income}</Table.Td>
    </Table.Tr>
  ));

  const showCreateInvoiceForm = () => {
    showModal(<InvoiceStepper />, {});
  };

  return (
    <div className="bg-white min-h-[300px] mt-4 rounded p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold px-2 mb-2 text-sm">Invoices</h1>
        <Button onClick={showCreateInvoiceForm}>Create Invoice</Button>
      </div>

      <section>
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
          <Table.Thead
            style={{
              fontSize: "12px",
              fontWeight: 200,
              color: "#4b5563", // Tailwind gray-600
            }}
          >
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Academic Year</Table.Th>
              <Table.Th>Class</Table.Th>
              <Table.Th>Term</Table.Th>
              <Table.Th>Due Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>See More</Table.Caption>
        </Table>
      </section>
    </div>
  );
};

export default InvoiceTable;
