import AppDataSource from "../data-source";
import { IUserRequest, IUserLogin } from "../interfaces/user";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

class UserServices {
  static async createUserService({
    full_name,
    phone_number,
    email,
    password,
  }: IUserRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const hashedPassword = await hash(password, 10);
    const user = userRepository.create({
      full_name,
      phone_number,
      email,
      password: hashedPassword,
      //active: true,
    });

    await userRepository.save(user);
    return user;
  }

  static async createLoginService({ email, password }: IUserLogin) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError(403, "Password or email is wrong");
    }
    if (!user.active) {
      throw new AppError(401, "Inactivated user");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError(403, "Password or email is wrong");
    }

    const token = jwt.sign(
      { id: user.id, adm: user.adm },
      String(process.env.SECRET_KEY),
      {
        expiresIn: "5h",
      }
    );

    return { token };
  }

  static async readUsersService() {
    const usersRepository = AppDataSource.getRepository(User);
    const users = await usersRepository.find();

    return users;
  }

  static async readOneUserService(id: string) {
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  static async updateUserService(id: string, data: IUserRequest) {
    const usersRepository = AppDataSource.getRepository(User);
    const users = await usersRepository.find();
    const userFound = users.find((el) => el.id === id);

    if (!userFound) {
      throw new AppError(404, "User not found");
    }

    const user = await usersRepository.update(userFound!.id, data);
    if (user.affected === 1) {
      const userUpdated = await usersRepository.findOneBy({ id: id });
      return userUpdated;
    }
  }

  static async deleteUserService(id: string) {
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "User not found");
    }
    if (!user.active) {
      throw new AppError(401, "Inactivated user");
    }

    user.active = false;
    await usersRepository.save(user);
  }
}
export default UserServices;
