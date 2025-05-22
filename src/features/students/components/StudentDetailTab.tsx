import React from "react";
import { Tabs } from "@mantine/core";
import StudentPersonalInfo from "./StudentPersonalInfo";
import StudentGuardianInfo from "./StudentGuadianInfo";
import StudentFeesInfo from "./StudentFeesInfo";

const StudentDetailTab: React.FC = () => {
  return (
    <div className="mt-4">
      <Tabs
        defaultValue="personalInformation"
        variant="pills"
        styles={{ tab: { fontSize: 12 } }}
      >
        <Tabs.List className="bg-[var(--primary-light)] p-2 rounded-lg">
          <Tabs.Tab value="personalInformation">Personal Information</Tabs.Tab>
          <Tabs.Tab value="guardian">Guardian</Tabs.Tab>
          <Tabs.Tab value="fees">Fees</Tabs.Tab>
          <Tabs.Tab value="assessments">Assessments</Tabs.Tab>
          <Tabs.Tab value="others">Others</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personalInformation">
          <StudentPersonalInfo />
        </Tabs.Panel>
        <Tabs.Panel value="guardian">
          <StudentGuardianInfo />
        </Tabs.Panel>
        <Tabs.Panel value="fees">
          <StudentFeesInfo />
        </Tabs.Panel>
        <Tabs.Panel value="assessments">Assessments panel</Tabs.Panel>
        <Tabs.Panel value="others">Others</Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default StudentDetailTab;
