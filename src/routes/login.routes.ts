import { Router } from "express";
import UserControllers from "../controllers/user.controllers";
import AdminControllers from "../controllers/admin.controllers";

const loginRoutes = Router();
loginRoutes.post("", UserControllers.login);
loginRoutes.post("/adm", AdminControllers.login);

export default loginRoutes;
