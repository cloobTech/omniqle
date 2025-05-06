import React from "react";
import StatCards from "../components/StatCards";
import SummaryTabs from "../components/SummaryTabs";

const Index: React.FC = () => {
  return (
    <div className="h-full  pt-4">
      <StatCards />
      <SummaryTabs />
    </div>
  );
};

export default Index;
