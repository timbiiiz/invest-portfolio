import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../api/auth";

export function ProtectedRoute() {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
