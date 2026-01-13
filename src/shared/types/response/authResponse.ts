import { User } from '../../../domain/entities/user'

export interface AuthResponse {
  user: User;
  access_token: string;
}