import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class InsertData1727797304664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const password = 'Pass123'; // clave de prueba
        const hashedPassword = await bcrypt.hash(password, 10); 

        await queryRunner.query(`
            INSERT INTO "User" (email, password, name, lastName, isActive)
            VALUES 
            ('mjuarroz@example.com', '${hashedPassword}', 'Martiniano', 'Juarroz', 1),
            ('juanperez@example.com', '${hashedPassword}', 'Juan', 'Perez', 1);
        `);

        await queryRunner.query(`
            INSERT INTO "Role" (name, isActive)
            VALUES 
            ('Admin', 1),
            ('User', 1);
        `);

        await queryRunner.query(`
            INSERT INTO "User_Roles" ("userId", "roleId")
            VALUES 
            ((SELECT id FROM "User" WHERE email = 'mjuarroz@example.com'), 
             (SELECT id FROM "Role" WHERE name = 'Admin')),
            ((SELECT id FROM "User" WHERE email = 'juanperez@example.com'), 
             (SELECT id FROM "Role" WHERE name = 'User'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "User_Roles" WHERE "userId" IN (
                (SELECT id FROM "User" WHERE email = 'mjuarroz@example.com'),
                (SELECT id FROM "User" WHERE email = 'juanperez@example.com')
            );

            DELETE FROM "Role" WHERE name IN ('Admin', 'User');

            DELETE FROM "User" WHERE email IN ('mjuarroz@example.com', 'juanperez@example.com');
        `);
    }

}