import { User } from '../../core/models/user';

export interface SignUp extends User {
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Session {
  userName: string;
  token: string;
}

export interface Token {
  nameid: string;
  unique_name: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
}
