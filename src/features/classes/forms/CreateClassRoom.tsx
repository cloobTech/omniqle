import React, { useState } from "react";
import { BsPlusCircle, BsInfoCircle } from "react-icons/bs";
import { Select, TextInput, Textarea, Popover, Text } from "@mantine/core";

function Info() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <div className="inline-flex gap-2 text-xs bg-primary-light p-1 rounded mb-2">
          <BsInfoCircle className="text-primary" />
          <small className="text-gray-500">what is class level?</small>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">explain level</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

const ClassForm: React.FC = () => {
  return (
    <div className="space-y-4 flex-1 mb-4">
      <Select
        withAsterisk
        label="Class Level"
        placeholder="Pick a level"
        data={Array.from({ length: 15 }, (_, i) => ({
          value: `${i + 1}`,
          label: `Level ${i + 1}`,
        }))}
        clearable
      />
      <TextInput
        withAsterisk
        label="Enter ClassName"
        placeholder="E.G JSS 1A"
      />
    </div>
  );
};

const CreateClassRoom: React.FC = () => {
  const [forms, setForms] = useState<number[]>([1]); // Array to track form instances

  const addClassForm = () => {
    setForms((prev) => [...prev, prev.length + 1]); // Add a new form
  };

  return (
    <section className="flex flex-col h-[80vh]">
      <Info />
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {forms.map((formId, index) => (
          <div key={formId} className="mb-6">
            {index > 0 && <hr className="border-t border-gray-300 my-4" />}{" "}
            {/* Divider */}
            <ClassForm />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-end gap-4 bg-white pt-4">
        <div
          className="flex items-center text-sm text-gray-700 gap-2 justify-end mt-2 cursor-pointer"
          onClick={addClassForm}
        >
          <BsPlusCircle />
          Add class
        </div>
        <div className="flex justify-end">
          <button className="btn rounded py-1">Create classrooms</button>
        </div>
      </div>
    </section>
  );
};

export default CreateClassRoom;
