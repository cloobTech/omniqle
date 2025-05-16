import React from "react";
import ManageClassTable from "../components/ManageClassRoomTable";
import { useParams } from "react-router-dom";

const ManageClassRoom: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-center">
        Classroom Details for {level}
      </h1>

      <div className="h-[30vh] flex items-center justify-center">
        <h3 className="text-center">
          My plan here is to list the different classes under a level
          <br />
          e.g. Jss 1A, Jss 1B, Jss 1c <br />
          <span>
            when a user clicks on a class, the class becomes active and we will
            display a table carrying the class info like what we have below
          </span>
        </h3>
      </div>
      <ManageClassTable />
    </div>
  );
};

export default ManageClassRoom;
