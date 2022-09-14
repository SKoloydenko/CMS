import { Response } from "express";
import ApiError from "../exceptions/api.error";

export const ErrorMiddleware = (
  err: string | ApiError,
  req,
  res: Response,
  next
) => {
  console.error("[ERR] " + err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res
    .status(500)
    .json({ message: "На сервере ведутся технические работы" });
};
