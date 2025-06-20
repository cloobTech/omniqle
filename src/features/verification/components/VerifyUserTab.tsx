import { useState } from "react";
import { Tabs } from "@mantine/core";
import VerifyStudentWithFacialReg from "../forms/VerifyUserWithFacialReg";
import VerifyUserWithNin from "../forms/VerifyUserWithNIN";

const VerifyUserTab = ({
  fullName,
  personId,
}: {
  fullName: string;
  personId: string;
}) => {
  const [activeTab, setActiveTab] = useState<string | null>("nin");
  return (
    <div className="">
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        defaultValue="nin"
        variant="pills"
        styles={{ tab: { fontSize: 12 } }}
      >
        <Tabs.List className="mb-6">
          <Tabs.Tab className="!font-bold shadow" value="nin">
            National Identification Number (NIN)
          </Tabs.Tab>
          <Tabs.Tab className="!font-bold shadow" value="faceRecognition">
            Facial Recognition
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="nin">
          <VerifyUserWithNin fullName={fullName} personId={personId} />
        </Tabs.Panel>
        <Tabs.Panel value="faceRecognition">
          {activeTab === "faceRecognition" && (
            <VerifyStudentWithFacialReg
              personId={personId}
              fullName={fullName}
            />
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default VerifyUserTab;
