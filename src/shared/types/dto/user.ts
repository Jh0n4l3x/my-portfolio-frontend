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