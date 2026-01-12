import { Route, Routes } from "react-router-dom";
import { TechnologiesManager } from "./pages";
import { AdminRoute } from "@/presentation/routes/layouts/AdminRoute";

export function TechnologyRouter(){

  return (
    <Routes>
      <Route index element=
          { <AdminRoute>
              <TechnologiesManager />
            </AdminRoute>} />
    </Routes>
  )
}