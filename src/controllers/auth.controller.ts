import { NextFunction, Request, Response } from "express";
import { LoginRequest } from "../interfaces/auth";
import authService from "../services/auth.service";
import loginRequestSchema from "../validation/loginRequest.schema";
import validate from "../validation/validator";

class AuthController {
  async login(
    req: Request<{}, LoginRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authData = validate<LoginRequest>(loginRequestSchema, req.body);

      const accessToken = await authService.login(authData);
      return res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
