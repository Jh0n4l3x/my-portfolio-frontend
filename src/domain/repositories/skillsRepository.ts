import { Skill } from "../entities";

export interface SkillRepository{
  findAll(): Promise<Skill[] | null>;
  findById(id: string): Promise<Skill | null>;
  save(data: Skill): Promise<void>;
  delete(id: string): Promise<void>;
}