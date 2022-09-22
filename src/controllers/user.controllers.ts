import { Request, Response } from "express";
import UserServices from "../services/user.services";
import { instanceToPlain } from "class-transformer";

class UserControllers {
  static async create(req: Request, res: Response) {
    const { full_name, phone_number, email, password } = req.body;
    const user = await UserServices.createUserService({
      full_name,
      phone_number,
      email,
      password,
    });
    return res.status(201).json(user);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UserServices.createLoginService({ email, password });

    return res.status(200).json(token);
  }

  static async read(req: Request, res: Response) {
    const users = await UserServices.readUsersService();

    return res.status(200).json(instanceToPlain(users));
  }

  static async readOne(req: Request, res: Response) {
    const id = req.user.id;
    const user = await UserServices.readOneUserService(id);

    return res.status(200).json(instanceToPlain(user));
  }

  static async update(req: Request, res: Response) {
    const id = req.user.id;
    await UserServices.updateUserService(id, req.body);

    return res.status(200).json({ message: "User updated!" });
  }

  static async delete(req: Request, res: Response) {
    const id = req.user.id;
    await UserServices.deleteUserService(id);

    return res.status(204).send({ message: "User deleted!" });
  }
}
export default UserControllers;
