import { useState } from "react";
import InvoiceLineItemHeader from "../components/InvoiceLineItemHeader";
import SingleAccountInvoice from "../forms/SingleAccountInvoice";
import SplittedAccountInvoice from "../forms/SplittedAccountInvoice";
import { useAppSelector, useAppDispatch } from "@src/index";
import { Checkbox } from "@mantine/core";
import { updateField } from "../services/invoiceSlice";
import { useGetSchoolBankAccountsQuery } from "../services/api";

const InvoiceContainer = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const dispatch = useAppDispatch();
  const invoice = useAppSelector((state) => state.invoice);
  const schoolId = useAppSelector((state) => state.school?.schoolId);

  const { data: accounts = [] } = schoolId
    ? useGetSchoolBankAccountsQuery({ schoolId })
    : { data: [] };

  const [isSplitted, setSplitted] = useState<boolean>(
    invoice.isSplittedAccount !== undefined ? invoice.isSplittedAccount : false
  );

  const canSplit = accounts.length >= 2;

  // Update the invoice state when the checkbox is toggled
  const handleSplittedChange = (value: boolean) => {
    setSplitted(value);
    dispatch(updateField({ isSplittedAccount: value }));
  };

  return (
    <div>
      <InvoiceLineItemHeader prevStep={prevStep} />
      {canSplit && invoice.isSplittedAccount === undefined && (
        <Checkbox
          label="Split invoice and payments into different accounts"
          className="my-4"
          checked={isSplitted}
          onChange={(e) => handleSplittedChange(e.currentTarget.checked)}
        />
      )}

      {isSplitted ? (
        <SplittedAccountInvoice nextStep={nextStep} />
      ) : (
        <SingleAccountInvoice nextStep={nextStep} />
      )}
    </div>
  );
};

export default InvoiceContainer;
