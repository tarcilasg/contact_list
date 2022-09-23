import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("");
contactRoutes.get("", ensureAuthMiddleware);
contactRoutes.get("/id", ensureAuthMiddleware);
contactRoutes.patch("/id", ensureAuthMiddleware);
contactRoutes.delete("/id", ensureAuthMiddleware);

export default contactRoutes;
