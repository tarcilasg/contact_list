import { MigrationInterface, QueryRunner } from "typeorm";

export class increaseLengths1663963208639 implements MigrationInterface {
    name = 'increaseLengths1663963208639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "email" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" character varying(80) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "email" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "name" character varying(50) NOT NULL`);
    }

}
