import { useState } from "react";
import InvoiceLineItemHeader from "../components/InvoiceLineItemHeader";
import SingleAccountInvoice from "../forms/SingleAccountInvoice";
import SplittedAccountInvoice from "../forms/SplittedAccountInvoice";
import { Checkbox } from "@mantine/core";

const InvoiceContainer = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const [isSplitted, setSplitted] = useState<boolean>(false);
  return (
    <div>
      <InvoiceLineItemHeader prevStep={prevStep} />
      <Checkbox
        label="split invoice and payments into different accounts - use popver here"
        className="my-4"
        checked={isSplitted}
        onChange={(e) => setSplitted(e.currentTarget.checked)}
      />
      {isSplitted ? (
        <SplittedAccountInvoice nextStep={nextStep} />
      ) : (
        <SingleAccountInvoice nextStep={nextStep} />
      )}
    </div>
  );
};

export default InvoiceContainer;
