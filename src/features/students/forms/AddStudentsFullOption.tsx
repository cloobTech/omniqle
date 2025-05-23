import React from "react";
import { Select, TextInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

// import { useForm } from "@mantine/form";

const AddStudentsFullOption: React.FC = () => {
  return (
    <div>
      <form className="">
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="Enter First Name"
          />
          <TextInput
            withAsterisk
            label="Last Name"
            placeholder="Enter Last Name"
          />
          <TextInput label="Middle Name" placeholder="Enter Last Name" />
        </div>
        <div className="space-y-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Select withAsterisk label="Gender" data={["Male", "female"]} />
          <TextInput
            withAsterisk
            label="Date of Birth"
            placeholder="Enter Date of Birth"
            type="date"
          />
          <TextInput
            withAsterisk
            label="Admission Number"
            placeholder="Enter Admission Number"
          />
        </div>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            withAsterisk
            label="Phone Number"
            placeholder="Enter Phone Number"
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Enter Email"
            type="email"
          />
          <TextInput withAsterisk label="Address" placeholder="Enter Address" />
        </div>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            withAsterisk
            label="Guardian Name"
            placeholder="Enter Guardian Name"
          />
          <TextInput
            withAsterisk
            label="Guardian Phone Number"
            placeholder="Enter Guardian Phone Number"
          />
          <TextInput
            withAsterisk
            label="Guardian Email"
            placeholder="Enter Guardian Email"
            type="email"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              notifications.show({
                title: "Success",
                message: "Student added successfully",
                color: "green",
              });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add Student
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentsFullOption;
