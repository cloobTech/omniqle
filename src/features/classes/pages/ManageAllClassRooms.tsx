import React from "react";
import StatCards from "../components/StatCards";
import ManageClassRoomCards from "../components/ManageClassRoomCards";

const ManageAllClassRooms: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-4 pt-4">
      <section>
        <StatCards />
      </section>
      <section className="flex-1 ">
        <ManageClassRoomCards />
      </section>
    </div>
  );
};

export default ManageAllClassRooms;
