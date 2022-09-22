import { Router } from "express";
import UserControllers from "../controllers/user.controllers";

const loginRoutes = Router();
loginRoutes.post("", UserControllers.login);

export default loginRoutes;
