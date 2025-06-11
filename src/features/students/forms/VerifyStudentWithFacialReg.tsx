import { TextInput } from "@mantine/core";
import { FaceCapture } from "@features/verification";

const VerifyStudentWithFacialReg = ({
  fullName,
  personId,
}: {
  fullName: string;
  personId: string;
}) => {
  return (
    <div>
      <div className="grid gap-4">
        <TextInput
          styles={{
            input: {
              color: "#333333",
            },
          }}
          label="Full Name"
          disabled
          value={fullName}
        />
        <FaceCapture personId={personId} />
      </div>
    </div>
  );
};

export default VerifyStudentWithFacialReg;
