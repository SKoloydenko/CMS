import { Claims } from "../interfaces/auth";

declare global {
  namespace Express {
    export interface Request {
      user: Claims;
    }
  }
}
