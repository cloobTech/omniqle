import React from "react";
import { Tabs } from "@mantine/core";
import AddStudentsFullOption from "../forms/AddStudentsFullOption";
import { CloseModal } from "@src/index";
import AddStudentPopover from "./AddStudentPopOver";
import AddStudentsQuickOption from "../forms/AddStudentsQuickOption";

interface AddStudentsTabProps {
  class_id: number;
}

const AddStudentsTab: React.FC<AddStudentsTabProps> = ({ class_id }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">Add Students</h3>
          <small className="text-gray-600">
            Add new students to this classroom
          </small>
        </div>
        <CloseModal />
      </div>
      <div className="flex gap-4 ">
        <AddStudentPopover
          title="What is Quick Add?"
          content="Quickly add Students with minimal infomation and update later"
        />
        <AddStudentPopover
          title="What is Full Option?"
          content="Enter all the required information to add students"
        />
      </div>
      <Tabs
        defaultValue="quickAdd"
        variant="pills"
        styles={{ tab: { fontSize: 12 } }}
      >
        <Tabs.List>
          <Tabs.Tab className="!font-bold shadow" value="quickAdd">
            Quick Add
          </Tabs.Tab>
          <Tabs.Tab className="!font-bold shadow" value="fullOption">
            Full Add Option
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="quickAdd">
          <AddStudentsQuickOption class_id={class_id} />
        </Tabs.Panel>
        <Tabs.Panel value="fullOption">
          <AddStudentsFullOption />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AddStudentsTab;
