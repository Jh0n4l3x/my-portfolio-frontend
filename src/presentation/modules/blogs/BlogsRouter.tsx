import { Route, Routes } from "react-router-dom";
import { BlogEditor, BlogList } from "./pages";


export function BlogsRouter(){
  return(
  <Routes>
    <Route index element={<BlogList />} />
    <Route path="new" element={<BlogEditor />} />
    <Route path="edit/:id" element={<BlogEditor />} />
  </Routes>
  )
}