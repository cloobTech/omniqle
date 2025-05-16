import React from "react";
import { Button } from "@mantine/core";
import CreateClassRoom from "../forms/CreateClassRoom";
import { useModal } from "@src/index";
import { useGetGradesQuery } from "../services/api";
import ClassRoomCards from "./ClassRoomCards";

const ManageClassRoomCards: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [x, setX] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { data } = useGetGradesQuery("4", {
    skip: !token,
  });

  const fetchData = () => {
    if (loading === false) {
      fetch(
        "https://schoolops-backend.centrumscien.com/api/v1/schools/4/grades",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(true);
          setX(data);
        });
    }
  };

  fetchData();

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
        <ClassRoomCards data={x?.grades} />
      </section>
    </div>
  );
};

export default ManageClassRoomCards;
