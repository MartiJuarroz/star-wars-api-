import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'mjuarroz@example.com', required: true, nullable: false })
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @IsNotEmpty()
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an uppercase, lowercase letter and a number'
    })
    @ApiProperty({ example: 'Pass123', required: true, nullable: false, description: 'The password must have an uppercase, lowercase letter and a number' })
    password: string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @ApiProperty({ example: 'Martiniano', required: true, nullable: false })
    name: string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @ApiProperty({ example: 'Juarroz', required: true, nullable: false })
    lastName: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty({ type: [String], example: ['Admin', 'User'] })
    roles: string[]

}