import CloseModal from "@src/components/CloseModal";
import VerifyUserTab from "./VerifyUserTab";

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
          <p className="font-semibold text-sm">Verify User</p>
          <small className="text-gray-600">verify this user's indentity</small>
        </div>
        <CloseModal />
      </div>
      <VerifyUserTab fullName={fullName} personId={personId} />
    </div>
  );
};

export default VerifyStudent;
