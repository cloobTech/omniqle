import React from "react";
import { Button, Select, TextInput } from "@mantine/core";
import ModalHeader from "@src/components/ModalHeader";

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
      <ModalHeader
        title="Edit Class"
        subTitle="update the details of this classroom"
      />
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
