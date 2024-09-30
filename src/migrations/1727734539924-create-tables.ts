import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1727734539924 implements MigrationInterface {

    name = 'CreateTables1727734539924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Movie" ("id" int NOT NULL IDENTITY(1,1), "title" varchar(100) NOT NULL, "director" varchar(50) NOT NULL, "producer" varchar(50), "release_date" date NOT NULL, "created" datetime NOT NULL, "edited" datetime, "isActive" bit NOT NULL CONSTRAINT "DF_d19129a0d6de92997c2d9be3fbf" DEFAULT 1, CONSTRAINT "PK_56d58b76292b87125c5ec8bdde0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" int NOT NULL IDENTITY(1,1), "email" varchar(100) NOT NULL, "password" varchar(255) NOT NULL, "name" varchar(50) NOT NULL, "lastName" varchar(50) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_8168fbf25dc82f464bbeaa4ce2f" DEFAULT 1, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(50) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_f734c716c8b58d22ad4065af14c" DEFAULT 1, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User_Roles" ("userId" int NOT NULL, "roleId" int NOT NULL, CONSTRAINT "PK_02ac9aa7bbf426d19990136af36" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c29a6612875cfef379f58afb9" ON "User_Roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cce46a25b807d2369d37ee4d3" ON "User_Roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "User_Roles" ADD CONSTRAINT "FK_8c29a6612875cfef379f58afb9c" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "User_Roles" ADD CONSTRAINT "FK_5cce46a25b807d2369d37ee4d33" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User_Roles" DROP CONSTRAINT "FK_5cce46a25b807d2369d37ee4d33"`);
        await queryRunner.query(`ALTER TABLE "User_Roles" DROP CONSTRAINT "FK_8c29a6612875cfef379f58afb9c"`);
        await queryRunner.query(`DROP INDEX "IDX_5cce46a25b807d2369d37ee4d3" ON "User_Roles"`);
        await queryRunner.query(`DROP INDEX "IDX_8c29a6612875cfef379f58afb9" ON "User_Roles"`);
        await queryRunner.query(`DROP TABLE "User_Roles"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Movie"`);
    }

}

