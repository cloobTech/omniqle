import CloseModal from "@src/components/CloseModal";
import VerifyStudentTab from "./VerifyStudentTab";

const VerifyStudent = ({
  fullName,
  personId,
}: {
  fullName: string;
  personId: string;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <p className="font-semibold">Verify student</p>
          <small className="text-gray-600">
            verify this student's indentity
          </small>
        </div>
        <CloseModal />
      </div>
      <VerifyStudentTab fullName={fullName} personId={personId} />
    </div>
  );
};

export default VerifyStudent;
