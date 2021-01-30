import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './controller/blog.controller';
import { Article } from './entity/article.entity';
import { BlogService } from './service/blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
