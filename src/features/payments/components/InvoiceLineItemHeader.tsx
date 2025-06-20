import { Button } from "@mantine/core";
import { useAppSelector } from "@src/index";
import { useGetGradeDisplayNamesQuery } from "@features/classes";


const InvoiceLineItemHeader = ({ prevStep }: { prevStep: () => void }) => {
  const invoiceDetails = useAppSelector((state) => state.invoice);
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const { data: classrooms } = useGetGradeDisplayNamesQuery({
    schoolId: schoolId,
  });

  return (
    <div className="bg-[var(--primary-lightest-2)] rounded p-4 my-2 text-sm grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{invoiceDetails?.description}</h3>

        <Button
          style={{
            backgroundColor: "#eee",
            border: "1px solid #ccc",
          }}
          size="xs"
          c={"gray"}
          variant="outline"
          onClick={prevStep}
        >
          Edit
        </Button>
      </div>
      <p>
        {invoiceDetails.level_id !== undefined
          ? classrooms?.[invoiceDetails.level_id]
          : "N/A"}
      </p>
      <div className="flex items-center gap-4">
        <span>{invoiceDetails?.academic_session}</span> |{" "}
        <span className="capitalize">{`${invoiceDetails?.term} Term`}</span> |{" "}
        <span>
          {" "}
          <span className="font-bold">Due:</span> {invoiceDetails?.due_date}
        </span>
      </div>
    </div>
  );
};

export default InvoiceLineItemHeader;
