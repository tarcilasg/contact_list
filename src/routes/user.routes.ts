import { Router } from "express";
import {
  createUserController,
  listUserController,
  deleteUserController,
} from "../controllers/user.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUserController);
userRoutes.get("/:id", ensureAuthMiddleware);
userRoutes.patch("");
userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default userRoutes;
/* import { Express } from "express";
export const appRoutes = (app: Express) => {};
 */
