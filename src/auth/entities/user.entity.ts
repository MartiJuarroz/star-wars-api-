import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('User')
export class User {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    email: string;

    @ApiProperty()
    @Column({ type: "varchar", nullable: false, select: false })
    password: string;

    @ApiProperty()
    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @ApiProperty()
    @Column({ type: "varchar", length: 50, nullable: false })
    lastName: string;

    @ApiProperty()
    @Column('bit', { default: true })
    isActive: boolean;

    @ManyToMany(() => Role, (role) => role.users, { cascade: true })
    @JoinTable({ name: 'User_Roles' }) 
    roles: Role[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
