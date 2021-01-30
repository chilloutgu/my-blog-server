import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

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
  }), UsersModule, BlogModule],
  controllers: [],
  providers: []
})
export class AppModule {}
