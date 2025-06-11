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
  const [activeTab, setActiveTab] = React.useState("quickAdd"); // Track the active tab

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-sm">Add Students</h3>
          <small className="text-gray-600 text-xs">
            Add new students to this classroom
          </small>
        </div>
        <CloseModal />
      </div>

      <Tabs
        value={activeTab}
        onChange={(value) => value !== null && setActiveTab(value)} // Update the active tab state
        variant="pills"
        styles={{ tab: { fontSize: 12 } }}
      >
        <Tabs.List>
          <Tabs.Tab value="quickAdd">
            <div className="flex items-center gap-2">
              Quick Add
              <AddStudentPopover
                iconColor={activeTab === "quickAdd" ? "white" : "black"} // Change icon color
                position="top"
                content="Quickly add Students with minimal information and update later"
              />
            </div>
          </Tabs.Tab>
          <Tabs.Tab value="fullOption">
            <div className="flex items-center gap-2">
              Full Add Option
              <AddStudentPopover
                iconColor={activeTab === "fullOption" ? "white" : "black"} // Change icon color
                position="top"
                content="Enter all the required information to add students"
              />
            </div>
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
