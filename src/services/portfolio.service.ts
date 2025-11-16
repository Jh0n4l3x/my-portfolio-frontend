import { apiClient } from './api/client';
import type { PortfolioData } from '../types';

export const portfolioService = {
  // Obtener portafolio completo de un usuario por username
  getByUsername: async (username: string): Promise<PortfolioData> => {
    const response = await apiClient.get<PortfolioData>(`/portfolio/${username}`);
    return response.data;
  },

  // Verificar disponibilidad de username
  checkUsernameAvailability: async (username: string): Promise<{ available: boolean }> => {
    const response = await apiClient.get<{ available: boolean }>(`/portfolio/check-username/${username}`);
    return response.data;
  },

  // Verificar disponibilidad de email
  checkEmailAvailability: async (email: string): Promise<{ available: boolean }> => {
    const response = await apiClient.get<{ available: boolean }>(`/users/check-email?email=${encodeURIComponent(email)}`);
    return response.data;
  },

  // Verificar disponibilidad de teléfono
  checkPhoneAvailability: async (phone: string): Promise<{ available: boolean }> => {
    const response = await apiClient.get<{ available: boolean }>(`/users/check-phone?phone=${encodeURIComponent(phone)}`);
    return response.data;
  },
};
