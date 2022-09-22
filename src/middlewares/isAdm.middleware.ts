import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.adm) {
    return res.status(403).json({
      message: "You don't have permissions",
    });
  }
  next();
};
export default isAdmMiddleware;
