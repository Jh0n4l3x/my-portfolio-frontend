import { apiClient } from '../../api/client';
import type { Project, CreateProjectDto } from '../types';

export interface ProjectStats {
  id: string;
  title: string;
  imagesCount: number;
  technologiesCount: number;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const projectService = {
  async getAll(featured?: boolean): Promise<Project[]> {
    const params = featured !== undefined ? { featured } : {};
    const response = await apiClient.get<Project[]>('/projects', { params });
    return response.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async create(data: CreateProjectDto): Promise<Project> {
    const response = await apiClient.post<Project>('/projects', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateProjectDto>): Promise<Project> {
    const response = await apiClient.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  },

  async getByUser(userId: string): Promise<Project[]> {
    const response = await apiClient.get<Project[]>(`/projects/user/${userId}`);
    return response.data;
  },

  async getDrafts(): Promise<Project[]> {
    const response = await apiClient.get<Project[]>('/projects/my/drafts');
    return response.data;
  },

  async getArchived(): Promise<Project[]> {
    const response = await apiClient.get<Project[]>('/projects/my/archived');
    return response.data;
  },

  async toggleFeatured(id: string): Promise<Project> {
    const response = await apiClient.patch<Project>(`/projects/${id}/featured`);
    return response.data;
  },

  async reorderProjects(projectIds: string[]): Promise<Project[]> {
    const response = await apiClient.post<Project[]>('/projects/reorder', { projectIds });
    return response.data;
  },

  async cloneProject(id: string): Promise<Project> {
    const response = await apiClient.post<Project>(`/projects/${id}/clone`);
    return response.data;
  },

  async getProjectStats(id: string): Promise<ProjectStats> {
    const response = await apiClient.get<ProjectStats>(`/projects/${id}/stats`);
    return response.data;
  },

  async searchProjects(query: string): Promise<Project[]> {
    const response = await apiClient.get<Project[]>('/projects/search', {
      params: { q: query },
    });
    return response.data;
  },
};
