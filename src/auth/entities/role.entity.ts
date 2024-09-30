import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Role')
export class Role {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @ApiProperty()
    @Column('bit', { default: true })
    isActive: boolean;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

}