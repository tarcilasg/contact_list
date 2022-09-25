import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(400, "Token not found");
  }

  jwt.verify(
    token as string,
    String(process.env.SECRET_KEY),
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError(401, "Invalid token");
      }
      req.user = {
        id: decoded.id,
        adm: decoded.adm,
      };
      next();
    }
  );
};
export default ensureAuthMiddleware;
