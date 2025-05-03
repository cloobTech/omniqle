import { createBrowserRouter } from "react-router";
import { Login } from "@features/auth";
import DashbordLayout from "@src/layouts/DashbordLayout";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashbordLayout />,
  },
]);
