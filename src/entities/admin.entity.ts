import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
@Unique(["email"])
class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 50, nullable: false })
  name: string;

  @Column("varchar", { length: 128, nullable: false })
  email: string;

  @Column("varchar", { length: 50, nullable: false })
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  active: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  adm?: boolean;
}
export { Admin };
