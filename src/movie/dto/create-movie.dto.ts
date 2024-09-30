import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMovieDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'A New Hope',
        description: 'Title of the movie',
    })
    title: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'George Lucas',
        description: 'Director of the movie'
    })
    director: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Gary Kurtz, Rick McCallum',
        description: 'Producer/s of the movie'
    })
    producer: string

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({
        example: '1977-05-25',
        description: 'Date of the release'
    })
    release_date: string

}
