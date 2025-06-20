import { useAppSelector } from "@src/index";
import { useGetGradeDisplayNamesQuery } from "@features/classes";

const InvoicePreviewHeader = () => {
  const invoiceDetails = useAppSelector((state) => state.invoice);
  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data: classrooms } = useGetGradeDisplayNamesQuery({
    schoolId: schoolId,
  });

  return (
    <div className="bg-[var(--primary-lightest-2)] rounded p-4 my-2 text-sm flex items-center justify-between gap-4">
      <div className="">
        <h3 className="font-semibold text-lg">
          {invoiceDetails?.description}
        </h3>
        <p>
          {invoiceDetails.level_id !== undefined
            ? classrooms?.[invoiceDetails.level_id]
            : "N/A"}
        </p>
      </div>
      <div className="">
        <span>{invoiceDetails?.academic_session}</span> |{" "}
        <span className="capitalize">{`${invoiceDetails?.term} term`}</span>
        <div>
          <span>
            {" "}
            <span className="font-bold">Due:</span> {invoiceDetails?.due_date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewHeader;
