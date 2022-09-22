import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  if (!user.active) {
    throw new AppError(400, "User is already inactive");
  }

  //await userRepository.delete(user!.id);
  user.active = false;
  await userRepository.save(user);
};
export default deleteUserService;
