import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "guya",
    "password": "1234",
    "database": "nestjs",
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  }), UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule { }
