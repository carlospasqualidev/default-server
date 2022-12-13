export interface ICreateUser {
  name: string;
  email: string;
  isBlocked: boolean;
  passwordHash: string;
}
