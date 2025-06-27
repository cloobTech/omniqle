// @components/ProtectRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@src/hooks/redux_hook";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const token = useAppSelector((state) => state.authentication.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
