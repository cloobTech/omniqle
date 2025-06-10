import { Skeleton } from "@mantine/core";

const ClassTeacherInformationSkeleton: React.FC = () => {
  return (
    <div className="h-full p-4 card-gradient-two rounded shadow">
      <div className="flex items-center gap-2">
        <Skeleton height={52} width={52} circle />
        <div className="flex flex-col gap-2">
          <Skeleton height={16} width="70%" />
          <Skeleton height={12} width="50%" />
        </div>
      </div>
      <Skeleton height={24} width="50%" className="mt-4" />
    </div>
  );
};

const ClassRepsInformationSkeleton: React.FC = () => {
  return (
    <div className="h-full p-4 bg-[var(--primary-lightest)] rounded shadow flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton height={16} width="70%" />
        <Skeleton height={12} width="50%" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton height={16} width="70%" />
        <Skeleton height={12} width="50%" />
      </div>
    </div>
  );
};

const ClassStudentsInformationSkeleton: React.FC = () => {
  return (
    <div className="h-full p-4 bg-[var(--primary-lightest)] rounded shadow flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Skeleton height={16} width="40%" />
        <Skeleton height={20} width="20%" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton height={16} width="40%" />
        <Skeleton height={20} width="20%" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Skeleton height={16} width="60%" />
          <Skeleton height={24} width="80%" />
        </div>
        <Skeleton height={20} width="20%" />
      </div>
    </div>
  );
};

export const GeneralClassInformationSkeleton: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 bg-white rounded p-2 gap-4 mt-4">
      <ClassTeacherInformationSkeleton />
      <ClassRepsInformationSkeleton />
      <ClassStudentsInformationSkeleton />
    </div>
  );
};
