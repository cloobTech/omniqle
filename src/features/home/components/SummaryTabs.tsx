import React from "react";
import { Tabs } from "@mantine/core";
import EmployeeSummary from "./EmployeeSummaryTable";

const QuestionTypeTabView: React.FC = () => {
  return (
    <div className="py-8">
      <Tabs defaultValue="gallery" color="darkgreen">
        <Tabs.List>
          <Tabs.Tab value="gallery">Employee</Tabs.Tab>
          <Tabs.Tab value="messages">Classes</Tabs.Tab>
          <Tabs.Tab value="settings">Others Items</Tabs.Tab>
          <Tabs.Tab value="setting">Other Items</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <EmployeeSummary />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <p>Classes</p>
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <p>Other Items</p>
        </Tabs.Panel>

        <Tabs.Panel value="setting">
          <p>Others</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default QuestionTypeTabView;
