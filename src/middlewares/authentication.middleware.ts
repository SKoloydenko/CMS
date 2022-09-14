import { Request } from "express";
import ApiError from "../exceptions/api.error";
import { Claims } from "../interfaces/auth";
import tokenService from "../services/token.service";

export const AuthenticationMiddleware = async (req: Request, _, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.Unauthorized());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.Unauthorized());
    }
    const claims = tokenService.validateToken<Claims>(accessToken);
    if (!claims) {
      return next(ApiError.Unauthorized());
    }

    req.user = claims;
    return next();
  } catch (e) {
    return next(ApiError.Unauthorized());
  }
};
