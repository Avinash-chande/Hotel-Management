import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");

  // console.log("TOKEN:", token); // 👈 DEBUG

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
