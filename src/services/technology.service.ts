import { apiClient } from './api/client';
import type { Technology, TechnologyWithStats } from '../types';

export const technologyService = {
  async getAll(): Promise<Technology[]> {
    const response = await apiClient.get<Technology[]>('/technologies');
    return response.data;
  },

  async getAllWithStats(): Promise<TechnologyWithStats[]> {
    const response = await apiClient.get<TechnologyWithStats[]>('/technologies/with-stats');
    return response.data;
  },

  async getById(id: string): Promise<Technology> {
    const response = await apiClient.get<Technology>(`/technologies/${id}`);
    return response.data;
  },

  async create(data: {
    name: string;
    category?: string;
    icon?: string;
    color?: string;
  }): Promise<Technology> {
    const response = await apiClient.post<Technology>('/technologies', data);
    return response.data;
  },

  async update(id: string, data: Partial<{
    name: string;
    category: string;
    icon: string;
    color: string;
  }>): Promise<Technology> {
    const response = await apiClient.patch<Technology>(`/technologies/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/technologies/${id}`);
  },
};
