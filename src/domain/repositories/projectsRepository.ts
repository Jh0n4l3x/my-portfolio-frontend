import { Project } from "../entities";

export interface ProjectsRepository{
  findAll(): Promise<Project[] | null>;
  findById(id: string): Promise<Project | null>;
  save(data: Project): Promise<void>;
  delete(id: string): Promise<void>;
}