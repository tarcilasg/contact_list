import { MigrationInterface, QueryRunner } from "typeorm";

export class admField1663875320790 implements MigrationInterface {
    name = 'admField1663875320790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "adm" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adm"`);
    }

}
