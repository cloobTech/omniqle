import { StatCard, RenderListItems } from "@features/shared";

const statsData = [
  {
    id: 1,
    title: "Total Employees",
    value: 0,
    description: "Total number of employees in the organization",
    icon: <span>👥</span>, // Placeholder icon
  },
  {
    id: 2,
    title: "Teaching Staff",
    value: 0,
    description: "Number of teaching staff in the organization",
    icon: <span>✅</span>, // Placeholder icon
  },
  {
    id: 3,
    title: "Non-Teaching Staff",
    value: 0,
    description: "Number of non-teaching staff in the organization",
    icon: <span>✅</span>, // Placeholder icon
  },
];

const StatCards = () => {
  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-3 gap-4">
      <RenderListItems
        data={statsData}
        renderItem={(item) => <StatCard key={item.id} {...item} />}
      />
    </div>
  );
};

export default StatCards;
