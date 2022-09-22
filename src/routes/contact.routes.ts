import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("");
contactRoutes.get("");
contactRoutes.get("/id", ensureAuthMiddleware);
contactRoutes.patch("");
contactRoutes.delete("");

export default contactRoutes;
