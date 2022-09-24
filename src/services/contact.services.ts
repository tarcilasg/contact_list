import AppDataSource from "../data-source";
import { IContactRequest, IContact } from "../interfaces/contact";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

class ContactServices {
  static async createContactService({
    full_name,
    phone_number,
    email,
    user_id,
  }: IContactRequest): Promise<Contact> {
    const contactRepository = AppDataSource.getRepository(Contact);
    const userRepository = AppDataSource.getRepository(User);
    const name = await contactRepository.findOne({
      where: {
        full_name: full_name,
      },
    });

    if (name) {
      throw new AppError(400, "Please change full_name field");
    }

    const infoUser = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!infoUser) {
      throw new AppError(404, "User not found");
    }

    const contact = contactRepository.create({
      full_name,
      phone_number,
      email,
      user: infoUser,
    });

    await contactRepository.save(contact);
    return contact;
  }

  static async readContactsService(user_id: string): Promise<Contact[]> {
    const contactRepository = AppDataSource.getRepository(Contact);
    const userRepository = AppDataSource.getRepository(User);

    const contacts = await contactRepository.find();
    const user = await userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new AppError(404, "User not found");
    }
    const contactsUser = contacts.filter((el) => el.user.id === user_id);

    return contactsUser;
  }

  static async readOneContactService(id: string) {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new AppError(404, "Contact not found");
    }

    return contact;
  }

  static async updateContactService(id: string, data: IContactRequest) {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOneBy({ id });

    const newContact = await contactRepository.update(contact!.id, {
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
    });

    return newContact;
  }

  static async deleteContactService(id: string) {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOneBy({ id });

    const noContact = await contactRepository.delete(contact!.id);

    return noContact;
  }
}
export default ContactServices;
