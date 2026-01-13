export class RegisterData {

  constructor(
    public email: string,
    public username: string,
    public password: string,
    public phone?: string,
    public firstName?: string,
    public lastName?: string,
  ){

  }
}