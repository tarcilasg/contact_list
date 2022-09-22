import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

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
