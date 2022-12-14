import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ContactControllers from "../controllers/contact.controllers";

const contactRoutes = Router();

contactRoutes.post("", ensureAuthMiddleware, ContactControllers.create);
contactRoutes.get("", ensureAuthMiddleware, ContactControllers.read);
contactRoutes.get("/:id", ensureAuthMiddleware, ContactControllers.readOne);
contactRoutes.patch("/:id", ensureAuthMiddleware, ContactControllers.update);
contactRoutes.delete("/:id", ensureAuthMiddleware, ContactControllers.delete);

export default contactRoutes;
