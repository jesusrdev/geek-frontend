import { User } from "../../core/models/user";

export interface SignUp extends User {
  "password": string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Session {
  username: string;
  token: string;
}

export interface Token {
  nameid: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
}
