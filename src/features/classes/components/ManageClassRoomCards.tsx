import React from "react";
import { Button } from "@mantine/core";
import CreateClassRoom from "../forms/CreateClassRoom";
import { useModal } from "@src/index";
import { useGetGradesQuery } from "../services/api";
import ClassRoomCards from "./ClassRoomCards";
import { ClassRoomCardsSkeleton } from "./Skeletons";

const ManageClassRoomCards: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { data, isLoading, isFetching } = useGetGradesQuery(
    {
      schoolId: "4",
    },
    { skip: !token }
  );

  console.log({ data, isLoading });

  const { showModal } = useModal();

  if (isLoading || isFetching) {
    return <ClassRoomCardsSkeleton />;
  }

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
        <ClassRoomCards data={data?.grades} />
      </section>
    </div>
  );
};

export default ManageClassRoomCards;
