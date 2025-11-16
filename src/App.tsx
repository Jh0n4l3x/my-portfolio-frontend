import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@components/layout/Layout';
import { Home } from '@pages/Home';
import { Projects } from '@pages/Projects';
import { ProjectDetail } from '@pages/ProjectDetail';
import { Blog } from '@pages/Blog';
import { BlogPost } from '@pages/BlogPost';
import { Contact } from '@pages/Contact';
import { Login } from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import { ForgotPassword } from '@pages/auth/ForgotPassword';
import { ResetPassword } from '@pages/auth/ResetPassword';
import { VerifyEmail } from '@pages/auth/VerifyEmail';
import { Dashboard } from '@pages/admin/Dashboard';
import { ProjectList } from '@pages/admin/ProjectList';
import { ProjectEditor } from '@pages/admin/ProjectEditor';
import { ProfileEditor } from '@pages/admin/ProfileEditor';
import { BlogList } from '@pages/admin/BlogList';
import { BlogEditor } from '@pages/admin/BlogEditor';
import { TagsManager } from '@pages/admin/TagsManager';
import { SkillsManager } from '@pages/admin/SkillsManager';
import { TechnologiesManager } from '@pages/admin/TechnologiesManager';
import { UserManager } from '@pages/admin/UserManager';
import { SecuritySettings } from '@pages/admin/SecuritySettings';
import { ContactMessagesAdmin } from '@pages/admin/ContactMessagesAdmin';
import { NotFound } from '@pages/NotFound';
import SearchResults from '@pages/SearchResults';
import { ProtectedRoute } from '@components/auth/ProtectedRoute';
import { AdminRoute } from '@components/auth/AdminRoute';
import { AdminLayout } from '@components/admin/AdminLayout';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        {/* Ruta raíz redirige a login/registro */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Panel de administración protegido */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path=":username" element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectEditor />} />
          <Route path="projects/edit/:id" element={<ProjectEditor />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/edit/:id" element={<BlogEditor />} />
          <Route path="tags" element={<TagsManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route
            path="technologies"
            element={
              <AdminRoute>
                <TechnologiesManager />
              </AdminRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoute>
                <UserManager />
              </AdminRoute>
            }
          />
          <Route path="security" element={<SecuritySettings />} />
          <Route
            path="messages"
            element={
              <ProtectedRoute>
                <ContactMessagesAdmin />
              </ProtectedRoute>
            }
          />
        </Route>
        
        {/* Rutas legacy - redirigir */}
        <Route path="/about" element={<Navigate to="/login" replace />} />

        {/* Página 404 */}
        <Route path="/404" element={<NotFound />} />

        {/* Rutas del portafolio público por username - debe estar al final antes del catch-all */}
        <Route path="/:username" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          {/* Resultados de búsqueda */}
          <Route path="search" element={<SearchResults />} />
          {/* 404 dentro del layout del usuario */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Catch-all para rutas no encontradas - debe ser la última */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
