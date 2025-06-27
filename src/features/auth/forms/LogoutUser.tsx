import { Button } from "@mantine/core";
import { useAppDispatch } from "@src/index";
import { useNavigate } from "react-router-dom";
import { useModal } from "@src/index";
import { logout } from "../services/authSlice";

const LogoutUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hideModal } = useModal();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <div className="h-[300px] w-[400px] flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="flex items-center justify-center gap-4 flex-1">
        <p className="font-bold text-2xl text-center w-[80%]">
          Are you sure you want to log out?
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-4 pt-4 w-full">
        <Button
          variant="outline"
          onClick={() => {
            hideModal();
          }}
          fullWidth

        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleLogout();
          }}
          fullWidth
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutUser;
