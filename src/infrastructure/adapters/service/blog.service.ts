import { apiClient } from '../../api/client';
import type { Tag } from './tag.service';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  tagIds: string[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  published?: boolean;
  tagIds?: string[];
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  excerpt?: string;
  thumbnail?: string;
  published?: boolean;
  tagIds?: string[];
}

export const blogService = {
  // Posts
  async getAllPosts(filters?: { published?: boolean; tagId?: string }): Promise<Post[]> {
    const params: Record<string, string | boolean> = {};
    if (filters?.published !== undefined) {
      params.published = filters.published;
    }
    if (filters?.tagId) {
      params.tagId = filters.tagId;
    }
    const response = await apiClient.get<Post[]>('/posts', { params });
    return response.data;
  },

  async getPostById(id: string): Promise<Post> {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  async getPostBySlug(slug: string): Promise<Post> {
    const response = await apiClient.get<Post>(`/posts/slug/${slug}`);
    return response.data;
  },

  async createPost(data: CreatePostDto): Promise<Post> {
    const response = await apiClient.post<Post>('/posts', data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    const response = await apiClient.patch<Post>(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  },

  async publishPost(id: string): Promise<Post> {
    const response = await apiClient.post<Post>(`/posts/${id}/publish`);
    return response.data;
  },

  async unpublishPost(id: string): Promise<Post> {
    const response = await apiClient.post<Post>(`/posts/${id}/unpublish`);
    return response.data;
  },

  async addTagsToPost(postId: string, tagIds: string[]): Promise<Post> {
    const response = await apiClient.post<Post>(`/posts/${postId}/tags`, { tagIds });
    return response.data;
  },

  async removeTagFromPost(postId: string, tagId: string): Promise<Post> {
    const response = await apiClient.delete<Post>(`/posts/${postId}/tags/${tagId}`);
    return response.data;
  },
};
