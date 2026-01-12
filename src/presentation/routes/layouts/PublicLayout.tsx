
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@shared/store";

export function PublicLayout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  if (isAuthenticated) return <Navigate to="home/dashboard" replace />;

  return (
      <main>
        <Outlet />
      </main>
  );
}