import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { NotFoundException } from '@nestjs/common';

jest.mock('axios');

describe('MovieService', () => {
  let service: MovieService;
  let httpService: HttpService;
  let movieRepository: Repository<Movie>;
  const swapiUrl = 'https://swapi.dev/api';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a movie', () => {
    it('should successfully create a new movie', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25'
      };

      const savedMovie = {
        ...createMovieDto,
        created: new Date(),
        isActive: true,
      };

      jest.spyOn(movieRepository, 'create').mockReturnValue(savedMovie as any);
      jest.spyOn(movieRepository, 'save').mockResolvedValue(savedMovie as any);

      const result = await service.create(createMovieDto);

      expect(movieRepository.create).toHaveBeenCalledWith({
        ...createMovieDto,
        created: expect.any(Date),
        isActive: true,
      });
      expect(movieRepository.save).toHaveBeenCalledWith(savedMovie);
      expect(result).toEqual(savedMovie);
    });
  });

describe('findAll', () => {
  it('should return movies with default pagination', async () => {
      const mockMovies = [
        { title: 'Movie 1', description: 'Description 1' },
        { title: 'Movie 2', description: 'Description 2' },
      ];

      jest.spyOn(movieRepository, 'find').mockResolvedValue(mockMovies as any);

      const paginationDto: PaginationDto = {
        limit: 10,
        offset: 0,
      };

      const result = await service.findAll(paginationDto);

      expect(movieRepository.find).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
      expect(result).toEqual(mockMovies);
    });

    it('should apply pagination parameters correctly', async () => {
      const mockMovies = [
        { title: 'Movie 1', description: 'Description 1' },
        { title: 'Movie 2', description: 'Description 2' },
      ];

      jest.spyOn(movieRepository, 'find').mockResolvedValue(mockMovies as any);

      const paginationDto: PaginationDto = {
        limit: 5,
        offset: 15,
      };

      const result = await service.findAll(paginationDto);

      expect(movieRepository.find).toHaveBeenCalledWith({
        take: 5,
        skip: 15,
      });
      expect(result).toEqual(mockMovies);
    });

    it('should return an empty array if no movies are found', async () => {
      jest.spyOn(movieRepository, 'find').mockResolvedValue([]);

      const paginationDto: PaginationDto = {
        limit: 10,
        offset: 0,
      };

      const result = await service.findAll(paginationDto);

      expect(movieRepository.find).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a movie by ID', async () => {
      const mockMovie = { id: 1, title: 'A New Hope', director: 'George Lucas' };

      jest.spyOn(movieRepository, 'findOne').mockResolvedValue(mockMovie as any);

      const result = await service.findOne(1);

      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockMovie);
    });

    it('should throw NotFoundException when movie is not found in findOne', async () => {
    
      jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(null);
    
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
    });
  });

  describe('findAllSwapi', () => {
    it('should return SWAPI films data', async () => {
      const mockResponse: AxiosResponse = {
        data: {
          results: [
            { title: 'A New Hope' },
            { title: 'The Empire Strikes Back' },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const result = await service.findAllSwapi();

      expect(result).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(`${service['swapiUrl']}/films`);
    });
  });

  describe('update', () => {
    it('should update a movie successfully', async () => {
      const id = 1;
      const updateMovieDto: UpdateMovieDto = { title: 'Updated Movie' };
      const updatedMovie: Movie = {
        id,
        title: 'Updated Movie',
        director: 'Director',
        producer: 'Producer',
        release_date: new Date('2023-01-01'),
        created: new Date('2023-01-01'),
        edited: new Date(),
        isActive: true
      };

      jest.spyOn(movieRepository, 'update').mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });
      jest.spyOn(service, 'findOne').mockResolvedValue(updatedMovie);

      const result = await service.update(id, updateMovieDto);

      expect(movieRepository.update).toHaveBeenCalledWith(id, {
        ...updateMovieDto,
        edited: expect.any(Date),
      });
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(updatedMovie);
    });

    describe('remove', () => {
      it('should successfully mark a movie as inactive', async () => {
        const id = 1;
        const updatedMovie: Movie = {
          id,
          title: 'Inactive Movie',
          director: 'Director',
          producer: 'Producer',
          release_date: new Date('2023-01-01'),
          created: new Date('2023-01-01'),
          edited: new Date(),
          isActive: false
        };
  
        jest.spyOn(movieRepository, 'update').mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });
        jest.spyOn(service, 'findOne').mockResolvedValue(updatedMovie);
  
        const result = await service.remove(id);
  
        expect(movieRepository.update).toHaveBeenCalledWith(id, { isActive: false });
        expect(service.findOne).toHaveBeenCalledWith(id);
        expect(result).toEqual(updatedMovie);
      });
    });
  });

});
