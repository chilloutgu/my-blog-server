import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Article } from '../entity/article.entity';
import { BlogService } from '../service/blog.service';

@Controller('blogs')
export class BlogController {
  
  constructor(private readonly blogService: BlogService) {}

  @Post()
  public async create():Promise<void> {
    this.blogService.create();
  }

  @Get()
  public async findAll(): Promise<Article[] | undefined> {
    return undefined;
  }

  @Get(':id')
  public async findOne() {

  }

  @Patch(':id')
  public async modify() {

  }

  @Delete(':id')
  public async remove() {

  }
}
