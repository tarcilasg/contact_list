import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
@Unique(["full_name"])
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;
}
export { Contact };
