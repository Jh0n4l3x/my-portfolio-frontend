import { apiClient } from '../../api/client';

export interface Tag {
  id: string;
  name: string;
  postIds: string[];
  posts?: Array<{
    id: string;
    title: string;
    published: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagDto {
  name: string;
}

export interface UpdateTagDto {
  name?: string;
}

export const tagService = {
  async getAllTags(): Promise<Tag[]> {
    const response = await apiClient.get<Tag[]>('/tags');
    return response.data;
  },

  async getTagById(id: string): Promise<Tag> {
    const response = await apiClient.get<Tag>(`/tags/${id}`);
    return response.data;
  },

  async getTagByName(name: string): Promise<Tag> {
    const response = await apiClient.get<Tag>(`/tags/name/${name}`);
    return response.data;
  },

  async createTag(name: string): Promise<Tag> {
    const response = await apiClient.post<Tag>('/tags', { name });
    return response.data;
  },

  async updateTag(id: string, name: string): Promise<Tag> {
    const response = await apiClient.patch<Tag>(`/tags/${id}`, { name });
    return response.data;
  },

  async deleteTag(id: string): Promise<void> {
    await apiClient.delete(`/tags/${id}`);
  },

  async getPostsByTag(tagId: string): Promise<unknown[]> {
    const response = await apiClient.get<unknown[]>(`/tags/${tagId}/posts`);
    return response.data;
  },
};
