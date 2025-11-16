import { apiClient } from './api/client';

export interface ProjectImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectImageDto {
  url: string;
  alt?: string;
  order?: number;
}

export interface UpdateProjectImageDto {
  url?: string;
  alt?: string;
  order?: number;
}

export const projectImageService = {
  async getByProject(projectId: string): Promise<ProjectImage[]> {
    const response = await apiClient.get<ProjectImage[]>(`/projects/${projectId}/images`);
    return response.data;
  },

  async create(projectId: string, data: CreateProjectImageDto): Promise<ProjectImage> {
    const response = await apiClient.post<ProjectImage>(`/projects/${projectId}/images`, data);
    return response.data;
  },

  async update(projectId: string, imageId: string, data: UpdateProjectImageDto): Promise<ProjectImage> {
    const response = await apiClient.patch<ProjectImage>(`/projects/${projectId}/images/${imageId}`, data);
    return response.data;
  },

  async delete(projectId: string, imageId: string): Promise<void> {
    await apiClient.delete(`/projects/${projectId}/images/${imageId}`);
  },

  async reorder(projectId: string, imageIds: string[]): Promise<ProjectImage[]> {
    const response = await apiClient.post<ProjectImage[]>(`/projects/${projectId}/images/reorder`, {
      imageIds,
    });
    return response.data;
  },

  async uploadImage(projectId: string, file: File): Promise<ProjectImage> {
    // Aquí podrías implementar la lógica de upload a un servicio como Cloudinary, S3, etc.
    // Por ahora, retornamos un placeholder
    const formData = new FormData();
    formData.append('file', file);
    
    // Ejemplo: Si tienes un endpoint de upload
    // const uploadResponse = await apiClient.post('/upload', formData);
    // const imageUrl = uploadResponse.data.url;
    
    // Por ahora, usamos un placeholder
    const imageUrl = URL.createObjectURL(file);
    
    return this.create(projectId, {
      url: imageUrl,
      alt: file.name,
    });
  },
};
