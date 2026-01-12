export interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  thumbnail?: string;
  imageUrl?: string; // Alias para thumbnail
  liveUrl?: string;
  githubUrl?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  order: number;
  userId: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    username?: string;
  };
  technologies: ProjectTechnology[];
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}