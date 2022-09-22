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
      //req.user.email === decoded.email;
      req.user = {
        id: decoded.id,
        adm: decoded.adm,
      };
      next();
    }
  );

  //const splitToken = token.split(" ");

  /* jwt.verify(
    splitToken[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        res.status(401).json({
          message: "Invalid token",
        });
      }

      req.user = {
        id: decoded.id,
      };

      next();
    }
  ); */
};
export default ensureAuthMiddleware;
