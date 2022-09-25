import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(400, "No token found");
  }

  jwt.verify(
    token as string,
    String(process.env.SECRET_KEY),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, "Invalid Token");
      }
      req.user = {
        id: decoded.id,
        adm: decoded.adm,
      };
      if (!decoded.adm) {
        throw new AppError(403, "Access denied");
      }
      next();
    }
  );
};
export default isAdmMiddleware;
