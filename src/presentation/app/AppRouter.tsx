import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateLayout } from "@presentation/routes";
import { PublicLayout } from "@presentation/routes";
import { BlogsRouter, DashboardRouter, MessageRouter, ProfileRouter, ProjectRouter, SecurityRouter, SkillRouter, TagsRouter, TechnologyRouter, UserRouter } from "../modules";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        
        // Público
        <Route element={<PublicLayout />}>
          <Route index element={<Navigate to="/" />} />
          {/* <Route path="home/*" element={<HomeRouter />} />
          <Route path="auth/*" element={<AuthRouter />} /> */}
        </Route>

        //  Privado 
        <Route path="/home" element={<PrivateLayout />}>
          <Route index path="dashboard/*" element={<DashboardRouter />} />
          <Route path="projects/*" element={<ProjectRouter />} />
          <Route path="profile/*" element={<ProfileRouter />} />
          <Route path="blog/*" element={<BlogsRouter />} />
          <Route path="tags/*" element={<TagsRouter />} />
          <Route path="skill/*" element={<SkillRouter />} />
          <Route path="technologies/*" element={<TechnologyRouter />} />
          <Route path="users/*" element={<UserRouter/>} />
          <Route path="messages/*" element={<MessageRouter />} />
          <Route path="security/*" element={<SecurityRouter />} />
        </Route> 

      </Routes>
    </BrowserRouter>
  );
}
