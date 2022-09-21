import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Invalid token",
    });
  }

  const splitToken = token.split(" ");

  jwt.verify(
    splitToken[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        res.status(401).json({
          message: "Invalid token",
        });
      }

      /* req.user = {
        id: decoded.id,
      }; */

      next();
    }
  );
};
export default ensureAuthMiddleware;
