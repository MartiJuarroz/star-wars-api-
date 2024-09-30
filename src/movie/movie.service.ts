import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {

  private readonly swapiUrl = `${process.env.SWAPI_URL}`;

  constructor(

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    private readonly axios: HttpService

  ) {}

  async create(createMovieDto: CreateMovieDto) {
    
    try{

      const movie = this.movieRepository.create({
        ...createMovieDto,
        created: new Date(),
        isActive: true
      });

      await this.movieRepository.save( movie )

      return movie

    } catch (error){

      throw new InternalServerErrorException(`Error creating a new movie: ${error}`)

    }
  }

  async findAll( paginationDto: PaginationDto ) {

    try {

      const { limit = 10, offset = 0 } = paginationDto;

      const movies = await this.movieRepository.find({
        take: limit,
        skip: offset,
      })
  
      return movies

    } catch (error) {
      throw new InternalServerErrorException(`Error fetching the movies: ${error}`)
    }
  }

  async findOne(id: number) {

    try {

      const movie = await this.movieRepository.findOne( { where: { id: id }})

      if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`)
  
      return movie

    } catch (error) {
      throw new InternalServerErrorException(`Error fetching the movie with id ${id}: ${error}`)
    }
  }

  async findAllSwapi() {

    try {

      const response = await firstValueFrom(this.axios.get(`${this.swapiUrl}/films`));

      return response.data;

    } catch (error) {
      throw new InternalServerErrorException(`Error fetching the Star Wars API: ${error}`)
    }

  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {

    try {
      const movieUpdated = await this.movieRepository.update(id, { 
        ...updateMovieDto, 
        edited: new Date(),
      });
  
      if (!movieUpdated) throw new NotFoundException(`Movie with id: ${id} not found`)
  
      return this.findOne( id );

    } catch (error){
      throw new InternalServerErrorException(`Error updating a movie ${error}`)
    }

  }

  async remove(id: number) {

    try {
    const movieRemoved = await this.movieRepository.update(id, { 
      isActive: false,
    });

    if (!movieRemoved) throw new NotFoundException(`Movie with id: ${id} not found`)

    return this.findOne( id );

    } catch (error){
      throw new InternalServerErrorException(`Error removing a movie ${error}`)
    }

  }

}
