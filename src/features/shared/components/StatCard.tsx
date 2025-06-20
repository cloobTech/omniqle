import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col justify-between gap-2 bg-gray-300 rounded shadow p-3 card-gradient">
      <div className="flex items-center justify-between gap-4">
        <div className="leading-none">
          <h3 className="font-bold text-sm">{title}</h3>
          <small className="text-gray-600 text-xs">{description}</small>
        </div>
        <div>{icon}</div>
      </div>
      <div className="font-bold text-xl">{value < 1 ? "-" : value}</div>
    </div>
  );
};

export default StatCard;
