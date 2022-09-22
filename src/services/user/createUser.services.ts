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

  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    full_name,
    phone_number,
    email,
    password: hashedPassword,
    active: true,
  });

  await userRepository.save(user);
  return user;
};
export default createUserService;
