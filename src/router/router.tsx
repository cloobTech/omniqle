import { createBrowserRouter } from "react-router";
import { Login } from "@features/auth";
import { DashbordLayout } from "@features/dashboard";
import { DashboardHome } from "@features/home";
import { ManageClassrom } from "@features/classes";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashbordLayout />,
    children: [
      { path: "", element: <DashboardHome /> },
      {
        path: "manage-classroom",
        element: <ManageClassrom />,
      },
    ],
  },
]);
