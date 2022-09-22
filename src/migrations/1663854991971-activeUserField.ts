import { MigrationInterface, QueryRunner } from "typeorm";

export class activeUserField1663854991971 implements MigrationInterface {
    name = 'activeUserField1663854991971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

}
