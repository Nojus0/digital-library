import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1700089675612 implements MigrationInterface {
    name = 'initial1700089675612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('0', '1') NOT NULL DEFAULT '0', \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` (\`id\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(256) NOT NULL, \`imageUrl\` varchar(255) NULL, \`description\` varchar(4096) NOT NULL, \`creatorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`borowing\` (\`usersId\` int NOT NULL, \`booksId\` int NOT NULL, INDEX \`IDX_aa0727de66ee13282649a4216f\` (\`usersId\`), INDEX \`IDX_35efada55ffc191a660fb4b89a\` (\`booksId\`), PRIMARY KEY (\`usersId\`, \`booksId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_23caa6a73b441cf501d5d61b01b\` FOREIGN KEY (\`creatorId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`borowing\` ADD CONSTRAINT \`FK_aa0727de66ee13282649a4216f3\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`borowing\` ADD CONSTRAINT \`FK_35efada55ffc191a660fb4b89a5\` FOREIGN KEY (\`booksId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`borowing\` DROP FOREIGN KEY \`FK_35efada55ffc191a660fb4b89a5\``);
        await queryRunner.query(`ALTER TABLE \`borowing\` DROP FOREIGN KEY \`FK_aa0727de66ee13282649a4216f3\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_23caa6a73b441cf501d5d61b01b\``);
        await queryRunner.query(`DROP INDEX \`IDX_35efada55ffc191a660fb4b89a\` ON \`borowing\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa0727de66ee13282649a4216f\` ON \`borowing\``);
        await queryRunner.query(`DROP TABLE \`borowing\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
