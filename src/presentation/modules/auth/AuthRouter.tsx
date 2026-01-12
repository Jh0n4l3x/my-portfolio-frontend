import { Route, Routes } from "react-router-dom";
import { ForgotPassword, Login, Register, ResetPassword, VerifyEmail } from "./pages";

export function AuthRouter(){
  return (
    <Routes>
      <Route index element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  )
}