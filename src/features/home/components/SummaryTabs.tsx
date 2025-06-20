import React from "react";
import { Tabs } from "@mantine/core";
import EmployeeSummary from "./EmployeeSummaryTable";
import ClassSummary from "./ClassRoomsSummaryTable";
import PaymentSummaryTable from "./PaymentSummaryTable";

const QuestionTypeTabView: React.FC = () => {
  return (
    <div className="py-6">
      <Tabs defaultValue="gallery" color="darkgreen">
        <Tabs.List>
          <Tabs.Tab value="gallery">Employee</Tabs.Tab>
          <Tabs.Tab value="messages">Classes</Tabs.Tab>
          <Tabs.Tab value="settings">Payments</Tabs.Tab>
          <Tabs.Tab value="setting">Other Items</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <EmployeeSummary />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <ClassSummary />
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <PaymentSummaryTable />
        </Tabs.Panel>

        <Tabs.Panel value="setting">
          <p>Others</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default QuestionTypeTabView;
