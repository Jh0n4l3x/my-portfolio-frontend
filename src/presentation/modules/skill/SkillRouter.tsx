import { Route, Routes } from "react-router-dom";
import { SkillsManager } from "./pages";

export function SkillRouter(){

  return (
    <Routes>
      <Route index element={<SkillsManager />} />
    </Routes>
  )
}