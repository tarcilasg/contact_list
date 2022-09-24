import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { Contact } from "./contact.entity";
import { Exclude } from "class-transformer";

@Entity("users")
@Unique(["email"])
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
export { User };
