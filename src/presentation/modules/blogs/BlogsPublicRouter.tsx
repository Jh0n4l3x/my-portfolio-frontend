import { Route, Routes } from "react-router-dom";
import { Blog, BlogPost } from "./pages";


export function BlogsPublicRouter(){
  <Routes>
    <Route index element={<Blog />} />
    <Route path="/:slug" element={<BlogPost />} />
  </Routes>
}