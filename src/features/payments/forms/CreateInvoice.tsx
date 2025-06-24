import React, { useState } from "react";
import { Button, Select, TextInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { BsCalendarDateFill } from "react-icons/bs";
import { useGetGradeDisplayNamesQuery } from "@features/classes";
import { useAppDispatch, useAppSelector } from "@src/index";
import { updateField } from "../services/invoiceSlice";
import {
  generateAcademicSessions,
  schoolTerms,
} from "../utils/parseAcademicSession";
import type { CreateInvoiceState } from "../services/invoiceSlice";

interface ICreateInvoice {
  nextStep: () => void;
}

const CreateInvoice: React.FC<ICreateInvoice> = ({ nextStep }) => {
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const cachedInvoiceDetails = useAppSelector((state) => state.invoice);

  const [selectedClassOption, setSelectedClassOption] = useState<string | null>(
    cachedInvoiceDetails.level_id !== null
      ? String(cachedInvoiceDetails.level_id)
      : null
  );
  const { data: classrooms, isLoading: loadingClassrooms } =
    useGetGradeDisplayNamesQuery({
      schoolId: schoolId,
    });

  const dispatch = useAppDispatch();
  const calendarIcon = <BsCalendarDateFill className="text-black" />;
  const sessionOptions = generateAcademicSessions();

  // Transform object into a list of objects
  const classroomOptions =
    classrooms && Object.keys(classrooms).length > 0
      ? Object.entries(classrooms).map(([key, value]) => ({
          value: key,
          label: value as string,
        }))
      : [];

  const form = useForm<Partial<CreateInvoiceState>>({
    initialValues: {
      academic_session: cachedInvoiceDetails.academic_session || "",
      term: cachedInvoiceDetails.term || "",
      discipline: cachedInvoiceDetails.discipline || "",
      description: cachedInvoiceDetails.description || "",
      due_date: cachedInvoiceDetails.due_date || "",
      level_id: cachedInvoiceDetails.level_id || 0,
    },
    validate: {
      academic_session: (value) =>
        value ? null : "Academic session is required",
      term: (value) => (value ? null : "Term is required"),
      discipline: (value) =>
        selectedClassOption && parseInt(selectedClassOption, 10) > 9
          ? value
            ? null
            : "Discipline is required for classes above 9"
          : null,
      description: (value) => (value ? null : "Invoice title is required"),
      due_date: (value) => (value ? null : "Due date is required"),
      level_id: (value) => (value ? null : "Class level is required"),
    },
    // transformValues: (values) => ({
    //   ...values,
    //   level_id: values.level_id ? parseInt(values.level_id, 10) : undefined,
    // }),
  });

  const handleLoadLineItemsInvoice = () => {
    dispatch(updateField(form.values));

    nextStep();
  };

  return (
    <form className="grid gap-4">
      <TextInput
        label="Invoice/Bill title"
        placeholder="e.g. Primary 1 school fees"
        {...form.getInputProps("description")}
      />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Academic year"
          data={sessionOptions}
          placeholder="select academic year"
          {...form.getInputProps("academic_session")}
        />
        <Select
          label="Term"
          data={schoolTerms()}
          placeholder="select term"
          {...form.getInputProps("term")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          leftSection={loadingClassrooms ? <Loader size="xs" /> : null}
          searchable
          placeholder="select class level invioce is meant for"
          label="Class"
          value={selectedClassOption}
          data={classroomOptions}
          onChange={(value) => {
            setSelectedClassOption(value);
            const levelId = value ? parseInt(value, 10) : undefined;

            form.setFieldValue("level_id", levelId);

            // If level is 9 or below, clear discipline
            if (levelId !== undefined && levelId <= 9) {
              form.setFieldValue("discipline", "");
            }
          }}
        />
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Due date"
          placeholder="select due date"
          rightSection={calendarIcon}
          {...form.getInputProps("due_date")}
        />
      </div>
      {selectedClassOption && parseInt(selectedClassOption, 10) > 9 && (
        <Select
          searchable
          placeholder="select discipline"
          label="Discipline"
          data={["Act", "Science", "Commercial"]}
          {...form.getInputProps("discipline")}
        />
      )}
      <div className="flex justify-end mt-2">
        <Button onClick={handleLoadLineItemsInvoice} disabled={!form.isValid()}>
          {"Load invioce"}
        </Button>
      </div>
    </form>
  );
};

export default CreateInvoice;
