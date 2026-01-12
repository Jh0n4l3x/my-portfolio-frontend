import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { authService } from '@services/auth.service';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute - Protege rutas que solo pueden ser accedidas por administradores
 * Verifica tanto autenticación como rol de ADMIN
 */
export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, user } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }));

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no es ADMIN, redirigir al dashboard apropiado
  if (user?.role !== 'ADMIN') {
    return <Navigate to={`/${user?.username}`} replace />;
  }

  return <>{children}</>;
}
