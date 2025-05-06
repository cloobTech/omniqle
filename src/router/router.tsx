import { createBrowserRouter } from "react-router";
import { Login } from "@features/auth";
import { DashbordLayout } from "@features/dashboard";
import { DashboardHome } from "@features/home";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashbordLayout />,
    children: [{ path: "", element: <DashboardHome /> }],
  },
]);
