import { Request } from "express";
import ApiError from "../exceptions/api.error";
import { UserRole } from "../models/user.model";

export const AdminMiddleware = async (req: Request, _, next) => {
  try {
    const { role } = req.user;

    const isAdmin = role === UserRole.ADMIN;
    if (!isAdmin) {
      return next(ApiError.Forbidden());
    }
    return next();
  } catch (e) {
    return next(ApiError.Unauthorized());
  }
};
