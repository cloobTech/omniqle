import React from "react";
import { Skeleton } from "@mantine/core";

export const ClassRoomCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-32 bg-gray-100 rounded shadow p-4 cursor-pointer">
      <div className="flex items-center justify-between gap-4">
        <Skeleton height={20} width={100} radius="xl" />
        <Skeleton height={20} width={40} radius="xl" />
      </div>
      <Skeleton height={20} width={80} radius="xl" mt={10} />
    </div>
  );
};

export const ClassRoomCardsSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-2 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }, (_, index) => (
        <ClassRoomCardSkeleton key={index} />
      ))}
    </div>
  );
};
