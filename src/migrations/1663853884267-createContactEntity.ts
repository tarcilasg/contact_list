import { MigrationInterface, QueryRunner } from "typeorm";

export class createContactEntity1663853884267 implements MigrationInterface {
    name = 'createContactEntity1663853884267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9" UNIQUE ("full_name"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
