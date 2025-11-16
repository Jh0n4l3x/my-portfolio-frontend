import { apiClient } from './api/client';

export interface DashboardStats {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  projects: {
    total: number;
    published: number;
    drafts: number;
  };
  skills: {
    total: number;
  };
  technologies: {
    total: number;
  };
  posts: {
    total: number;
    published: number;
    drafts: number;
  };
}

export interface RecentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface RecentProject {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  technologies: Array<{
    id: string;
    name: string;
  }>;
}

export interface TopSkill {
  id: string;
  name: string;
  level: number;
  profile: {
    user: {
      firstName: string;
      lastName: string;
      username: string;
    };
  };
}

export interface TopTechnology {
  id: string;
  name: string;
  icon: string;
  color: string;
  projectCount: number;
  projects: Array<{
    id: string;
    title: string;
  }>;
}

export interface ActivityTimeline {
  users: number;
  projects: number;
  posts: number;
  period: string;
}

const adminDashboardService = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/admin/dashboard/stats');
    return response.data;
  },

  // Get recent users
  getRecentUsers: async (limit: number = 5): Promise<RecentUser[]> => {
    const response = await apiClient.get<RecentUser[]>(`/admin/users/recent?limit=${limit}`);
    return response.data;
  },

  // Get recent projects
  getRecentProjects: async (limit: number = 5): Promise<RecentProject[]> => {
    const response = await apiClient.get<RecentProject[]>(`/admin/projects/recent?limit=${limit}`);
    return response.data;
  },

  // Get top skills
  getTopSkills: async (limit: number = 10): Promise<TopSkill[]> => {
    const response = await apiClient.get<TopSkill[]>(`/admin/skills/top?limit=${limit}`);
    return response.data;
  },

  // Get top technologies
  getTopTechnologies: async (limit: number = 10): Promise<TopTechnology[]> => {
    const response = await apiClient.get<TopTechnology[]>(`/admin/technologies/top?limit=${limit}`);
    return response.data;
  },

  // Get activity timeline
  getActivityTimeline: async (days: number = 30): Promise<ActivityTimeline> => {
    const response = await apiClient.get<ActivityTimeline>(`/admin/activity/timeline?days=${days}`);
    return response.data;
  },
};

export default adminDashboardService;
