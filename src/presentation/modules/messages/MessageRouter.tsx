import { Route, Routes } from "react-router-dom";
import { ContactMessagesAdmin } from "./pages";

export function MessageRouter(){

  return (
    <Routes>
      <Route index element={<ContactMessagesAdmin />} />
    </Routes>
  )
}