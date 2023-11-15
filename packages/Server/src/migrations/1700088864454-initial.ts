import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1700088864454 implements MigrationInterface {
    name = 'initial1700088864454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT '0', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "imageUrl" character varying, "description" character varying(4096) NOT NULL, "creatorId" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borowing" ("usersId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_5ea983b9906e71e131bb416bedf" PRIMARY KEY ("usersId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa0727de66ee13282649a4216f" ON "borowing" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_35efada55ffc191a660fb4b89a" ON "borowing" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_23caa6a73b441cf501d5d61b01b" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "borowing" ADD CONSTRAINT "FK_aa0727de66ee13282649a4216f3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "borowing" ADD CONSTRAINT "FK_35efada55ffc191a660fb4b89a5" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borowing" DROP CONSTRAINT "FK_35efada55ffc191a660fb4b89a5"`);
        await queryRunner.query(`ALTER TABLE "borowing" DROP CONSTRAINT "FK_aa0727de66ee13282649a4216f3"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_23caa6a73b441cf501d5d61b01b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35efada55ffc191a660fb4b89a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa0727de66ee13282649a4216f"`);
        await queryRunner.query(`DROP TABLE "borowing"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3ffb1c0c8416b9fc6f907b743"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
