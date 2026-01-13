import { apiClient } from '../../api/client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  projectsCount: number;
  skillsCount: number;
  technologiesCount: number;
  postsCount: number;
}

export interface UpdatePasswordRequest {
  password: string;
}

export interface UpdateRoleRequest {
  role: 'USER' | 'ADMIN';
}

const userService = {
  // Get all users (Admin only)
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // Get user by username
  getUserByUsername: async (username: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/username/${username}`);
    return response.data;
  },

  // Deactivate user (Admin only)
  deactivateUser: async (id: string): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/deactivate`);
    return response.data;
  },

  // Activate user (Admin only)
  activateUser: async (id: string): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/activate`);
    return response.data;
  },

  // Update user password (Admin only)
  updatePassword: async (id: string, data: UpdatePasswordRequest): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/password`, data);
    return response.data;
  },

  // Update user role (Admin only)
  updateRole: async (id: string, data: UpdateRoleRequest): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/role`, data);
    return response.data;
  },

  // Get user statistics
  getUserStats: async (id: string): Promise<UserStats> => {
    const response = await apiClient.get<UserStats>(`/users/${id}/stats`);
    return response.data;
  },
};

export default userService;
