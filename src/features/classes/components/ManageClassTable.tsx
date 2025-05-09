import React from "react";
import { Table } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { BsArrowDownUp } from "react-icons/bs";
import { Pagination } from "@mantine/core";
import CreateClassRoom from "../forms/CreateClassRoom";
import { useModal } from "@src/index";

const ManageClassTable: React.FC = () => {
  const { showModal } = useModal();
  const sortIcon = (title: string): React.ReactNode => {
    return (
      <div className="flex items-center gap-2">
        <p>{title}</p>
        <BsArrowDownUp />
      </div>
    );
  };

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
  const elements = [
    {
      total_student: 43,

      form_teacher: "Tunde Doe",
      name: "JSS 1A",
    },
    {
      total_student: 23,

      form_teacher: "Isah Cake",
      name: "JSS 1B",
    },
    {
      total_student: 43,

      form_teacher: "Adam Jam",
      name: "JSS 1C",
    },
    {
      total_student: 45,

      form_teacher: "Janet Best",
      name: "SS 1A",
    },
    {
      total_student: 24,

      form_teacher: "Aisha John",
      name: "SS 1B",
    },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td className="p-3 ">{<FiExternalLink />}</Table.Td>
      <Table.Td className="p-3 ">{element.name}</Table.Td>
      <Table.Td className="p-3 ">{element.form_teacher}</Table.Td>
      <Table.Td className="p-3 ">{element.total_student}</Table.Td>
      <Table.Td className="p-3 ">{action}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold px-2 mb-2">All Classes</h1>
        <button
          className="btn"
          onClick={() =>
            showModal(<CreateClassRoom />, { title: "Create Classroom" })
          }
        >
          Add Classes
        </button>
      </div>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <Table.Thead>
          <Table.Tr className="!bg-blue-500">
            <Table.Th className="!bg-primary-light">
              {<FiExternalLink />}
            </Table.Th>
            <Table.Th className="!bg-primary-light">
              {sortIcon("Classes")}
            </Table.Th>
            <Table.Th className="!bg-primary-light">
              {sortIcon("Assigned Teacher")}
            </Table.Th>
            <Table.Th className="!bg-primary-light">
              {sortIcon("Student")}
            </Table.Th>
            <Table.Th className="!bg-primary-light">
              {sortIcon("Action")}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <section>
        <hr className="my-4  text-gray-500" />
        <div className="flex justify-between items-center">
          <small>
            showing <span className="font-bold">1-10</span> of{" "}
            <span className="font-bold">240</span> entries
          </small>
          <Pagination total={10} color="black" />
        </div>
      </section>
    </div>
  );
};

export default ManageClassTable;
