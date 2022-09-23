import AppDataSource from "../data-source";
import { IContactRequest, IContact } from "../interfaces/contact";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

class ContactServices {}
export default ContactServices;
