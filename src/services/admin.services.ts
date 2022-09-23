import AppDataSource from "../data-source";
import { IAdminRequest, IAdminUpdate, IUserLogin } from "../interfaces/user";
import { Admin } from "../entities/admin.entity";
import { AppError } from "../errors/appError";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

class AdminServices {
  static async createAdminService({
    name,
    email,
    password,
  }: IAdminRequest): Promise<Admin> {
    if (!name || !email || !password) {
      throw new AppError(400, "Can not be empty");
    }
    const adminRepository = AppDataSource.getRepository(Admin);
    const hashedPassword = await hash(password, 10);
    const adminUser = adminRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await adminRepository.save(adminUser);
    return adminUser;
  }

  static async loginAdminService({ email, password }: IUserLogin) {
    const adminRepository = AppDataSource.getRepository(Admin);
    const user = await adminRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError(403, "Password or email is wrong");
    }
    if (!user.active) {
      throw new AppError(401, "Inactivated admin user");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError(403, "Password or email is wrong");
    }

    const token = jwt.sign(
      { id: user.id, adm: user.adm },
      String(process.env.SECRET_KEY),
      {
        expiresIn: "12h",
      }
    );

    return token;
  }

  static async reaAdminService(): Promise<Admin[]> {
    const adminRepository = AppDataSource.getRepository(Admin);
    const users = await adminRepository.find();

    return users;
  }

  static async updateAdminService(id: string, data: IAdminUpdate) {
    const adminRepository = AppDataSource.getRepository(Admin);
    const users = await adminRepository.find();
    const userFound = users.find((el) => el.id === id);

    if (!userFound) {
      throw new AppError(404, "Admin not found");
    }

    const user = await adminRepository.update(userFound!.id, data);
    if (user.affected === 1) {
      const userUpdated = await adminRepository.findOneBy({ id: id });
      return userUpdated;
    }
  }

  static async deleteUserService(id: string) {
    const adminRepository = AppDataSource.getRepository(Admin);
    const user = await adminRepository.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "Admin not found");
    }
    if (!user.active) {
      throw new AppError(401, "Inactivated admin");
    }

    user.active = false;
    await adminRepository.save(user);
  }
}
export default AdminServices;
