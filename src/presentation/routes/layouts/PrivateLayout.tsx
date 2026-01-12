
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@shared/store";
import { AdminLayout } from "./AdminLayout";

export function PrivateLayout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
        <AdminLayout>
          <Outlet />
        </AdminLayout>
  );
}
