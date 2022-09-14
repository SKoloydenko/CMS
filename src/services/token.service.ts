import jwt, { JwtPayload } from "jsonwebtoken";
import { Claims } from "../interfaces/auth";

class TokenService {
  generateToken(payload: Claims) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: `${process.env.JWT_ACCESS_LIFETIME}m`,
    });
    return accessToken;
  }

  validateToken<T extends JwtPayload>(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as T;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
