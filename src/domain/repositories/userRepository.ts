import { User } from "../entities";

export interface UserRepository{
  find(): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  save(data: User): Promise<void>;
  delete(): Promise<void>;
}