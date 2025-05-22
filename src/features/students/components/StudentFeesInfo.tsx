import React from "react";

const StudentFeesInfo: React.FC = () => {
  // Example fees data
  const fees = {
    totalFees: 50000, // Total fees in currency
    amountPaid: 30000, // Amount paid so far
    balance: 20000, // Remaining balance
    paymentStatus: "Partially Paid", // Status: Paid, Partially Paid, or Not Paid
    lastPaymentDate: "2025-05-15", // Last payment date
  };

  return (
    <div className=" p-4 ">
      <h1 className="text-xl font-bold mb-4">Student Fees Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fees Summary */}
        <div>
          <h2 className="font-bold text-gray-700">Fees Summary</h2>
          <p>
            <strong>Total Fees:</strong> ₦{fees.totalFees.toLocaleString()}
          </p>
          <p>
            <strong>Amount Paid:</strong> ₦{fees.amountPaid.toLocaleString()}
          </p>
          <p>
            <strong>Balance:</strong> ₦{fees.balance.toLocaleString()}
          </p>
          <p>
            <strong>Payment Status:</strong> {fees.paymentStatus}
          </p>
        </div>

        {/* Payment Details */}
        <div>
          <h2 className="font-bold text-gray-700">Payment Details</h2>
          <p>
            <strong>Last Payment Date:</strong> {fees.lastPaymentDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentFeesInfo;
