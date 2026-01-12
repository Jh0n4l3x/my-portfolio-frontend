import { Route, Routes } from "react-router-dom";
import { UserManager } from "./pages";
import { AdminRoute } from "@/presentation/routes/layouts/AdminRoute";

export function UserRouter(){
  return(
    <Routes>
      <Route index element=
      { <AdminRoute>
          <UserManager />
        </AdminRoute> 
      } />
    </Routes>
  )
}