import { Button } from "@mantine/core";
import { BsCheck2Circle } from "react-icons/bs";

const InvoiceCreationSuccessful = ({
  setActive,
}: {
  setActive: (value: number) => void;
}) => {
  const handleCreateAnotherInvoice = () => {
    setActive(0);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-4 h-[400px]">
      <BsCheck2Circle className="text-[var(--primary)] text-6xl" />
      <p>Your invoice has been created successfully!</p>
      <div>
        <Button onClick={handleCreateAnotherInvoice}>
          Create Another Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceCreationSuccessful;
