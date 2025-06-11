import React from "react";
import CloseModal from "@src/components/CloseModal";
import { Button, Select, TextInput } from "@mantine/core";

interface IUpdateClassromm {
  className: string;
  classLevelName: string;
  classTeacher: { value: string; label: string }[];
  classPrefect: { value: string; label: string }[];
  asstClassPrefect: { value: string; label: string }[];
}

const EditClassroom: React.FC<IUpdateClassromm> = (
  details: IUpdateClassromm
) => {
  return (
    <div className="w-[520px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-sm">Edit Class</p>
          <small className="text-xs text-gray-500">
            update the details of this classroom
          </small>
        </div>
        <CloseModal />
      </div>
      <form className="mt-6 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <TextInput disabled label="Class" value={details.classLevelName} />
          <TextInput label="Class name" value={details.className} />
        </div>
        <Select
          label="Assign New Class Teacher"
          placeholder="Select Class Teacher"
          data={["Yet to be implemented"]}
          clearable
        />
        <Select
          label="Assign New Class Prefect/Captain"
          placeholder="Select Class Prefect/Captain"
          data={details.classPrefect}
          clearable
        />
        <Select
          label="Assign New Class Assistant Prefect/Captain"
          placeholder="Select Class Asst. Prefect/Captain"
          data={details.asstClassPrefect}
          clearable
        />
        <div className="flex justify-end">
          <Button size="xs">Update class</Button>
        </div>
      </form>
    </div>
  );
};

export default EditClassroom;
