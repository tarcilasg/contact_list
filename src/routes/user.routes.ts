import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import UserControllers from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post("", UserControllers.create);
userRoutes.get("", ensureAuthMiddleware, isAdmMiddleware, UserControllers.read);
userRoutes.get("/:id", ensureAuthMiddleware, UserControllers.readOne);
userRoutes.patch("/:id", ensureAuthMiddleware, UserControllers.update);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  UserControllers.delete
);

export default userRoutes;
/* import { Express } from "express";
export const appRoutes = (app: Express) => {};
 */
