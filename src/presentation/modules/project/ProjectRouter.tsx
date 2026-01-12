import { Route, Routes } from "react-router-dom";
import { ProjectEditor, ProjectList } from "./pages";

export function ProjectRouter(){

  return(
    <Routes>
      <Route index element={<ProjectList />} />
      <Route path="edit/:id" element={<ProjectEditor />} />
    </Routes>
  )
}