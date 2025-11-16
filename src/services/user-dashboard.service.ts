import { apiClient } from './api/client';

export interface UserStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  archivedProjects: number;
  totalSkills: number;
  profileViews: number;
  createdAt: string;
}

export interface UserRecentProject {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecentActivity {
  id: string;
  type: 'project_created' | 'project_updated' | 'skill_added' | 'profile_updated';
  description: string;
  createdAt: string;
}

export const userDashboardService = {
  async getMyStats(): Promise<UserStats> {
    const response = await apiClient.get<UserStats>('/users/my/stats');
    return response.data;
  },

  async getMyRecentProjects(limit: number = 5): Promise<UserRecentProject[]> {
    const response = await apiClient.get<UserRecentProject[]>('/projects/my/recent', {
      params: { limit }
    });
    return response.data;
  },

  async getMyRecentActivity(limit: number = 10): Promise<UserRecentActivity[]> {
    const response = await apiClient.get<UserRecentActivity[]>('/users/my/activity', {
      params: { limit }
    });
    return response.data;
  },

  async getMySkillsCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>('/skills/my/count');
    return response.data.count;
  },
};