import { IClassroomDetails } from "@features/classes/types";

export const extractDetailsToUpdateClassroom = ({
  data,
  classLevelName,
}: {
  data: Partial<IClassroomDetails>;
  classLevelName: string;
}) => {
  const studentOptions =
    (data?.students ?? []).map((student) => ({
      // @ts-ignore
      value: String(student?.id),
      // @ts-ignore
      label: student.full_name,
    })) || [];

  const value = {
    classLevelName: classLevelName,
    className: data.name ?? "",
    classTeacher: data.class_teacher,
    classPrefect: studentOptions,
    asstClassPrefect: studentOptions,
  };

  return value;
};
