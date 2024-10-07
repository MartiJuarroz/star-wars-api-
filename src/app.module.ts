import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Role } from './auth/entities/role.entity';
import { Movie } from './movie/entities/movie.entity';
import { Config } from './data-source/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>Config,
      inject:[ConfigService]
    }),

    TypeOrmModule.forFeature([User, Role, Movie]),

    MovieModule,
    HttpModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
