import { Technology } from "../entities";

export interface TechnologysRepository{
  findAll(): Promise<Technology[] | null>;
  findById(id: string): Promise<Technology | null>;
  save(data: Technology): Promise<void>;
  delete(id: string): Promise<void>;
}