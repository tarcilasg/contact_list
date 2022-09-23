import { MigrationInterface, QueryRunner } from "typeorm";

export class createAdmin1663928168088 implements MigrationInterface {
    name = 'createAdmin1663928168088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "adm" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
