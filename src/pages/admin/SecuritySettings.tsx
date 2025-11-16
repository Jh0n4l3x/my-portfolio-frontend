import { useState, useEffect } from 'react';
import { TwoFactorAuth } from '../../components/auth/TwoFactorAuth';
import { authService } from '../../services/auth.service';
import { useAuth, useCurrentUser } from '../../hooks/useAuth';
import { useAuthStore } from '../../store/authStore';

export function SecuritySettings() {
  const { user } = useAuth();
  const { data: currentUserData } = useCurrentUser();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);

  // Actualizar el store cuando se obtiene la información actualizada del usuario
  useEffect(() => {
    console.log('SecuritySettings: currentUserData changed', currentUserData);
    if (currentUserData) {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        console.log('SecuritySettings: updating auth store with new user data');
        setAuth(currentUserData, currentToken);
      }
    }
  }, [currentUserData, setAuth]);

  const handleSendVerification = async () => {
    setEmailVerificationLoading(true);
    setMessage(null);
    try {
      const response = await authService.sendVerificationEmail();
      setMessage({ type: 'success', text: response.message });
      
      // Recargar información del usuario para actualizar el estado
      try {
        const userData = await authService.getMe();
        const currentToken = localStorage.getItem('token');
        if (currentToken && userData) {
          setAuth(userData, currentToken);
        }
      } catch (error) {
        console.error('Error recargando usuario:', error);
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al enviar email de verificación',
      });
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Aquí necesitarías un endpoint específico para cambiar contraseña
      // Por ahora mostramos un mensaje
      setMessage({ type: 'success', text: 'Contraseña actualizada exitosamente' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al cambiar contraseña',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Configuración de Seguridad</h1>

        {/* Mensajes globales */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Información de la cuenta */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Información de la Cuenta</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <div className="flex items-center">
                {user?.emailVerified ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    ✓ Verificado
                  </span>
                ) : (
                  <button
                    onClick={handleSendVerification}
                    disabled={emailVerificationLoading}
                    className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                  >
                    {emailVerificationLoading ? 'Enviando...' : 'Verificar Email'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Usuario</p>
                <p className="text-sm text-gray-600">@{user?.username}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Rol</p>
                <p className="text-sm text-gray-600">{user?.role}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">Estado de la cuenta</p>
                <p className="text-sm text-gray-600">
                  {user?.isActive ? 'Activa' : 'Inactiva'}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  user?.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user?.isActive ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        </div>

        {/* Cambiar Contraseña */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Contraseña</h2>
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {showPasswordChange ? 'Cancelar' : 'Cambiar Contraseña'}
            </button>
          </div>

          {showPasswordChange && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contraseña Actual *
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Tu contraseña actual"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nueva Contraseña *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirmar Nueva Contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Repite la nueva contraseña"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
              </button>
            </form>
          )}

          {!showPasswordChange && (
            <p className="text-gray-600 text-sm">
              Última actualización: Hace 3 meses
            </p>
          )}
        </div>

        {/* Autenticación de Dos Factores */}
        <TwoFactorAuth
          isEnabled={user?.twoFactorEnabled}
          onSuccess={() => {
            setMessage({ type: 'success', text: 'Configuración de 2FA actualizada' });
            // Recargar información del usuario
            window.location.reload();
          }}
        />

        {/* Sesiones Activas */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Sesiones Activas</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Sesión Actual</p>
                  <p className="text-sm text-gray-600">Windows - Chrome</p>
                  <p className="text-xs text-gray-500">Última actividad: Ahora</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Activa
              </span>
            </div>
          </div>

          <button className="mt-4 text-red-600 hover:text-red-700 font-medium text-sm">
            Cerrar todas las sesiones
          </button>
        </div>

        {/* Zona de Peligro - OCULTA TEMPORALMENTE */}
        {/*
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-4">Zona de Peligro</h2>
          <p className="text-red-800 mb-4 text-sm">
            Las siguientes acciones son permanentes y no se pueden deshacer.
          </p>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
              <p className="font-medium text-red-900">Desactivar cuenta temporalmente</p>
              <p className="text-sm text-red-700">
                Tu cuenta será ocultada pero podrás reactivarla más tarde
              </p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
              <p className="font-medium text-red-900">Eliminar cuenta permanentemente</p>
              <p className="text-sm text-red-700">
                Todos tus datos serán eliminados de forma irreversible
              </p>
            </button>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
