import { Profile } from "../entities";

export interface ProfileRepository{
  findAll(): Promise<Profile[] | null>;
  findById(id: string): Promise<Profile | null>;
  save(data: Profile): Promise<void>;
  delete(id: string): Promise<void>;
}