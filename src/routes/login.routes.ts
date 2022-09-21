import { Router } from "express";
import createUserLoginController from "../controllers/login.controllers";

const loginRoutes = Router();
loginRoutes.post("", createUserLoginController);

export default loginRoutes;
