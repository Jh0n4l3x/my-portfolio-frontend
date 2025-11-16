export interface User {
  id: string;
  email: string;
  username: string; // Username para la URL del portafolio
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN';
  emailVerified?: boolean;
  isActive?: boolean;
  twoFactorEnabled?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string; // Username único
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface PortfolioData {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profile: Profile | null;
  projects: Project[];
}

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

export interface Technology {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  color?: string;
}

export interface TechnologyWithStats extends Technology {
  projectCount: number;
}

export interface ProjectTechnology {
  id: string;
  projectId: string;
  technologyId: string;
  technology: Technology;
  // Propiedades de acceso directo para facilitar el uso
  name: string;
  icon?: string;
  category?: string;
  color?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
}

export interface Profile {
  id: string;
  bio?: string;
  avatar?: string;
  title?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

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

// ============================================
// Password Recovery Types
// ============================================

export interface ForgotPasswordRequest {
  email?: string;
  phoneNumber?: string;
  method: 'email' | 'whatsapp';
}

export interface ForgotPasswordResponse {
  message: string;
  method: string;
  expiresIn: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface VerifyResetCodeResponse {
  valid: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
