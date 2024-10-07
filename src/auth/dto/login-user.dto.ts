import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {

    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'mjuarroz@example.com', required: true, nullable: false })
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an uppercase, lowercase letter and a number'
    })
    @ApiProperty({ example: 'Pass123', required: true, nullable: false })
    password: string;

}