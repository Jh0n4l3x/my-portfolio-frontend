import { Route, Routes } from "react-router-dom";
import { Contact } from "./pages";

export function MessagePublicRouter(){

  return (
    <Routes>
      <Route index element={<Contact />} />
    </Routes>
  )
}