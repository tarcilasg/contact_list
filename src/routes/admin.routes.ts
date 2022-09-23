import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import AdminControllers from "../controllers/admin.controllers";

const adminRoutes = Router();

adminRoutes.post("", AdminControllers.create);
adminRoutes.get(
  "",
  ensureAuthMiddleware,
  isAdmMiddleware,
  AdminControllers.read
);
adminRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  AdminControllers.update
);
adminRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  AdminControllers.delete
);

export default adminRoutes;
