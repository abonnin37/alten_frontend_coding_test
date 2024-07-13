export enum DialogTypeEnum {
  Login = 'Connexion',
  Signup = 'Inscription'
}

export interface LoginPayload {
  email?: string;
  password?: string;
}

export interface SignupResponse {
  message: string;
  status: number;
}

export class Login {
  id?: string;
  email?: string;
  token?: string;
}
