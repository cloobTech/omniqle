import React from "react";
import StatCards from "../components/StatCards";
import PaymentTabs from "../components/PaymentTabs";

const Payments: React.FC = () => {
  return (
    <div className="h-full pt-4 flex flex-col">
      <StatCards />
      <PaymentTabs />
    </div>
  );
};

export default Payments;
