import { User } from '../dto/user'

export interface AuthResponse {
  user: User;
  access_token: string;
}