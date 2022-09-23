import { Request, Response } from "express";
import AdminServices from "../services/admin.services";
import { instanceToPlain } from "class-transformer";

class AdminControllers {
  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await AdminServices.createAdminService({
      name,
      email,
      password,
    });
    return res.status(201).json(instanceToPlain(user));
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AdminServices.loginAdminService({ email, password });

    return res.status(200).json(token);
  }

  static async read(req: Request, res: Response) {
    const users = await AdminServices.readAdminService();

    return res.status(200).json(instanceToPlain(users));
  }

  static async update(req: Request, res: Response) {
    const id = req.user.id;
    await AdminServices.updateAdminService(id, req.body);

    return res.status(200).json({ message: "Admin updated!" });
  }

  static async delete(req: Request, res: Response) {
    const id = req.user.id;
    await AdminServices.deleteAdminService(id);

    return res.status(204).send({ message: "Admin deleted!" });
  }
}
export default AdminControllers;
