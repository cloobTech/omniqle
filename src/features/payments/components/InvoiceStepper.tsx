import { useState } from "react";
import { Stepper } from "@mantine/core";
import CreateInvoice from "../forms/CreateInvoice";
import InvoiceContainer from "./InvoiceContainer";
import ModalHeader from "@src/components/ModalHeader";
import InvoicePreview from "./InvoicePreview";
import InvoiceCreationSuccessful from "./InvoiceCreationSuccessful";

const InvoiceStepper = () => {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="md:min-w-[620px]">
      <ModalHeader
        title="Create Invoice"
        subTitle="invoices for school fees and other bills"
      />
      <div className="mt-4">
        <Stepper
          size="xs"
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step description="Create invoice" label="Invoice">
            <CreateInvoice nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step
            description="Select account and add line items"
            label="Line items"
          >
            <InvoiceContainer nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Step
            description="Preview and publish invoice"
            label="Preview"
          >
            <InvoicePreview nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Completed>
            <InvoiceCreationSuccessful setActive={setActive} />
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
  );
};

export default InvoiceStepper;
