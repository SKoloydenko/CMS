import { UserRole } from "../models/user.model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Claims {
  id: number;
  role: UserRole;
}
