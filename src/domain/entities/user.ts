export class User {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public firstName?: string,
    public lastName?: string,
    public role: 'USER' | 'ADMIN' = 'USER',
    public emailVerified?: boolean,
    public isActive?: boolean,
    public twoFactorEnabled?: boolean,
  ){

  }
}