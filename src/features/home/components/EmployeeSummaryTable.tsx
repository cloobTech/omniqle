import React from "react";
import { Table } from "@mantine/core";

const EmployeeSummary: React.FC = () => {
  const elements = [
    { position: 6, mass: 12.011, symbol: 6, name: "Study On Carbon" },
    { position: 7, mass: 14.007, symbol: 5, name: "Study On Nitrogen" },
    { position: 39, mass: 88.906, symbol: 38, name: "Study On Yttrium" },
    { position: 56, mass: 137.33, symbol: 12, name: "Study On Barium" },
    { position: 58, mass: 140.12, symbol: 40, name: "Study On Cerium" },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name} className=" -b  rounded-md">
      <Table.Td className="p-3 ">{element.name}</Table.Td>
      <Table.Td className="p-3 ">{element.position}</Table.Td>
      <Table.Td className="p-3 ">{element.symbol}</Table.Td>
      <Table.Td className="p-3 ">{element.mass}</Table.Td>
      <Table.Td className="p-3 ">{element.mass}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="bg-white p-4 rounded mt-4">
      <h1 className="font-bold text-sm px-2 mb-2">All Employees</h1>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <Table.Thead>
          <Table.Tr className="!bg-blue-500">
            <Table.Th className="!bg-primary-light">Name</Table.Th>
            <Table.Th className="!bg-primary-light">Role</Table.Th>
            <Table.Th className="!bg-primary-light">Email</Table.Th>
            <Table.Th className="!bg-primary-light">Grade</Table.Th>
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
