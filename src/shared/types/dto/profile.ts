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