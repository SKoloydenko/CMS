import { LoginRequest } from "../interfaces/auth";
import tokenService from "./token.service";
import userService from "./user.service";

class AuthService {
  async login({ email, password }: LoginRequest) {
    const user = await userService.verifyCredentials(email, password);

    const token = tokenService.generateToken({
      id: user.id,
      role: user.role,
    });

    return token;
  }
}

export default new AuthService();
