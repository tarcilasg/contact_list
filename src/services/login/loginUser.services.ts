import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/user";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import "dotenv/config";

const createUserLoginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new Error("Password or email is wrong");
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Password or email is wrong");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: "5h",
  });

  return token;
};
export default createUserLoginService;
