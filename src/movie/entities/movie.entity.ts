import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Movie' })
export class Movie {

    @ApiProperty({
        example: 1,
        description: 'Movie id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'A New Hope',
        description: 'Title of the movie',
    })
    @Column({ type: "varchar", length: 100, nullable: false })
    title: string

    @ApiProperty({
        example: 'George Lucas',
        description: 'Director of the movie'
    })
    @Column({ type: "varchar", length: 50, nullable: false })
    director: string

    @ApiProperty({
        example: 'Gary Kurtz, Rick McCallum',
        description: 'Producer/s of the movie'
    })
    @Column({ type: "varchar", length: 50, nullable: true })
    producer: string

    @ApiProperty({
        example: '1977-05-25',
        description: 'Date of the release'
    })
    @Column({ type: "date", nullable: false })
    release_date: Date

    @ApiProperty({
        example: '2014-12-10T14:23:31.880000Z',
        description: 'Date created at the database'
    })
    @Column({ type: "datetime", nullable: false })
    created: Date

    @ApiProperty({
        example: '2014-12-10T14:23:31.880000Z',
        description: 'Date modified at the database'
    })
    @Column({ type: "datetime", nullable: true })
	edited: Date

    @ApiProperty({
        example: 'true',
        description: 'Determines if the movie is active or not'
    })
    @Column('bit', { default: true })
    isActive: boolean;


}
