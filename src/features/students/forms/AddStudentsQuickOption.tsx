import React, { useState } from "react";
import { TextInput, Button, Switch, Select, Group, Box } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import StudentAddList from "../components/StudentAddList";
import { Student } from "../components/StudentAddList";
import { useCreateStudentMutation } from "../services/api";
import AddStudentPopover from "../components/AddStudentPopOver";
import {  BsCalendarDateFill } from "react-icons/bs";

interface AddStudentsTabProps {
  class_id: number;
}

interface IAddStudents {
  students: Student[];
  class_id: number;
}

const AddStudentsQuickOption: React.FC<AddStudentsTabProps> = ({
  class_id,
}) => {
  const [checked, setChecked] = useState(false); // State to manage the switch for platform user
  // State to store the list of students
  const [students, setStudents] = useState<Student[]>([]);
  // Mutation to create students
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const calendarIcon = <BsCalendarDateFill className="text-black"/>;

  // Mantine form for student input
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      school_identifier: "",
      gender: null as string | null,
      date_of_birth: "",
      email: "",
      make_user: false,
    },

    validate: {
      first_name: (value) =>
        value.trim().length > 0 ? null : "First name is required",
      last_name: (value) =>
        value.trim().length > 0 ? null : "Last name is required",
      school_identifier: (value) =>
        value.trim().length > 0 ? null : "School ID is required",
      gender: (value) =>
        value && value.trim().length > 0 ? null : "Kindly select a gender",
      date_of_birth: (value) =>
        value.trim().length > 0 ? null : "Date of birth is required",
      email: (value) =>
        checked && value.trim().length > 0
          ? null
          : checked
          ? "Email is required if the switch is checked"
          : null,
    },
  });

  // Function to handle adding a student to the array
  const handleAddStudent = () => {
    if (form.validate().hasErrors) return;

    setStudents((prev) => [
      ...prev,
      {
        first_name: form.values.first_name,
        last_name: form.values.last_name,
        school_identifier: form.values.school_identifier,
        gender: form.values.gender,
        date_of_birth: form.values.date_of_birth,
        make_user: checked,
        ...(checked && { email: form.values.email }),
      },
    ]);

    // Reset the form after adding the student
    form.reset();
    setChecked(false);
    form.setFieldValue("gender", null);
  };

  // Function to handle saving the students to the backend
  const handleSave = async () => {
    const data: IAddStudents = {
      students,
      class_id,
    };
    try {
      const response = await createStudent({
        schoolId: 4,
        data,
      }).unwrap();

      console.log("Response from API:", response);

      notifications.show({
        position: "top-right",
        title: "Success",
        message: "Student(s) added successfully",
        color: "green",
      });
      // Reset the students array after saving
      setStudents([]);
    } catch (err: unknown) {
      notifications.show({
        title: "Error",
        position: "top-right",
        message: `${
          (err as any)?.data?.errors?.[0]?.message[0] ??
          "Something went wrong. Please try again."
        }`,
        color: "red",
      });
    }
  };

  // Function to handle removing a student from the array
  const handleRemoveStudent = (index: number) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box className={`py-4 flex ${students.length > 0 && "gap-8"}`}>
      <StudentAddList
        students={students}
        handleRemoveStudent={handleRemoveStudent}
      />

      <Box className="flex-1">
        <form onSubmit={form.onSubmit(handleAddStudent)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="Enter first name"
              {...form.getInputProps("first_name")}
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Enter last name"
              {...form.getInputProps("last_name")}
            />
            <TextInput
              withAsterisk
              label="School ID"
              placeholder="School ID / Student ID / Admission Number"
              {...form.getInputProps("school_identifier")}
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 items-center">
            <Select
              withAsterisk
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              placeholder="Select Gender"
              label="Gender"
              {...form.getInputProps("gender")}
            />

            <DateInput
              withAsterisk
              valueFormat="YYYY MMM DD"
              label="Date of Birth"
              placeholder="Date of Birth"
              {...form.getInputProps("date_of_birth")}
              rightSection={calendarIcon}
            />
            <div className="relative flex flex-col gap-1 justify-end min-h-[56px]">
              <div className="inline-flex items-center gap-2 border">
                <Switch
                  checked={checked}
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                  label="Make this student a platform user"
                />
                <AddStudentPopover
                  className="border"
                  withTitle={false}
                  content="A platform user is a student who can log in to the platform and access their information. This is optional and recommended for students who are 13 years or older."
                />
              </div>
              {checked && (
                <TextInput
                  withAsterisk
                  placeholder="Enter Student's Email"
                  {...form.getInputProps("email")}
                />
              )}
            </div>
          </div>
          <Group>
            <Button variant="light" type="submit">
              Add Student
            </Button>
            <Button
              disabled={students.length < 1 || isLoading}
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save to Database"}
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
};

export default AddStudentsQuickOption;
