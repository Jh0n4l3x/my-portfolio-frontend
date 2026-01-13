import { apiClient } from '../../api/client';
import { Project, Technology, Profile } from '../types';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResults {
  projects: Project[];
  profiles: Profile[];
  posts: BlogPost[];
  technologies: Technology[];
}

export interface ProjectFilters {
  query?: string;
  technologyId?: string;
  userId?: string;
  featured?: boolean;
}

export interface SearchSuggestions {
  projects: string[];
  technologies: string[];
  skills: string[];
}

class SearchService {
  /**
   * Búsqueda global
   */
  async globalSearch(query: string): Promise<SearchResults> {
    const response = await apiClient.get<SearchResults>('/search', { params: { q: query } });
    return response.data;
  }

  /**
   * Buscar proyectos con filtros
   */
  async searchProjects(filters: ProjectFilters): Promise<Project[]> {
    const response = await apiClient.get<Project[]>('/search/projects', { params: filters });
    return response.data;
  }

  /**
   * Obtener proyectos por tecnología
   */
  async getProjectsByTechnology(technologyId: string): Promise<Project[]> {
    const response = await apiClient.get<Project[]>(`/search/by-technology/${technologyId}`);
    return response.data;
  }

  /**
   * Obtener perfiles por habilidad
   */
  async getProfilesBySkill(skillName: string): Promise<Profile[]> {
    const response = await apiClient.get<Profile[]>('/search/by-skill', {
      params: { name: skillName },
    });
    return response.data;
  }

  /**
   * Obtener sugerencias de búsqueda (autocomplete)
   */
  async getSuggestions(query: string): Promise<SearchSuggestions> {
    const response = await apiClient.get<SearchSuggestions>('/search/suggestions', {
      params: { q: query },
    });
    return response.data;
  }
}

export default new SearchService();
