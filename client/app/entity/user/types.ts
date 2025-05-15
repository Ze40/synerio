export interface IUserLogin {
  email: string | null;
  password: string | null;
  code?: string;
}

export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}
