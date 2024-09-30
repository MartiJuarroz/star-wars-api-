import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [
    TypeOrmModule.forFeature([ Movie ]),
    AuthModule,
    HttpModule
  ],
  exports: [
    MovieService,
    TypeOrmModule,
  ]
})
export class MovieModule {}
