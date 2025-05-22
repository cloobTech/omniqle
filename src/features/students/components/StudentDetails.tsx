import React from "react";
import StudentDetailTab from "./StudentDetailTab";
import { Avatar } from "@mantine/core";
import { CloseModal } from "@src/index";

const StudentDetails: React.FC = () => {
  return (
    <div>
      <div className="flex items-start justify-between gap-8">
        <section className="flex items-center gap-4 p-4 bg-white rounded-lg shadow flex-1">
          <Avatar radius="xl" size={"lg"} />
          <div className="text-sm">
            <p className="font-bold">John Doe</p>
            <small className="text-gray-600">JSS 3A (Grade 9)</small>
          </div>
        </section>
        <CloseModal />
      </div>
      <StudentDetailTab />
    </div>
  );
};

export default StudentDetails;
