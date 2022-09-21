import { Request, Response } from "express";
import createUserLoginService from "../services/login/loginUser.services";

const createUserLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await createUserLoginService({ email, password });

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export default createUserLoginController;
