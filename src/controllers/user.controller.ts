import { Request, Response } from "express";
import createUserService from "../services/user/createUser.services";
import deleteUserService from "../services/user/deleteUser.services";
import listUserService from "../services/user/listUser.services";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone_number, password } = req.body;
    const newUser = await createUserService({
      full_name,
      phone_number,
      email,
      password,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();

  return res.status(200).json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await deleteUserService(userId);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export { createUserController, listUserController, deleteUserController };
