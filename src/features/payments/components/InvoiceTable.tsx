import React, { useState, useEffect } from "react";
import { Button, TextInput, Pagination } from "@mantine/core";
import { useModal } from "@src/index";
import InvoiceStepper from "./InvoiceStepper";
import { Table } from "@mantine/core";
import { useAppSelector } from "@src/index";
import { useGetSchoolInvoicesQuery } from "../services/api";
import type { InvoiceFromBackend, IFilterProps } from "../types";
import { formatDate } from "../utils/dateFormatter";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { FilterTable } from "@features/shared";

const InvoiceTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showModal } = useModal();
  const [filters, setFilters] = useState<IFilterProps>({});
  const schoolId = useAppSelector((state) => state.school.schoolId);
  const queryResult = schoolId
    ? useGetSchoolInvoicesQuery({
        schoolId: schoolId,
        ...filters,
      })
    : null;

  const paginationDetails = queryResult?.data?.pagination;
  const invoices = queryResult?.data?.invoices;

  const showCreateInvoiceForm = () => {
    showModal(<InvoiceStepper />, {});
  };

  const handleApplyFilters = (newFilters: IFilterProps) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    setSearchParams(params);
  };

  useEffect(() => {
    setFilters({
      academic_session: searchParams.get("academic_session") || undefined,
      discipline: searchParams.get("discipline") || undefined,
      term: searchParams.get("term") || undefined,
    });
  }, []);

  // Map classroom data to table rows
  const rows = invoices?.map((Invoice: Partial<InvoiceFromBackend>) => (
    <Table.Tr key={Invoice._id} className="rounded-md">
      <Table.Td className="p-3 capitalize">{Invoice.description}</Table.Td>
      <Table.Td className="p-3">{Invoice.academic_session}</Table.Td>
      <Table.Td className="p-3 capitalize">{Invoice.term}</Table.Td>
      <Table.Td className="p-3">{formatDate(Invoice.due_date)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white min-h-[300px] mt-4 rounded p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold px-2 mb-2 text-sm">Invoices</h1>
        <div className="flex items-center gap-2">
          <FilterTable
            filters={{
              term: [
                { value: "first", label: "First Time" },
                { value: "second", label: "Second Term" },
              ],
              discipline: [
                { value: "science", label: "Science" },
                { value: "act", label: "Act" },
                { value: "commercial", label: "Commercial" },
              ],
              academic_session: [
                { value: "2025/2026", label: "2025/2026" },
                { value: "2026/2027", label: "2026/2027" },
                { value: "2027/2028", label: "2027/2028" },
              ],
            }}
            onApply={handleApplyFilters}
            filterState={{
              loading: queryResult?.isFetching ?? false,
              onSuccess: queryResult?.isSuccess ?? false,
            }}
          />

          <TextInput
            placeholder="Search invoices..."
            leftSection={<BsSearch />}
            styles={{
              input: {
                backgroundColor: "#f3f4f6", // Tailwind gray-100
              },
              section: {
                color: "#6b7280", // Tailwind gray-500 for the icon
              },
            }}
          />
          <Button onClick={showCreateInvoiceForm}>Create Invoice</Button>
        </div>
      </div>

      <section className="flex flex-col h-full min-h-[280px]">
        <div className="flex-1">
          <Table
            stickyHeader
            stickyHeaderOffset={60}
            highlightOnHover
            styles={{
              thead: {
                backgroundColor: "#f3f4f6",
              },
              th: {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            <Table.Thead
              style={{
                fontSize: "12px",
                fontWeight: 200,
                color: "#4b5563",
              }}
            >
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Academic Year</Table.Th>
                <Table.Th>Term</Table.Th>
                <Table.Th>Due Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <small>
            showing <span className="font-bold">1-{invoices?.length}</span> of{" "}
            <span className="font-bold">{invoices?.length}</span> entries
          </small>
          <Pagination total={paginationDetails?.total_pages} />
        </div>
      </section>
    </div>
  );
};

export default InvoiceTable;
