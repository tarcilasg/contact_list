import { Request, Response } from "express";
import ContactServices from "../services/contact.services";

class ContactControllers {
  static async create(req: Request, res: Response) {
    const { full_name, phone_number, email, userId } = req.body;
    const contact = await ContactServices.createContactService({
      full_name,
      phone_number,
      email,
      userId,
    });
    return res.json(contact);
  }

  static async read(req: Request, res: Response) {
    //const userId = req.params.userId;
    const contacts = await ContactServices.readContactsService();
    return res.json(contacts);
  }

  static async readOne(req: Request, res: Response) {
    const id = req.params.id;
    const contact = await ContactServices.readOneContactService(id);
    return res.json(contact);
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id;
    await ContactServices.updateContactService(id, req.body);
    return res.json({ message: "Contact updated with success!" });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await ContactServices.deleteContactService(id);
    return res.json({ message: "Contact deleted with success!" });
  }
}
export default ContactControllers;
