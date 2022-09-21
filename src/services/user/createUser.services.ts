//import { users } from "../../database";
import { IUserRequest } from "../../interfaces/user";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { hash } from "bcrypt";

const createUserService = async ({
  full_name,
  phone_number,
  email,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  /* const findUser = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (findUser) {
    throw new Error("Sorry. User email already registered!");
  } */

  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    full_name,
    phone_number,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);
  return user;
};
export default createUserService;
