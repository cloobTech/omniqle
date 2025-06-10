import { Tabs } from "@mantine/core";
import VerifyStudentWithFacialReg from "../forms/VerifyStudentWithFacialReg";
import VerifyStudentWithNIN from "../forms/VerifyStudentWithNIN";
const VerifyStudentTab = ({
  fullName,
  personId,
}: {
  fullName: string;
  personId: string;
}) => {
  return (
    <div className="">
      <Tabs
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
          <VerifyStudentWithNIN fullName={fullName} personId={personId} />
        </Tabs.Panel>
        <Tabs.Panel value="faceRecognition">
          <VerifyStudentWithFacialReg />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default VerifyStudentTab;
