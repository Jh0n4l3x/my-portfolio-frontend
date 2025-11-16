import { apiClient } from './api/client';
import type { Skill } from '../types';

export const skillService = {
  async getByProfile(profileId: string): Promise<Skill[]> {
    const response = await apiClient.get<Skill[]>(`/skills/profile/${profileId}`);
    return response.data;
  },

  async getById(id: string): Promise<Skill> {
    const response = await apiClient.get<Skill>(`/skills/${id}`);
    return response.data;
  },

  async create(data: {
    name: string;
    level: number;
    category: string;
    icon?: string;
    profileId: string;
  }): Promise<Skill> {
    // El profileId va en la URL, NO en el body
    const { profileId, ...bodyData } = data;
    const response = await apiClient.post<Skill>(`/skills/profile/${profileId}`, bodyData);
    return response.data;
  },

  async update(id: string, data: Partial<{
    name: string;
    level: number;
    category: string;
    icon: string;
  }>): Promise<Skill> {
    const response = await apiClient.patch<Skill>(`/skills/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/skills/${id}`);
  },

  async getMySkills(): Promise<Skill[]> {
    const response = await apiClient.get<Skill[]>('/skills/my');
    return response.data;
  },
};
