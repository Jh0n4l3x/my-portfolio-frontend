import { Route, Routes } from "react-router-dom";
import { TagsManager } from "./pages";

export function TagsRouter(){
  return (
    <Routes>
      <Route index element={<TagsManager />} />
    </Routes>
  )
}