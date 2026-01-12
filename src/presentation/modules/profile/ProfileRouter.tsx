import { Route, Routes } from "react-router-dom";
import { ProfileEditor } from "./pages";


export function ProfileRouter(){

  return(
    <Routes>
      <Route index element={<ProfileEditor />}></Route>
    </Routes>
  )
}