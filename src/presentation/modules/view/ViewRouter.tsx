import { Route, Routes } from "react-router-dom";
import { SearchResults } from "./pages";

export function ViewRouter(){
  return (
    <Routes>
      <Route path="search" element={<SearchResults />}/>
    </Routes>
  )
}