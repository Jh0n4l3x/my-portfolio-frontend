import { apiClient } from '../../api/client';
import type { Profile } from '../types';

export const profileService = {
  async getMyProfile(): Promise<Profile> {
    const response = await apiClient.get<Profile>('/profile/me');
    return response.data;
  },

  async getByUserId(userId: string): Promise<Profile> {
    const response = await apiClient.get<Profile>(`/profile/user/${userId}`);
    return response.data;
  },

  async create(data: {
    bio: string;
    title?: string;
    location?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    avatar?: string;
  }): Promise<Profile> {
    const response = await apiClient.post<Profile>('/profile', data);
    return response.data;
  },

  async update(data: Partial<{
    bio: string;
    title: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    twitter: string;
    avatar: string;
  }>): Promise<Profile> {
    const response = await apiClient.patch<Profile>('/profile', data);
    return response.data;
  },

  async delete(): Promise<void> {
    await apiClient.delete('/profile');
  },
};
