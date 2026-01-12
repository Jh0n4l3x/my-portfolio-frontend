import { Technology } from "./technology";

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