import { apiClient } from '../../api/client';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  async initiateRegistration(data: RegisterData): Promise<{ message: string; email: string; expiresIn: string }> {
    const response = await apiClient.post<{ message: string; email: string; expiresIn: string }>('/auth/initiate-registration', data);
    return response.data;
  },

  async completeRegistration(data: { email: string; verificationCode: string }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/complete-registration', data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // ============================================
  // Password Recovery
  // ============================================

  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', data);
    return response.data;
  },

  async verifyResetCode(data: VerifyResetCodeRequest): Promise<VerifyResetCodeResponse> {
    const response = await apiClient.post<VerifyResetCodeResponse>('/auth/verify-reset-code', data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', data);
    return response.data;
  },

  // ============================================
  // Email Verification
  // ============================================

  async sendVerificationEmail(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/send-verification');
    return response.data;
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', { token });
    return response.data;
  },

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/resend-verification', {
      email,
    });
    return response.data;
  },

  // ============================================
  // Two-Factor Authentication (2FA)
  // ============================================

  async enable2FA(): Promise<{ message: string; secret: string }> {
    const response = await apiClient.post<{ message: string; secret: string }>('/auth/2fa/enable');
    return response.data;
  },

  async verify2FA(code: string): Promise<{ message: string; valid?: boolean }> {
    const response = await apiClient.post<{ message: string; valid?: boolean }>(
      '/auth/2fa/verify',
      { code },
    );
    return response.data;
  },

  async disable2FA(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/2fa/disable');
    return response.data;
  },

  async refreshToken(): Promise<{ access_token: string }> {
    const response = await apiClient.post<{ access_token: string }>('/auth/refresh-token');
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },
};
