import { Route, Routes } from "react-router-dom";
import { SecuritySettings } from "./pages";

export function SecurityRouter(){
  return (
    <Routes>
      <Route index element={<SecuritySettings />}/>
    </Routes>
  )
}