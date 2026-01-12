import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages";

export function DashboardRouter(){
  return (
    <Routes>
      <Route index element={<Dashboard />}/>
    </Routes>
  )
}