import { Skeleton } from "@mantine/core";

const StudentAvatarAndNameSkeleton: React.FC = () => {
  return (
    <div className="h-full p-2 bg-white rounded">
      <div className="flex items-center gap-2 card-gradient p-4 rounded">
        <Skeleton height={52} width={52} circle />
        <div className="flex flex-col gap-2">
          <Skeleton height={16} width="70%" />
          <Skeleton height={12} width="50%" />
        </div>
      </div>
    </div>
  );
};

const StudentDetaiCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 rounded bg-white">
      <div className="flex items-center justify-between mb-2">
        <Skeleton height={16} width="50%" />
        <Skeleton height={16} width="20%" />
      </div>
      <div className="h-full p-4 bg-[var(--primary-lightest)] rounded">
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex justify-between items-center">
              <Skeleton height={12} width="40%" />
              <Skeleton height={12} width="30%" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const StudentDetailCardsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <StudentAvatarAndNameSkeleton />
      <StudentDetaiCardSkeleton />
      <StudentDetaiCardSkeleton />
      <StudentDetaiCardSkeleton />
    </div>
  );
};
