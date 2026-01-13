import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ForgotPasswordRequest, LoginCredentials, RegisterData, ResetPasswordRequest, VerifyResetCodeRequest } from '@/shared/types';
import { useAuthStore } from '@/shared/store';
import { authService } from '@/infrastructure/adapters/service/auth.service';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user);
      toast.success('¡Inicio de sesión exitoso!');
      // Redirigir al panel de admin con el username
      navigate(`/admin/${data.user.username}`);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Error al iniciar sesión');
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setAuth(data.user);
      toast.success('¡Registro exitoso! Bienvenido a tu portafolio');
      // Redirigir al panel de admin con el username
      navigate(`/admin/${data.user.username}`);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Error al registrarse');
    },
  });
}

export function useInitiateRegistration() {
  return useMutation({
    mutationFn: (data: RegisterData) => authService.initiateRegistration(data),
    onSuccess: () => {
      toast.success('Código de verificación enviado a tu email');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Error al iniciar registro');
    },
  });
}

export function useCompleteRegistration() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; verificationCode: string }) => authService.completeRegistration(data),
    onSuccess: (data) => {
      setAuth(data.user);
      toast.success('¡Registro completado exitosamente!');
      // Redirigir al panel de admin con el username
      navigate(`/admin/${data.user.username}`);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Código inválido o expirado');
    },
  });
}

export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getMe,
    enabled: isAuthenticated || !!localStorage.getItem('token'),
    retry: false,
  });
}

export function useAuth() {
  const { user, token, isAuthenticated } = useAuthStore();
  const logout = useLogout();

  return {
    user,
    token,
    isAuthenticated,
    logout,
  };
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    authService.logout();
    clearAuth();
    queryClient.clear();
    navigate('/login');
    toast.success('Sesión cerrada');
  };
}

// ============================================
// Password Recovery Hooks
// ============================================

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
    onSuccess: (data) => {
      toast.success(`Código enviado por ${data.method === 'email' ? 'email' : 'WhatsApp'}`);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Error al enviar código');
    },
  });
}

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: (data: VerifyResetCodeRequest) => authService.verifyResetCode(data),
    onSuccess: () => {
      toast.success('Código verificado correctamente');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Código inválido o expirado');
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Contraseña restablecida exitosamente');
      navigate('/login');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Error al restablecer contraseña');
    },
  });
}
