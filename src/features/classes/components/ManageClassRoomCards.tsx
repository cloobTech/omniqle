import React from "react";
import { Button } from "@mantine/core";
import CreateClassRoom from "../forms/CreateClassRoom";
import { useModal } from "@src/index";
import { useGetGradesQuery } from "../services/api";
import ClassRoomCards from "./ClassRoomCards";

const ManageClassRoomCards: React.FC = () => {
  const token = localStorage.getItem("token");

  const { data } = useGetGradesQuery("4", {
    skip: !token,
  });

  if (data) console.log(data);
  const { showModal } = useModal();

  return (
    <div className="h-full bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold px-2 mb-2">All Classes</h1>
        <Button
          onClick={() =>
            showModal(<CreateClassRoom />, {
              size: "80%",
              withCloseButton: false,
            })
          }
        >
          Add Classes
        </Button>
      </div>
      <section>
        <ClassRoomCards />
      </section>
    </div>
  );
};

export default ManageClassRoomCards;
