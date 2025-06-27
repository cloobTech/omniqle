import { createBrowserRouter } from "react-router-dom";
import { Login } from "@features/auth";
import { DashbordLayout } from "@features/dashboard";
import { DashboardHome } from "@features/home";
import { ManageAllClassrooms, ManageClassroom } from "@features/classes";
import { Payments } from "@features/payments";
import { Employees } from "@features/employees";
import { Settings } from "@features/settings";
import { Supports } from "@features/supprts";
import { StudentProfile } from "@features/students";
import RequireAuth from "@src/components/ProtectRoute";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <DashbordLayout />
      </RequireAuth>
    ),
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "classrooms", element: <ManageAllClassrooms /> },
      {
        path: "classrooms/manage-classroom/:level",
        element: <ManageClassroom />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "supports",
        element: <Supports />,
      },
      {
        path: "students/profile/:studentId",
        element: <StudentProfile />,
      },
    ],
  },
]);
