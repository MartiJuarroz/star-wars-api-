import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ExecutionContext } from '@nestjs/common';;
import { APP_GUARD } from '@nestjs/core';

describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService, 
          useValue: { create: jest.fn() }, 
        },
        {
          provide: APP_GUARD,
          useValue: {
            canActivate: (context: ExecutionContext) => {
              const request = context.switchToHttp().getRequest();
              request.user = { role: 'Admin' }; 
              return true; 
            },
          },
        },],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should allow access for Admin role', async () => {
      const createMovieDto = {
        title: 'Sample Movie',
        director: 'Sample Director',
        producer: 'Sample Producer',
        release_date: '2024-01-01',
      };
  
      const result = await controller.create(createMovieDto);
  
      expect(result).toBeDefined(); 
    });
  });
});
