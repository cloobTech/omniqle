import React from "react";
import { StatCard } from "@features/shared";

const StatCards: React.FC = () => {
  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard />
      <StatCard />
      <StatCard />
      <StatCard />
    </div>
  );
};

export default StatCards;
