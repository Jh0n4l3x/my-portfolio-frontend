export interface CreateProjectDto {
  title: string;
  description: string;
  content?: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured?: boolean;
  order?: number;
  technologyIds?: string[];
}