import { Route, Routes } from "react-router-dom";
import { ProjectDetail, Projects } from "./pages";

export function ProjectPublicRouter(){

  return(
    <Routes>
      <Route index element={<Projects />}></Route>
      <Route path="/:id" element={<ProjectDetail />} />
    </Routes>
  )
}